/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */

import {formKey} from '../types';
import useField from '../useField';
import {defineComponent, toRef} from 'vue';
import {flushPromises, shallowMount} from '@vue/test-utils';
import {describe, it, expect, vi, beforeEach} from 'vitest';

const mockRestFunction = vi.fn();
const purgeErrors = vi.fn();
const registerField = vi.fn();
const unregisterField = vi.fn();
const addError = vi.fn();
const searchErrors = vi.fn().mockImplementation(() => []);

vi.mock('nanoid', () => ({
  nanoid: vi.fn().mockReturnValue('RQo9uIESilqxkE9scKup7'),
}));

const TestField = defineComponent({
  name: 'Field',
  // eslint-disable-next-line vue/require-prop-types
  props: ['disabled', 'modelValue'],
  setup(props) {
    const disabled = toRef(props, 'disabled');
    const modelValue = toRef(props, 'modelValue');

    const {form, validate, reset} = useField({
      fieldLabel: 'test',
      disabled: disabled,
      modelValue: modelValue,
      onReset: mockRestFunction,
      rules: [(v) => (!!v && v.trim() !== '') || 'Required'],
    });
    return {
      form,
      reset,
      validate,
    };
  },
  template: `<div></div>`,
});

const mountConfigs = {
  global: {
    provide: {
      [formKey as symbol]: {
        addError,
        purgeErrors,
        searchErrors,
        registerField,
        unregisterField,
      },
    },
  },
};

beforeEach(() => {
  addError.mockClear();
  purgeErrors.mockClear();
  searchErrors.mockClear();
  registerField.mockClear();
  unregisterField.mockClear();
  mockRestFunction.mockClear();
});

describe('components/src/composables/useField', () => {
  it('useField should inject FormAPI', async () => {
    const wrapper = shallowMount(TestField, {...mountConfigs});
    expect(wrapper.vm.form).toBeTruthy();
  });

  it('useField should register the field', async () => {
    shallowMount(TestField, {...mountConfigs});
    expect(registerField).toHaveBeenCalledOnce();
  });

  it('useField should unregister the field', async () => {
    shallowMount(TestField, {...mountConfigs}).unmount();
    expect(unregisterField).toHaveBeenCalledOnce();
  });

  it('useField should validate field', async () => {
    const wrapper = shallowMount(TestField, {
      ...mountConfigs,
      props: {
        modelValue: null,
      },
    });
    await wrapper.setProps({modelValue: ''});
    await flushPromises();
    expect(addError).toHaveBeenCalledWith({
      cid: 'RQo9uIESilqxkE9scKup7',
      errors: ['Required'],
    });
  });

  it('useField should not validate disabled field', async () => {
    const wrapper = shallowMount(TestField, {
      ...mountConfigs,
      props: {
        disabled: true,
        modelValue: null,
      },
    });
    await wrapper.setProps({modelValue: ''});
    await flushPromises();
    expect(addError).toHaveBeenCalledWith({
      cid: 'RQo9uIESilqxkE9scKup7',
      errors: [],
    });
  });
});
