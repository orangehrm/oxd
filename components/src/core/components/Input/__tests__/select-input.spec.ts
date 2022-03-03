import {mount, shallowMount} from '@vue/test-utils';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';
import SelectText from '@orangehrm/oxd/core/components/Input/Select/SelectText.vue';
import SelectOption from '@orangehrm/oxd/core/components/Input/Select/SelectOption.vue';
import {BOTTOM} from '@orangehrm/oxd/core/components/Input/types.ts';

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

describe('SelectInput.vue', () => {
  it('renders OXD Select Input', () => {
    const wrapper = mount(SelectInput, {
      props: {options},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should load options to Select', async () => {
    const wrapper = mount(SelectInput, {
      props: {options},
    });
    wrapper.findComponent(SelectText).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    expect(nodes.length).toBe(4);
  });
  it('should select one option', async () => {
    const wrapper = mount(SelectInput, {
      props: {options},
    });
    wrapper.findComponent(SelectText).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    await nodes[1].trigger('mousedown');
    expect(wrapper.emitted('update:modelValue')).toEqual([
      [
        {
          id: 1,
          label: 'HR Admin',
          _selected: false,
        },
      ],
    ]);
  });
  it('should select none if placeholder selected', async () => {
    const wrapper = mount(SelectInput, {
      props: {options},
    });
    wrapper.findComponent(SelectText).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    await nodes[0].trigger('mousedown');
    expect(wrapper.emitted('update:modelValue')).toEqual([[null]]);
  });
  it('should not select already selected option', async () => {
    const wrapper = mount(SelectInput, {
      props: {
        options,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
      },
    });
    wrapper.findComponent(SelectText).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    await nodes[1].trigger('mousedown');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
  it('should not have placeholder', async () => {
    const wrapper = mount(SelectInput, {
      props: {
        options,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
        showEmptySelector: false,
      },
    });
    wrapper.findComponent(SelectText).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    await nodes[0].trigger('mousedown');
    expect(nodes.length).toBe(3);
  });

  it ('When place holder is there should have class --with-empty-selector', async () => {
    const wrapper = shallowMount(SelectInput, {
      props: {
        options,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
        dropdownPosition: BOTTOM,
        showEmptySelector: true,
        hideDropdownDefaultLabel: false,
      },
    });
    expect(wrapper.vm.dropdownClasses).toStrictEqual({
      '--positon-bottom': true,
      '--positon-top': false,
      '--with-empty-selector': true,
    });
  });

  it ('When place holder not there should not have class --with-empty-selector', async () => {
    const wrapper = shallowMount(SelectInput, {
      props: {
        options,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
        dropdownPosition: BOTTOM,
        showEmptySelector: false,
        hideDropdownDefaultLabel: false,
      },
    });
    expect(wrapper.vm.dropdownClasses).toStrictEqual({
      '--positon-bottom': true,
      '--positon-top': false,
      '--with-empty-selector': false,
    });
  });

  it ('When place holder is hidden should not have class --with-empty-selector', async () => {
    const wrapper = shallowMount(SelectInput, {
      props: {
        options,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
        dropdownPosition: BOTTOM,
        showEmptySelector: true,
        hideDropdownDefaultLabel: true,
      },
    });
    expect(wrapper.vm.dropdownClasses).toStrictEqual({
      '--positon-bottom': true,
      '--positon-top': false,
      '--with-empty-selector': false,
    });
  });

});
