import {mount} from '@vue/test-utils';
import TreeSelect from '@orangehrm/oxd/core/components/Input/TreeSelect/TreeSelect.vue';
import {BOTTOM} from '@orangehrm/oxd/core/components/Input/types';

const options = [
  {
    id: '1',
    label: 'Parent 1',
    children: [
      {
        id: '1-1',
        label: 'Child 1-1',
        children: [
          {
            id: '1-1-1',
            label: 'Grandchild 1-1-1',
          },
          {
            id: '1-1-2',
            label: 'Grandchild 1-1-2',
          },
        ],
      },
      {
        id: '1-2',
        label: 'Child 1-2',
      },
    ],
  },
  {
    id: '2',
    label: 'Parent 2',
    _disabled: true,
  },
];

describe('TreeSelect.vue', () => {
  it('renders OXD Tree Select', () => {
    const wrapper = mount(TreeSelect, {
      props: {options},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should load options to Tree Select', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
      },
    });
    wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAll('.oxd-select-option');
    expect(nodes.length).toBe(2); // Only parent nodes initially visible
  });

  it('should expand parent node when clicking expand icon', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
      },
    });
    wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.vm.$nextTick();

    const expandIcon = wrapper.find('.icon-td');
    await expandIcon.trigger('click');
    await wrapper.vm.$nextTick();

    const nodes = wrapper.findAll('.oxd-select-option');
    expect(nodes.length).toBe(4); // Parent + 2 children
  });

  it('should show selected count chip when multiple items are selected', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
        modelValue: ['1', '2'],
      },
    });
    await wrapper.vm.$nextTick();

    const chip = wrapper.find('.selected-count-chip');
    expect(chip.exists()).toBe(true);
  });

  it('should close dropdown when clicking outside', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
      },
    });
    wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-select-dropdown').exists()).toBe(true);

    // Simulate click outside
    document.body.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-select-dropdown').exists()).toBe(false);
  });

  it('should handle disabled state correctly', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
        disabled: true,
      },
    });

    wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-select-dropdown').exists()).toBe(false);
  });

  it('should handle readonly state correctly', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
        readonly: true,
      },
    });

    wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-select-dropdown').exists()).toBe(false);
  });

  it('should emit dropdown events correctly', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
      },
    });

    wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('dropdown:opened')).toBeTruthy();

    document.body.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('dropdown:closed')).toBeTruthy();
  });

  it('should handle keyboard navigation', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
      },
    });

    wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.vm.$nextTick();

    // Test escape key
    await wrapper.find('.oxd-select-text').trigger('keyup.esc');
    expect(wrapper.find('.oxd-select-dropdown').exists()).toBe(false);

    // Test enter key
    await wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.find('.oxd-select-text').trigger('keydown.enter');
    expect(wrapper.find('.oxd-select-dropdown').exists()).toBe(false);
  });

  it('should handle deeply nested items correctly', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
      },
    });
    wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.vm.$nextTick();

    // Expand first parent
    const firstExpandIcon = wrapper.find('.icon-td');
    await firstExpandIcon.trigger('click');
    await wrapper.vm.$nextTick();

    // Expand first child
    const secondExpandIcon = wrapper.findAll('.icon-td')[1];
    await secondExpandIcon.trigger('click');
    await wrapper.vm.$nextTick();

    const nodes = wrapper.findAll('.oxd-select-option');
    expect(nodes.length).toBe(6); // Parent + 2 children + 2 grandchildren
  });

  it('should select all nested children when parent is selected', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
        selectParentsOnChildSelection: true,
      },
    });
    wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.vm.$nextTick();

    // Expand all levels
    const firstExpandIcon = wrapper.find('.icon-td');
    await firstExpandIcon.trigger('click');
    await wrapper.vm.$nextTick();

    const secondExpandIcon = wrapper.findAll('.icon-td')[1];
    await secondExpandIcon.trigger('click');
    await wrapper.vm.$nextTick();

    // Select parent
    const checkbox = wrapper.find('.oxd-checkbox-input');
    await checkbox.trigger('click');
    await wrapper.vm.$nextTick();

    const selectedIds = (wrapper.emitted(
      'update:modelValue',
    ) as string[][])[0][0];
    expect(selectedIds).toContain('1');
    expect(selectedIds).toContain('1-1');
    expect(selectedIds).toContain('1-1-1');
    expect(selectedIds).toContain('1-1-2');
    expect(selectedIds).toContain('1-2');
  });

  it('should handle select all functionality', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
      },
    });
    wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.vm.$nextTick();

    // Click select all checkbox
    const selectAllCheckbox = wrapper.find(
      '.all-checkbox-div .oxd-checkbox-input',
    );
    await selectAllCheckbox.trigger('click');
    await wrapper.vm.$nextTick();

    const selectedIds = (wrapper.emitted(
      'update:modelValue',
    ) as string[][])[0][0];
    expect(selectedIds).toContain('1');
    expect(selectedIds).toContain('1-1');
    expect(selectedIds).toContain('1-1-1');
    expect(selectedIds).toContain('1-1-2');
    expect(selectedIds).toContain('1-2');
    expect(selectedIds).not.toContain('2');
  });

  it('should handle remove all selection', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
        removeAllSelection: true,
      },
    });
    wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.vm.$nextTick();

    // Select all checkbox should not be visible
    expect(wrapper.find('.all-checkbox-div').exists()).toBe(false);
  });

  it('should handle countTopmostParents prop', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
        modelValue: ['1', '1-1', '1-2'],
        countTopmostParents: false,
      },
    });
    await wrapper.vm.$nextTick();

    const chip = wrapper.find('.selected-count-chip');
    expect(chip.text()).toContain('+3');
  });

  it('should handle dropdown position prop', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
        dropdownPosition: BOTTOM,
      },
    });
    wrapper.find('.oxd-select-text').trigger('click');
    await wrapper.vm.$nextTick();

    const dropdown = wrapper.find('.oxd-select-dropdown');
    expect(dropdown.classes()).toContain('--positon-bottom');
  });

  it('should handle duplicate IDs validation', () => {
    const invalidOptions = [
      {
        id: '1',
        label: 'Parent 1',
        children: [
          {
            id: '1', // Duplicate ID
            label: 'Child 1-1',
          },
        ],
      },
    ];

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mount(TreeSelect, {
      props: {
        options: invalidOptions,
      },
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'prop validation error: treeSelect- options array prop cannot include duplicate option ids',
      ),
    );
    consoleSpy.mockRestore();
  });

  it('should handle modelValue updates', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        options,
        modelValue: ['1'],
      },
    });

    await wrapper.setProps({
      modelValue: ['1', '1-1'],
    });
    await wrapper.vm.$nextTick();

    const chip = wrapper.find('.selected-count-chip');
    expect(chip.exists()).toBe(true);
  });
});
