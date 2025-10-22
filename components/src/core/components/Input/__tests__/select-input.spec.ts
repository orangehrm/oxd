import {mount, shallowMount} from '@vue/test-utils';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';
import SelectText from '@orangehrm/oxd/core/components/Input/Select/SelectText.vue';
import SelectOption from '@orangehrm/oxd/core/components/Input/Select/SelectOption.vue';
import {BOTTOM} from '@orangehrm/oxd/core/components/Input/types';
import SelectInputButton from '@orangehrm/oxd/core/components/Input/Select/SelectInputButton.vue';
import {flushPromises} from '@vue/test-utils';

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

const optionsWithMultipleS = [
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
  {
    id: 4,
    label: 'Senior Executive',
  },
  {
    id: 5,
    label: 'Software Engineer',
  },
  {
    id: 6,
    label: 'Sales Manager',
  },
  {
    id: 7,
    label: 'System Administrator',
  },
  {
    id: 8,
    label: 'Manager',
  },
  {
    id: 9,
    label: 'Assistant Manager',
    _disabled: true,
  },
  {
    id: 10,
    label: 'Security Analyst',
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

  it('should not translate option labels when translateOptions is false', async () => {
    const $vt = jest.fn();
    const wrapper = mount(SelectInput, {
      props: {
        options,
        translateOptions: false,
      },
      global: {
        mocks: {
          $vt,
        },
      },
    });
    wrapper.findComponent(SelectText).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    expect(nodes[0].text()).toBe('HR Admin');
    expect(nodes[1].text()).toBe('ESS User');
    expect(nodes[2].text()).toBe('Supervisor');
    expect($vt).not.toHaveBeenCalled();
  });

  it('should compute dropdownClasses conditionally based on forceDropdownPosition prop', async () => {
    const wrapper = mount(SelectInput, {
      props: {
        options,
        forceDropdownPosition: true,
        dropdownPosition: 'top',
      },
    });

    wrapper.findComponent(SelectText).trigger('click');
    await wrapper.vm.$nextTick();

    const dropdown = wrapper.findComponent({name: 'oxd-select-dropdown'});
    expect(dropdown.exists()).toBe(true);

    expect(wrapper.vm.dropdownClasses).toStrictEqual({
      '--positon-bottom': false,
      '--positon-top': true,
      '--with-empty-selector': false,
    });
  });

  describe('Scrolling Behavior', () => {
    it('should scroll to selected option when dropdown opens', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          options,
          modelValue: {
            id: 2,
            label: 'ESS User',
          },
        },
      });

      const scrollToOptionByIndex = jest.spyOn(
        wrapper.vm,
        'scrollToOptionByIndex',
      );

      wrapper.findComponent(SelectText).trigger('click');
      await wrapper.vm.$nextTick();
      await flushPromises();

      expect(scrollToOptionByIndex).toHaveBeenCalledWith(1);
    });

    it('should scroll to scrollToOption prop when no selection exists', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          options,
          scrollToOption: {
            id: 3,
            label: 'Supervisor',
          },
        },
      });

      const scrollToOptionByIndex = jest.spyOn(
        wrapper.vm,
        'scrollToOptionByIndex',
      );

      wrapper.findComponent(SelectText).trigger('click');
      await wrapper.vm.$nextTick();
      await flushPromises();

      expect(scrollToOptionByIndex).toHaveBeenCalledWith(2);
    });

    it('should prioritize selected value over scrollToOption prop', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          options,
          modelValue: {
            id: 1,
            label: 'HR Admin',
          },
          scrollToOption: {
            id: 3,
            label: 'Supervisor',
          },
        },
      });

      const scrollToOptionByIndex = jest.spyOn(
        wrapper.vm,
        'scrollToOptionByIndex',
      );

      wrapper.findComponent(SelectText).trigger('click');
      await wrapper.vm.$nextTick();
      await flushPromises();

      // Should scroll to modelValue (index 0), not scrollToOption (index 2)
      expect(scrollToOptionByIndex).toHaveBeenCalledWith(0);
    });
  });

  describe('Keypress Cycling', () => {
    it('should cycle through all options starting with the same letter', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          options: optionsWithMultipleS,
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      // First press of 'S' should select 'Supervisor' (index 2)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')).toEqual([
        [{id: 3, label: 'Supervisor', _selected: false}],
      ]);

      // Second press of 'S' should select 'Senior Executive' (index 3)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![1]).toEqual([
        {id: 4, label: 'Senior Executive', _selected: false},
      ]);

      // Third press of 'S' should select 'Software Engineer' (index 4)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![2]).toEqual([
        {id: 5, label: 'Software Engineer', _selected: false},
      ]);

      // Fourth press of 'S' should select 'Sales Manager' (index 5)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![3]).toEqual([
        {id: 6, label: 'Sales Manager', _selected: false},
      ]);

      // Fifth press of 'S' should select 'System Administrator' (index 6)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![4]).toEqual([
        {id: 7, label: 'System Administrator', _selected: false},
      ]);

      // Sixth press of 'S' should select 'Security Analyst' (index 9, skipping disabled option)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![5]).toEqual([
        {id: 10, label: 'Security Analyst', _selected: false},
      ]);

      // Seventh press of 'S' should cycle back to 'Supervisor' (index 2)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![6]).toEqual([
        {id: 3, label: 'Supervisor', _selected: false},
      ]);
    });

    it('should handle independent cycling for different letters', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          options: optionsWithMultipleS,
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      // Press 'S' to select first S option
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([
        {id: 3, label: 'Supervisor', _selected: false},
      ]);

      // Press 'M' to select first M option
      await selectText.trigger('keydown', {key: 'm'});
      expect(wrapper.emitted('update:modelValue')![1]).toEqual([
        {id: 8, label: 'Manager', _selected: false},
      ]);

      // Press 'S' again - should select Supervisor (first S option)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![2]).toEqual([
        {id: 3, label: 'Supervisor', _selected: false},
      ]);

      // Press 'H' to select HR Admin
      await selectText.trigger('keydown', {key: 'h'});
      expect(wrapper.emitted('update:modelValue')![3]).toEqual([
        {id: 1, label: 'HR Admin', _selected: false},
      ]);
    });

    it('should skip disabled options during cycling', async () => {
      const optionsWithDisabled = [
        {id: 1, label: 'Sales Manager'},
        {id: 2, label: 'Senior Executive', _disabled: true},
        {id: 3, label: 'Software Engineer'},
        {id: 4, label: 'System Administrator', _disabled: true},
        {id: 5, label: 'Security Analyst'},
      ];

      const wrapper = mount(SelectInput, {
        props: {
          options: optionsWithDisabled,
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      // First press should select 'Sales Manager'
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([
        {id: 1, label: 'Sales Manager', _selected: false},
      ]);

      // Second press should skip disabled 'Senior Executive' and select 'Software Engineer'
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![1]).toEqual([
        {id: 3, label: 'Software Engineer', _selected: false},
      ]);

      // Third press should skip disabled 'System Administrator' and select 'Security Analyst'
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![2]).toEqual([
        {id: 5, label: 'Security Analyst', _selected: false},
      ]);

      // Fourth press should cycle back to 'Sales Manager'
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![3]).toEqual([
        {id: 1, label: 'Sales Manager', _selected: false},
      ]);
    });

    it('should handle case insensitive keypress', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          options: optionsWithMultipleS,
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      // Press uppercase 'S'
      await selectText.trigger('keydown', {key: 'S'});
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([
        {id: 3, label: 'Supervisor', _selected: false},
      ]);

      // Press lowercase 's' - should continue cycling
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![1]).toEqual([
        {id: 4, label: 'Senior Executive', _selected: false},
      ]);
    });

    it('should not trigger on multi-character keys', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          options: optionsWithMultipleS,
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      // Press multi-character keys
      await selectText.trigger('keydown', {key: 'Enter'});
      await selectText.trigger('keydown', {key: 'Escape'});
      await selectText.trigger('keydown', {key: 'ArrowDown'});

      // Should not emit any modelValue updates
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('should not trigger when disabled', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          options: optionsWithMultipleS,
          disabled: true,
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      await selectText.trigger('keydown', {key: 's'});

      // Should not emit any modelValue updates when disabled
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('should not trigger when readonly', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          options: optionsWithMultipleS,
          readonly: true,
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      await selectText.trigger('keydown', {key: 's'});

      // Should not emit any modelValue updates when readonly
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('should handle no matching options gracefully', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          options: [
            {id: 1, label: 'HR Admin'},
            {id: 2, label: 'Manager'},
          ],
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      // Press 'Z' - no options start with Z
      await selectText.trigger('keydown', {key: 'z'});

      // Should not emit any modelValue updates
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('should handle single matching option', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          options: [
            {id: 1, label: 'HR Admin'},
            {id: 2, label: 'Manager'},
            {id: 3, label: 'Supervisor'},
          ],
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      // Press 'S' - only one option starts with S
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([
        {id: 3, label: 'Supervisor', _selected: false},
      ]);

      // Press 'S' again - should select the same option again
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.emitted('update:modelValue')![1]).toEqual([
        {id: 3, label: 'Supervisor', _selected: false},
      ]);
    });
  });
});
