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

import {mount} from '@vue/test-utils';
import {formKey} from '@/composables/types';
import type {FormAPI} from '@/composables/types';
import {describe, expect, it, vi} from 'vitest';
import InputField from '@/components/InputField/InputField.vue';

describe('InputField.vue', () => {
  const mockFormAPI: FormAPI = {
    searchErrors: vi.fn(() => []),
    purgeErrors: vi.fn(),
    addError: vi.fn(),
    registerField: vi.fn(),
    unregisterField: vi.fn(),
  };
  it('renders OXD InputField', () => {
    const wrapper = mount(InputField, {
      props: {
        modelValue: null,
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD InputField type `input`', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'input',
        modelValue: null,
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD InputField type `file`', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'file',
        modelValue: null,
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD InputField type `file` with button', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'file',
        buttonLabel: 'Browse',
        modelValue: null,
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD InputField type `textarea`', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'textarea',
        modelValue: null,
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
