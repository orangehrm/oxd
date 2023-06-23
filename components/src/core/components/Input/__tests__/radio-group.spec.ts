import {mount} from '@vue/test-utils';
import RadioGroup from '@orangehrm/oxd/core/components/Input/RadioGroup.vue';

const optionsList = [
  {
    id: 1,
    label: 'Item one',
  },
  {
    id: 2,
    label: 'Item two',
  },
];

describe('RadioGroup > RadioGroup.vue', () => {
  it('renders OXD RadioGroup', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsList,
        class: 'radio-column',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should accept valid input', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsList,
      },
    });
    wrapper.find('#radio-group-id_1').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
  });

  it('should emit the new value on click another radio button', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsList,
        modelValue: 1,
      },
    });
    wrapper.find('#radio-group-id_2').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]]);
  });

  it('should focus the checkbox', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsList,
      },
    });
    wrapper.find('#radio-group-id_1').trigger('focus');
    expect(wrapper.emitted('focus')).toEqual([[true]]);
  });

  it('should blur the checkbox', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsList,
      },
    });
    wrapper.find('#radio-group-id_1').trigger('blur');
    expect(wrapper.emitted('blur')).toEqual([[true]]);
  });

  it('should change the class and id', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsList,
        id: 'radio-new-id',
        class: 'radio-new-class',
      },
    });

    expect(wrapper.find('.radio-new-class').exists()).toBeTruthy();
    expect(wrapper.find('#radio-new-id_1').exists()).toBeTruthy();
  });
});
