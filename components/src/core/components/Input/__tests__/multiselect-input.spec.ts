import {mount} from '@vue/test-utils';
import MultiSelectInput from '@orangehrm/oxd/core/components/Input/MultiSelect/MultiSelectInput.vue';
import SelectText from '@orangehrm/oxd/core/components/Input/Select/SelectText.vue';
import SelectOption from '@orangehrm/oxd/core/components/Input/Select/SelectOption.vue';

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

describe('MultiSelectInput.vue', () => {
  it('renders OXD MultiSelect Input', () => {
    const wrapper = mount(MultiSelectInput, {
      props: {options, modelValue: []},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should load options to Select', async () => {
    const wrapper = mount(MultiSelectInput, {
      props: {options, modelValue: []},
    });
    wrapper.findComponent(SelectText).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    expect(nodes.length).toBe(10);
  });
  it('should select one option', async () => {
    const wrapper = mount(MultiSelectInput, {
      props: {options, modelValue: []},
    });
    wrapper.findComponent(SelectText).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    await nodes[0].trigger('mousedown');
    expect(wrapper.emitted('update:modelValue')).toEqual([
      [
        [
          {
            id: 1,
            label: 'HR Admin',
            _selected: false,
          },
        ],
      ],
    ]);
  });
  it('should not select already selected option', async () => {
    const wrapper = mount(MultiSelectInput, {
      props: {
        options,
        modelValue: [
          {
            id: 1,
            label: 'HR Admin',
          },
        ],
      },
    });
    wrapper.findComponent(SelectText).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    await nodes[0].trigger('mousedown');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
  it('should be able to select multiple options', async () => {
    const wrapper = mount(MultiSelectInput, {
      props: {
        options,
        modelValue: [
          {
            id: 1,
            label: 'HR Admin',
          },
        ],
      },
    });
    wrapper.findComponent(SelectText).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    await nodes[1].trigger('mousedown');
    expect(wrapper.emitted('update:modelValue')).toEqual([
      [
        [
          {
            id: 1,
            label: 'HR Admin',
          },
          {
            id: 2,
            label: 'ESS User',
            _selected: false,
          },
        ],
      ],
    ]);
  });
  it('should able to remove selected chip', async () => {
    const wrapper = mount(MultiSelectInput, {
      props: {
        options,
        modelValue: [
          {
            id: 1,
            label: 'HR Admin',
          },
        ],
      },
    });
    const cancelButton = wrapper.find("[data-test='removeIcon']");
    await cancelButton.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')).toEqual([[[]]]);
  });
  it('should not able to remove selected chip when readonly mode', async () => {
    const wrapper = mount(MultiSelectInput, {
      props: {
        options,
        readonly: true,
        modelValue: [
          {
            id: 1,
            label: 'HR Admin',
          },
        ],
      },
    });
    const cancelButton = wrapper.find("[data-test='removeIcon']");
    await cancelButton.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
  it('should not able to remove selected chip when disabled mode', async () => {
    const wrapper = mount(MultiSelectInput, {
      props: {
        options,
        disabled: true,
        modelValue: [
          {
            id: 1,
            label: 'HR Admin',
          },
        ],
      },
    });
    const cancelButton = wrapper.find("[data-test='removeIcon']");
    await cancelButton.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  describe('Keypress Cycling', () => {
    it('should cycle through all options starting with the same letter', async () => {
      const wrapper = mount(MultiSelectInput, {
        props: {
          options,
          modelValue: [],
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      // First press of 'S' should focus 'Supervisor' (index 2)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(2);

      // Second press of 'S' should focus 'Senior Executive' (index 3)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(3);

      // Third press of 'S' should focus 'Software Engineer' (index 4)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(4);

      // Fourth press of 'S' should focus 'Sales Manager' (index 5)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(5);

      // Fifth press of 'S' should focus 'System Administrator' (index 6)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(6);

      // Sixth press of 'S' should focus 'Security Analyst' (index 9, skipping disabled option)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(9);

      // Seventh press of 'S' should cycle back to 'Supervisor' (index 2)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(2);
    });

    it('should handle independent cycling for different letters', async () => {
      const wrapper = mount(MultiSelectInput, {
        props: {
          options,
          modelValue: [],
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      // Press 'S' to focus first S option
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(2); // Supervisor

      // Press 'M' to focus first M option
      await selectText.trigger('keydown', {key: 'm'});
      expect(wrapper.vm.pointer).toBe(7); // Manager

      // Press 'S' again - should focus Supervisor (first S option)
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(2); // Supervisor

      // Press 'H' to focus HR Admin
      await selectText.trigger('keydown', {key: 'h'});
      expect(wrapper.vm.pointer).toBe(0); // HR Admin
    });

    it('should skip disabled options during cycling', async () => {
      const optionsWithDisabled = [
        {id: 1, label: 'Sales Manager'},
        {id: 2, label: 'Senior Executive', _disabled: true},
        {id: 3, label: 'Software Engineer'},
        {id: 4, label: 'System Administrator', _disabled: true},
        {id: 5, label: 'Security Analyst'},
      ];

      const wrapper = mount(MultiSelectInput, {
        props: {
          options: optionsWithDisabled,
          modelValue: [],
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      // First press should focus 'Sales Manager'
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(0);

      // Second press should skip disabled 'Senior Executive' and focus 'Software Engineer'
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(2);

      // Third press should skip disabled 'System Administrator' and focus 'Security Analyst'
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(4);

      // Fourth press should cycle back to 'Sales Manager'
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(0);
    });

    it('should handle case insensitive keypress', async () => {
      const wrapper = mount(MultiSelectInput, {
        props: {
          options,
          modelValue: [],
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      // Press uppercase 'S'
      await selectText.trigger('keydown', {key: 'S'});
      expect(wrapper.vm.pointer).toBe(2); // Supervisor

      // Press lowercase 's' - should continue cycling
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(3); // Senior Executive
    });

    it('should not trigger on multi-character keys', async () => {
      const wrapper = mount(MultiSelectInput, {
        props: {
          options,
          modelValue: [],
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
      const wrapper = mount(MultiSelectInput, {
        props: {
          options,
          modelValue: [],
          disabled: true,
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      await selectText.trigger('keydown', {key: 's'});

      // Should not emit any modelValue updates when disabled
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('should not trigger when readonly', async () => {
      const wrapper = mount(MultiSelectInput, {
        props: {
          options,
          modelValue: [],
          readonly: true,
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      await selectText.trigger('keydown', {key: 's'});

      // Should not emit any modelValue updates when readonly
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('should handle no matching options gracefully', async () => {
      const wrapper = mount(MultiSelectInput, {
        props: {
          options: [
            {id: 1, label: 'HR Admin'},
            {id: 2, label: 'Manager'},
          ],
          modelValue: [],
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      // Press 'Z' - no options start with Z
      await selectText.trigger('keydown', {key: 'z'});

      // Should not emit any modelValue updates
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('should handle single matching option', async () => {
      const wrapper = mount(MultiSelectInput, {
        props: {
          options: [
            {id: 1, label: 'HR Admin'},
            {id: 2, label: 'Manager'},
            {id: 3, label: 'Supervisor'},
          ],
          modelValue: [],
        },
      });

      const selectText = wrapper.findComponent(SelectText);

      // Press 'S' - only one option starts with S
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(2); // Supervisor

      // Press 'S' again - should focus the same option again
      await selectText.trigger('keydown', {key: 's'});
      expect(wrapper.vm.pointer).toBe(2); // Supervisor
    });
  });
});
