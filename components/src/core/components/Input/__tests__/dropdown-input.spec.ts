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

import {mount, shallowMount} from '@vue/test-utils';
import Input from '@ohrm/oxd/core/components/Input/Input.vue';
import DropdownInput from '@ohrm/oxd/core/components/Input/DropdownInput.vue';
import Spinner from '@ohrm/oxd/core/components/Loader/Spinner.vue';

const dropdownOptions = [
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

const syncFunction = function () {
  return dropdownOptions;
};

const asyncFunction = async function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dropdownOptions);
    }, 500);
  });
};

describe('DropdownInput.vue', () => {
  it('renders OXD Dropdown Input', () => {
    const wrapper = shallowMount(DropdownInput);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not open the dropdown when the el is clicked but the component is disabled', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
        disabled: true,
      },
    });
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('dropdown:opened')).toBeFalsy();
    expect(wrapper.vm.open).toEqual(false);
    expect(wrapper.find('.oxd-dropdown-options').exists()).toBeFalsy();
  });

  it('should open the dropdown when the el is clicked', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
      },
    });
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('dropdown:opened')).toBeTruthy();
    expect(wrapper.vm.open).toEqual(true);
    expect(wrapper.find('.oxd-dropdown-options').exists()).toBeTruthy();
  });

  it('should not open the dropdown when the arrow is clicked if disabled', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
        disabled: true,
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.find('.oxd-icon.--arrow').trigger('click');
    expect(wrapper.find('.oxd-icon.--arrow').classes()).toContain(
      'bi-caret-down-fill',
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-icon.--arrow').classes()).toContain(
      'bi-caret-down-fill',
    );
    expect(wrapper.emitted('dropdown:opened')).toBeFalsy();
    expect(wrapper.vm.open).toEqual(false);
    expect(wrapper.find('.oxd-dropdown-options').exists()).toBeFalsy();
  });

  it('should open the dropdown when the arrow is clicked if not disbled', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.find('.oxd-icon.--arrow').trigger('click');
    expect(wrapper.find('.oxd-icon.--arrow').classes()).toContain(
      'bi-caret-down-fill',
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-icon.--arrow').classes()).toContain(
      'bi-caret-up-fill',
    );
    expect(wrapper.emitted('dropdown:opened')).toBeTruthy();
    expect(wrapper.vm.open).toEqual(true);
    expect(wrapper.find('.oxd-dropdown-options').exists()).toBeTruthy();
  });

  it('will close the dropdown and emit blur event onBlur', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
      },
    });
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('dropdown:opened')).toBeTruthy();
    expect(wrapper.vm.open).toEqual(true);
    wrapper.findComponent(Input).trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('dropdown:closed')).toBeTruthy();
    expect(wrapper.vm.open).toEqual(false);
  });

  it('will load options from array', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
      },
    });
    expect(wrapper.vm.localOptions.length).toEqual(3);
    expect(wrapper.vm.filteredOptions.length).toEqual(3);
  });

  it('will filter options from array', () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
      },
    });
    wrapper.findComponent(Input).setValue('HR Admin');
    // offset for debounce
    setTimeout(() => {
      expect(wrapper.vm.localOptions.length).toEqual(3);
      expect(wrapper.vm.filteredOptions.length).toEqual(1);
    }, 600);
  });

  it('will load options from sync function', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        createOptions: syncFunction,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.localOptions.length).toEqual(3);
    expect(wrapper.vm.filteredOptions.length).toEqual(3);
  });

  it('will load options from async function', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        createOptions: asyncFunction,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isLoading).toEqual(true);
    expect(wrapper.findComponent(Spinner).exists()).toBeTruthy();
    expect(wrapper.vm.localOptions.length).toEqual(0);
    // offset for loading
    setTimeout(() => {
      expect(wrapper.vm.isLoading).toEqual(false);
      expect(wrapper.findComponent(Spinner).exists()).toBeFalsy();
      expect(wrapper.vm.localOptions.length).toEqual(3);
    }, 600);
  });

  it('will select options from dropdown', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
      },
    });
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.oxd-dropdown-options-item').length).toEqual(3);
    wrapper.findAll('.oxd-dropdown-options-item')[0].trigger('mousedown');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('will not select options from dropdown if disabled', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
        disabledOptions: [1],
      },
    });
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.oxd-dropdown-options-item').length).toEqual(3);
    wrapper.findAll('.oxd-dropdown-options-item')[0].trigger('mousedown');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedOptions.length).toEqual(0);
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('will select multiple options from dropdown', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
        multiple: true,
      },
    });
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.findAll('.oxd-dropdown-options-item')[0].trigger('mousedown');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.findAll('.oxd-dropdown-options-item')[1].trigger('mousedown');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('will clear select options from dropdown', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
        modelValue: [
          {
            id: 1,
            label: 'HR Admin',
          },
        ],
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.find('.oxd-icon.--clear').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('dropdown:cleared')).toBeTruthy();
  });

  it('will display clear icon', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
        modelValue: [
          {
            id: 1,
            label: 'HR Admin',
          },
        ],
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-icon.--clear').exists()).toBeTruthy();
  });

  it('will not display clear icon if not selected', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-icon.--clear').exists()).toBeFalsy();
  });

  it('will not display clear icon if clear option disabled', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
        clear: false,
        modelValue: [
          {
            id: 1,
            label: 'HR Admin',
          },
        ],
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-icon.--clear').exists()).toBeFalsy();
  });

  it('will auto preselect given options', () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
        multiple: true,
        modelValue: [
          {
            id: 1,
            label: 'HR Admin',
          },
          {
            id: 2,
            label: 'ESS User',
          },
        ],
      },
    });
    expect(wrapper.vm.selectedOptions.length).toEqual(2);
  });
});
