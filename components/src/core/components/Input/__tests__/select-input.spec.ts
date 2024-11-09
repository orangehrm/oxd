import {mount, shallowMount} from '@vue/test-utils';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';
import SelectText from '@orangehrm/oxd/core/components/Input/Select/SelectText.vue';
import SelectOption from '@orangehrm/oxd/core/components/Input/Select/SelectOption.vue';
import {BOTTOM} from '@orangehrm/oxd/core/components/Input/types';
import SelectInputButton from '@orangehrm/oxd/core/components/Input/Select/SelectInputButton.vue';

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
      props: {
        options,
      },
    });
    wrapper.findComponent(SelectText).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    expect(nodes.length).toBe(3);
  });
  it('should select one option', async () => {
    const wrapper = mount(SelectInput, {
      props: {
        options,
      },
    });
    wrapper.findComponent(SelectText).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    await nodes[0].trigger('mousedown');
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
  it('on Focus it should add class "oxd-select-text--focus"', async () => {
    const wrapper = mount(SelectInput, {
      props: {options, readonly: false, disabled: false},
    });
    wrapper.findComponent(SelectText).trigger('focus');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-select-text--focus').exists()).toBe(true);
  });
  it('on Focus it should not add class "oxd-select-text--focus" when Select is disabled', async () => {
    const wrapper = mount(SelectInput, {
      props: {options, readonly: false, disabled: true},
    });
    wrapper.findComponent(SelectText).trigger('focus');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-select-text--focus').exists()).toBe(false);
  });

  it('on Blur it should add class "oxd-select-text--active"', async () => {
    const wrapper = mount(SelectInput, {
      props: {options, readonly: false, disabled: false},
    });
    wrapper.findComponent(SelectText).trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-select-text--active').exists()).toBe(true);
  });

  it('Id filed append to the input field of Select"', async () => {
    const wrapper = mount(SelectInput, {
      props: {id: 'form_select', options},
    });
    wrapper.findComponent(SelectText).trigger('blur');
    await wrapper.vm.$nextTick();
    const Input = wrapper.find('input');
    expect(Input.attributes('id')).toBe('form_select');
  });

  it('Class filed not to append to the input field of Select"', async () => {
    const wrapper = mount(SelectInput, {
      props: {class: 'sampleClass', options},
    });
    wrapper.findComponent(SelectText).trigger('blur');
    await wrapper.vm.$nextTick();
    const Input = wrapper.find('input');
    expect(Input.classes('sampleClass')).not.toBe(true);
  });

  it('should not select already selected option', async () => {
    const wrapper = mount(SelectInput, {
      props: {
        options,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
        showEmptySelector: true,
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

  it('When place holder is there should have class --with-empty-selector', async () => {
    const wrapper = shallowMount(SelectInput, {
      props: {
        options,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
        dropdownPosition: BOTTOM,
        showEmptySelector: true,
      },
    });
    expect(wrapper.vm.dropdownClasses).toStrictEqual({
      '--positon-bottom': true,
      '--positon-top': false,
      '--with-empty-selector': true,
    });
  });

  it('When place holder not there should not have class --with-empty-selector', async () => {
    const wrapper = shallowMount(SelectInput, {
      props: {
        options,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
        dropdownPosition: BOTTOM,
        showEmptySelector: false,
      },
    });
    expect(wrapper.vm.dropdownClasses).toStrictEqual({
      '--positon-bottom': true,
      '--positon-top': false,
      '--with-empty-selector': false,
    });
  });

  it('When place holder is hidden should not have class --with-empty-selector', async () => {
    const wrapper = shallowMount(SelectInput, {
      props: {
        options,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
        dropdownPosition: BOTTOM,
      },
    });
    expect(wrapper.vm.dropdownClasses).toStrictEqual({
      '--positon-bottom': true,
      '--positon-top': false,
      '--with-empty-selector': false,
    });
  });

  it('when click on icon opens the dropdown', async () => {
    const wrapper = mount(SelectInput, {
      props: {options},
    });
    wrapper.find('.oxd-select-text--after i.oxd-icon').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('click'));

    wrapper.find('.oxd-select-text--after i.oxd-icon').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('click'));
  });

  it('when click on input to opens the dropdown', async () => {
    const wrapper = mount(SelectInput, {
      props: {options},
    });
    wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('click'));

    wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('click'));
  });

  it('when click on input to opens the dropdown and display spinner', async () => {
    const wrapper = mount(SelectInput, {
      props: {
        options,
        isLoading: true,
      },
    });
    wrapper.findComponent(SelectText).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    expect(nodes.length).toBe(1);
    expect(
      wrapper.find('.oxd-select-input-spinner-wrapper').exists(),
    ).toBeTruthy();
  });

  it('should render the additional icon when additionalIconName is provided', async () => {
    const wrapper = mount(SelectInputButton, {
      props: {
        options,
        additionalIconName: 'oxd-best-match',
        doubleLineLabel: true,
        hideDropdownLabel: false,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
      },
    });
    const additionalIconContainer = wrapper.find(
      '.oxd-select-info-button-container',
    );
    expect(additionalIconContainer.exists()).toBeTruthy();
    const additionalIcon = additionalIconContainer.find(
      '.oxd-select-info-button',
    );
    expect(additionalIcon.exists()).toBeTruthy();
    await additionalIcon.trigger('click');
    expect(wrapper.emitted('onAdditionalIconClick')).toBeTruthy();
  });

  it('should pass default prop icons values to oxd-icon-button (oxd-select-dropdown-trigger) as props when no open-close icons are passed', async () => {
    const wrapper = mount(SelectInputButton, {
      props: {
        options,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
      },
    });

    let iconButton = wrapper.findComponent({name: 'oxd-icon-button'});
    expect(iconButton.props('name')).toBe('oxd-chevron-down');

    wrapper.setData({dropdownOpen: true});
    iconButton = wrapper.findComponent({name: 'oxd-icon-button'});
    await wrapper.vm.$nextTick();
    expect(iconButton.props('name')).toBe('oxd-chevron-up');
  });

  it('should pass correct icons as props to oxd-icon-button (oxd-select-dropdown-trigger)', async () => {
    const dropdownTriggerOpenIcon = 'oxd-dropdown-open-icon';
    const dropdownTriggerCloseIcon = 'oxd-dropdown-close-icon';

    const wrapper = mount(SelectInputButton, {
      props: {
        options,
        dropdownTriggerOpenIcon,
        dropdownTriggerCloseIcon,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
      },
    });

    let iconButton = wrapper.findComponent({name: 'oxd-icon-button'});
    expect(iconButton.props('name')).toBe(dropdownTriggerOpenIcon);

    wrapper.setData({dropdownOpen: true});
    iconButton = wrapper.findComponent({name: 'oxd-icon-button'});
    await wrapper.vm.$nextTick();
    expect(iconButton.props('name')).toBe(dropdownTriggerCloseIcon);
  });
});
