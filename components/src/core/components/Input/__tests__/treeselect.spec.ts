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
});
