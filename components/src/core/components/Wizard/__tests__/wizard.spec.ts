import {mount} from '@vue/test-utils';
import Wizard from '@orangehrm/oxd/core/components/Wizard/Wizard.vue';
import {WizardEvent, WizardTab} from '../types';

describe('Wizard.vue', () => {
  const defaultTabs: WizardTab[] = [
    {id: 1, title: 'Step 1'},
    {id: 2, title: 'Step 2'},
    {id: 3, title: 'Step 3'},
  ];

  it('renders wizard with default props', () => {
    const wrapper = mount(Wizard, {
      props: {
        tabs: defaultTabs,
        modelValue: 1,
      },
    });

    expect(wrapper.findAll('.oxd-wizard-tab')).toHaveLength(3);
    expect(wrapper.find('.oxd-wizard-tab.--active').exists()).toBe(true);
    expect(
      wrapper.find('.oxd-wizard-tab-circle-button.--active').exists(),
    ).toBe(true);
  });

  it('validates tabs prop length', () => {
    const invalidTabs = [{id: 1, title: 'Step 1'}];

    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    mount(Wizard, {
      props: {
        tabs: invalidTabs,
        modelValue: 1,
      },
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('emits update:modelValue when clicking on a tab', async () => {
    const wrapper = mount(Wizard, {
      props: {
        tabs: defaultTabs,
        modelValue: 1,
      },
    });

    await wrapper.findAll('.oxd-wizard-tab-circle-button')[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    const emitted = wrapper.emitted('update:modelValue');
    if (emitted) {
      expect(emitted[0]).toEqual([2]);
    }
  });

  it('emits tab-click event when clicking on a tab', async () => {
    const wrapper = mount(Wizard, {
      props: {
        tabs: defaultTabs,
        modelValue: 1,
      },
    });

    await wrapper.findAll('.oxd-wizard-tab-circle-button')[1].trigger('click');
    expect(wrapper.emitted('tab-click')).toBeTruthy();
    const emitted = wrapper.emitted('tab-click');
    if (emitted) {
      const emittedEvent = emitted[0] as WizardEvent<MouseEvent>[];
      expect(emittedEvent[0].tab).toEqual(defaultTabs[1]);
    }
  });

  it('does not emit events when clicking on disabled tab', async () => {
    const tabs = [
      {id: 1, title: 'Step 1'},
      {id: 2, title: 'Step 2', disabled: true, clickable: false},
      {id: 3, title: 'Step 3'},
    ];

    const wrapper = mount(Wizard, {
      props: {
        tabs,
        modelValue: 1,
      },
    });

    await wrapper.findAll('.oxd-wizard-tab-circle-button')[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    expect(wrapper.emitted('tab-click')).toBeFalsy();
  });

  it('emits tab-focus and tab-blur events', async () => {
    const wrapper = mount(Wizard, {
      props: {
        tabs: defaultTabs,
        modelValue: 1,
      },
    });

    const button = wrapper.findAll('.oxd-wizard-tab-circle-button')[0];
    await button.trigger('focus');
    expect(wrapper.emitted('tab-focus')).toBeTruthy();
    const focusEmitted = wrapper.emitted('tab-focus');
    if (focusEmitted) {
      const focusEvent = focusEmitted[0] as WizardEvent<FocusEvent>[];
      expect(focusEvent[0].tab).toEqual(defaultTabs[0]);
    }

    await button.trigger('blur');
    expect(wrapper.emitted('tab-blur')).toBeTruthy();
    const blurEmitted = wrapper.emitted('tab-blur');
    if (blurEmitted) {
      const blurEvent = blurEmitted[0] as WizardEvent<FocusEvent>[];
      expect(blurEvent[0].tab).toEqual(defaultTabs[0]);
    }
  });

  it('shows completed icon when tab is completed and showCompletedIcon is true', () => {
    const tabs = [
      {id: 1, title: 'Step 1', completed: true},
      {id: 2, title: 'Step 2'},
      {id: 3, title: 'Step 3'},
    ];

    const wrapper = mount(Wizard, {
      props: {
        tabs,
        modelValue: 2,
        showCompletedIcon: true,
      },
    });

    const iconButton = wrapper.findComponent({name: 'oxd-icon-button'});
    expect(iconButton.exists()).toBe(true);
    expect(iconButton.props('name')).toBe('oxd-check');
    expect(
      wrapper.find('.oxd-wizard-tab-circle-button.--active').exists(),
    ).toBe(true);
  });

  it('uses custom icon name when provided', () => {
    const tabs = [
      {id: 1, title: 'Step 1', iconName: 'custom-icon'},
      {id: 2, title: 'Step 2'},
      {id: 3, title: 'Step 3'},
    ];

    const wrapper = mount(Wizard, {
      props: {
        tabs,
        modelValue: 1,
      },
    });

    const iconButton = wrapper.findComponent({name: 'oxd-icon-button'});
    expect(iconButton.exists()).toBe(true);
    expect(iconButton.props('name')).toBe('custom-icon');
  });

  it('uses default number icons when no custom icon is provided', () => {
    const wrapper = mount(Wizard, {
      props: {
        tabs: defaultTabs,
        modelValue: 1,
      },
    });

    const iconButtons = wrapper.findAllComponents({name: 'oxd-icon-button'});
    expect(iconButtons[0].props('name')).toBe('oxd-number-one');
    expect(iconButtons[1].props('name')).toBe('oxd-number-two');
    expect(iconButtons[2].props('name')).toBe('oxd-number-three');
  });

  it('does not emit events when tab is not clickable', async () => {
    const tabs = [
      {id: 1, title: 'Step 1', clickable: false},
      {id: 2, title: 'Step 2'},
      {id: 3, title: 'Step 3'},
    ];

    const wrapper = mount(Wizard, {
      props: {
        tabs,
        modelValue: 1,
      },
    });

    await wrapper.findAll('.oxd-wizard-tab-circle-button')[0].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    expect(wrapper.emitted('tab-click')).toBeFalsy();
  });

  it('emits update:modelValue and tab-click when clicking on tooltip of enabled and clickable tab', async () => {
    const wrapper = mount(Wizard, {
      props: {
        tabs: defaultTabs,
        modelValue: 1,
      },
    });

    await wrapper.findAll('.oxd-wizard-tab-circle-tooltip')[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    const modelValueEmitted = wrapper.emitted('update:modelValue');
    if (modelValueEmitted) {
      expect(modelValueEmitted[0]).toEqual([2]);
    }

    expect(wrapper.emitted('tab-click')).toBeTruthy();
    const tabClickEmitted = wrapper.emitted('tab-click');
    if (tabClickEmitted) {
      const emittedEvent = tabClickEmitted[0] as WizardEvent<MouseEvent>[];
      expect(emittedEvent[0].tab).toEqual(defaultTabs[1]);
      expect(emittedEvent[0].event).toBeInstanceOf(Event);
    }
  });

  it('does not emit events when clicking on tooltip of disabled tab', async () => {
    const tabs = [
      {id: 1, title: 'Step 1'},
      {id: 2, title: 'Step 2', disabled: true},
      {id: 3, title: 'Step 3'},
    ];

    const wrapper = mount(Wizard, {
      props: {
        tabs,
        modelValue: 1,
      },
    });

    await wrapper.findAll('.oxd-wizard-tab-circle-tooltip')[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    expect(wrapper.emitted('tab-click')).toBeFalsy();
  });

  it('does not emit events when clicking on tooltip of non-clickable tab', async () => {
    const tabs = [
      {id: 1, title: 'Step 1'},
      {id: 2, title: 'Step 2', clickable: false},
      {id: 3, title: 'Step 3'},
    ];

    const wrapper = mount(Wizard, {
      props: {
        tabs,
        modelValue: 1,
      },
    });

    await wrapper.findAll('.oxd-wizard-tab-circle-tooltip')[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    expect(wrapper.emitted('tab-click')).toBeFalsy();
  });

  it('does not emit events when clicking on tooltip of both disabled and non-clickable tab', async () => {
    const tabs = [
      {id: 1, title: 'Step 1'},
      {id: 2, title: 'Step 2', disabled: true, clickable: false},
      {id: 3, title: 'Step 3'},
    ];

    const wrapper = mount(Wizard, {
      props: {
        tabs,
        modelValue: 1,
      },
    });

    await wrapper.findAll('.oxd-wizard-tab-circle-tooltip')[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    expect(wrapper.emitted('tab-click')).toBeFalsy();
  });

  it('emits events when clicking on tooltip of tab with disabled: false and clickable: true', async () => {
    const tabs = [
      {id: 1, title: 'Step 1'},
      {id: 2, title: 'Step 2', disabled: false, clickable: true},
      {id: 3, title: 'Step 3'},
    ];

    const wrapper = mount(Wizard, {
      props: {
        tabs,
        modelValue: 1,
      },
    });

    await wrapper.findAll('.oxd-wizard-tab-circle-tooltip')[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('tab-click')).toBeTruthy();

    const modelValueEmitted = wrapper.emitted('update:modelValue');
    if (modelValueEmitted) {
      expect(modelValueEmitted[0]).toEqual([2]);
    }

    const tabClickEmitted = wrapper.emitted('tab-click');
    if (tabClickEmitted) {
      const emittedEvent = tabClickEmitted[0] as WizardEvent<MouseEvent>[];
      expect(emittedEvent[0].tab).toEqual(tabs[1]);
    }
  });
});
