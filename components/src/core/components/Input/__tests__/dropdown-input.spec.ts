import {mount, shallowMount} from '@vue/test-utils';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import DropdownInput from '@orangehrm/oxd/core/components/Input/DropdownInput.vue';
import Spinner from '@orangehrm/oxd/core/components/Loader/Spinner.vue';

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

const syncFunction = function() {
  return dropdownOptions;
};

const asyncFunction = async function() {
  return new Promise(resolve => {
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

  it('will not load options from array if lazy', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
        lazyLoad: true,
      },
    });
    expect(wrapper.vm.localOptions.length).toEqual(0);
    expect(wrapper.vm.filteredOptions.length).toEqual(0);
  });

  it('will load options from array if lazy on filter', () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
        lazyLoad: true,
      },
    });
    wrapper.findComponent(Input).setValue('HR Admin');
    // offset for debounce
    setTimeout(() => {
      expect(wrapper.vm.localOptions.length).toEqual(3);
      expect(wrapper.vm.filteredOptions.length).toEqual(1);
    }, 600);
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
        options: syncFunction,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.localOptions.length).toEqual(3);
    expect(wrapper.vm.filteredOptions.length).toEqual(3);
  });

  it('will load options from async function', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: asyncFunction,
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
    expect(wrapper.vm.selected.length).toEqual(1);
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
    expect(wrapper.vm.selected.length).toEqual(0);
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
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.findAll('.oxd-dropdown-options-item')[1].trigger('mousedown');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selected.length).toEqual(2);
  });

  it('will clear select options from dropdown', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
      },
    });
    wrapper.vm.selected.push({
      id: 1,
      label: 'HR Admin',
    });
    await wrapper.vm.$nextTick();
    wrapper.find('.oxd-icon.--clear').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selected.length).toEqual(0);
    expect(wrapper.emitted('dropdown:cleared')).toBeTruthy();
  });

  it('will display clear icon', async () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
      },
    });
    wrapper.vm.selected.push({
      id: 1,
      label: 'HR Admin',
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
      },
    });
    wrapper.vm.selected.push({
      id: 1,
      label: 'HR Admin',
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-icon.--clear').exists()).toBeFalsy();
  });

  it('will auto preselect first option', () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
        preSelect: true,
      },
    });
    expect(wrapper.vm.selected.length).toEqual(1);
  });

  it('will auto preselect given options', () => {
    const wrapper = mount(DropdownInput, {
      props: {
        options: dropdownOptions,
        preSelect: true,
        multiple: true,
        selectedOptions: [1, 2],
      },
    });
    expect(wrapper.vm.selected.length).toEqual(2);
  });
});
