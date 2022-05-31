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
    expect(nodes.length).toBe(3);
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
});
