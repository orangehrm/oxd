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
import AutocompleteInput from '@ohrm/oxd/core/components/Input/Autocomplete/AutocompleteInput.vue';
import AutocompleteTextInput from '@ohrm/oxd/core/components/Input/Autocomplete/AutocompleteTextInput.vue';

const options = [
  {
    id: 1,
    label: 'HR Admin',
  },
  {
    id: 2,
    label: 'ESS User',
  },
  {
    id: 3,
    label: 'Supervisor',
  },
];

const syncFunction = function() {
  return options;
};

describe('AutocompleteInput.vue', () => {
  it('renders OXD Autocomplete Input', () => {
    const wrapper = mount(AutocompleteInput, {
      props: {
        createOptions: syncFunction,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should load the options when input is changed', async () => {
    const wrapper = mount(AutocompleteInput, {
      props: {
        createOptions: syncFunction,
      },
    });

    const input = wrapper.findComponent(AutocompleteTextInput).find('input');
    const searchTerm = 'hr';
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    input.element.value = searchTerm;
    input.element.dispatchEvent(event);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dropdownOpen).toEqual(true);
    expect(wrapper.vm.loading).toEqual(true);
    expect(wrapper.vm.searchTerm).toEqual(searchTerm);

    setTimeout(() => {
      expect(wrapper.vm.loading).toEqual(false);
      expect(wrapper.vm.options).toEqual(3);
    }, 1000);
  });

  it('should clear selected option when single autocomplete is emptied', async () => {
    const wrapper = mount(AutocompleteInput, {
      props: {
        createOptions: syncFunction,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
      },
    });
    wrapper.find('input').setValue('');
    wrapper.find('input').trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toEqual([[null]]);
  });

  it('should not clear selected option when multi autocomplete is emptied', async () => {
    const wrapper = mount(AutocompleteInput, {
      props: {
        createOptions: syncFunction,
        modelValue: [
          {
            id: 1,
            label: 'HR Admin',
          },
        ],
        multiple: true,
      },
    });
    wrapper.find('input').setValue('');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
});
