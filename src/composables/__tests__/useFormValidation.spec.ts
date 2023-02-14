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

import {inject, ref, h} from 'vue';
import {mount} from '@vue/test-utils';
import {describe, it, expect, vi} from 'vitest';
import {formKey, type FormAPI} from '../types';
import useFormValidation from '../useFormValidation';

const TestForm = {
  name: 'form',
  setup() {
    const {fieldset, errorbag, reset, validate, purgeErrors} =
      useFormValidation(ref(false));
    return {
      fieldset,
      errorbag,
      reset,
      validate,
      purgeErrors,
    };
  },
  template: `<form><slot></slot></form>`,
};

describe('components/src/composables/useFormValidation', () => {
  it('useFormValidation should provide FormAPI', async () => {
    let formHandler: FormAPI | undefined;
    mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              formHandler = inject<FormAPI>(formKey);
            },
            template: `<input />`,
          }),
      },
    });
    expect(formHandler).toBeTruthy();
  });

  it('useFormValidation should register form field', async () => {
    const wrapper = mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              const formHandler = inject<FormAPI>(formKey);
              formHandler?.registerField({
                cid: ref('001'),
                dirty: ref(false),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(false),
                validate: vi.fn(),
                reset: vi.fn(),
              });
            },
            template: `<input />`,
          }),
      },
    });
    expect(wrapper.vm.fieldset.length).toStrictEqual(1);
  });

  it('useFormValidation should unregister form field', async () => {
    const wrapper = mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              const formHandler = inject<FormAPI>(formKey);
              formHandler?.registerField({
                cid: ref('001'),
                dirty: ref(false),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(false),
                validate: vi.fn(),
                reset: vi.fn(),
              });
              formHandler?.unregisterField({
                cid: ref('001'),
                dirty: ref(false),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(false),
                validate: vi.fn(),
                reset: vi.fn(),
              });
            },
            template: `<input />`,
          }),
      },
    });
    expect(wrapper.vm.fieldset.length).toStrictEqual(0);
  });

  it('useFormValidation should accept error for field', async () => {
    const wrapper = mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              const formHandler = inject<FormAPI>(formKey);
              formHandler?.registerField({
                cid: ref('001'),
                dirty: ref(false),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(false),
                reset: vi.fn(),
                validate: vi.fn(),
              });
              formHandler?.addError({
                cid: '001',
                errors: ['Required'],
              });
            },
            template: `<input />`,
          }),
      },
    });
    expect(wrapper.vm.errorbag.length).toStrictEqual(1);
  });

  it('useFormValidation should validate all fields', async () => {
    const wrapper = mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              const formHandler = inject<FormAPI>(formKey);
              formHandler?.registerField({
                cid: ref('001'),
                dirty: ref(true),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(true),
                reset: vi.fn(),
                validate: () =>
                  Promise.resolve({
                    cid: '001',
                    errors: ['Required'],
                  }),
              });
              formHandler?.registerField({
                cid: ref('002'),
                dirty: ref(true),
                label: ref('Test 2'),
                processing: ref(false),
                touched: ref(true),
                reset: vi.fn(),
                validate: () =>
                  Promise.resolve({
                    cid: '002',
                    errors: ['Required'],
                  }),
              });
            },
            template: `<input />`,
          }),
      },
    });
    await wrapper.vm.validate();
    expect(wrapper.vm.errorbag.length).toStrictEqual(2);
  });

  it('useFormValidation should remove error for field', async () => {
    const wrapper = mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              const formHandler = inject<FormAPI>(formKey);
              formHandler?.registerField({
                cid: ref('001'),
                dirty: ref(false),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(false),
                reset: vi.fn(),
                validate: vi.fn(),
              });
              formHandler?.addError({
                cid: '001',
                errors: ['Required'],
              });
              formHandler?.purgeErrors('001');
            },
            template: `<input />`,
          }),
      },
    });
    expect(wrapper.vm.errorbag.length).toStrictEqual(0);
  });

  it('useFormValidation should reset all fields', async () => {
    const mockValidateFunction = vi.fn().mockImplementation(() =>
      Promise.resolve({
        cid: '001',
        errors: ['Required'],
      }),
    );
    const mockRestFunction = vi.fn();
    const wrapper = mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              const formHandler = inject<FormAPI>(formKey);
              formHandler?.registerField({
                cid: ref('001'),
                dirty: ref(true),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(true),
                reset: mockRestFunction,
                validate: mockValidateFunction,
              });
              formHandler?.registerField({
                cid: ref('002'),
                dirty: ref(true),
                label: ref('Test 2'),
                processing: ref(false),
                touched: ref(true),
                reset: mockRestFunction,
                validate: mockValidateFunction,
              });
            },
            template: `<input />`,
          }),
      },
    });
    await wrapper.vm.validate();
    expect(mockValidateFunction).toHaveBeenCalledTimes(2);
    wrapper.vm.reset();
    expect(mockRestFunction).toHaveBeenCalledTimes(2);
  });

  it('useFormValidation should search errors for field', async () => {
    let formHandler: FormAPI | undefined;
    mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              formHandler = inject<FormAPI>(formKey);
              formHandler?.registerField({
                cid: ref('001'),
                dirty: ref(false),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(false),
                reset: vi.fn(),
                validate: vi.fn(),
              });
            },
            template: `<input />`,
          }),
      },
    });

    expect(formHandler?.searchErrors('001').length).toStrictEqual(0);
    formHandler?.addError({
      cid: '001',
      errors: ['Required'],
    });
    expect(formHandler?.searchErrors('001').length).toStrictEqual(1);
  });
});
