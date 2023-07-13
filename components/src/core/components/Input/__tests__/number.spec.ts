import {mount} from '@vue/test-utils';
import Number from '@orangehrm/oxd/core/components/Input/Number/Number.vue';
import {nextTick} from 'vue';

describe('Number.vue', () => {
  it('renders OXD Number Input', () => {
    const wrapper = mount(Number);
    expect(wrapper.html()).toBeTruthy();
  });
  it('check model value', () => {
    const wrapper = mount(Number, {
      props: {
        modelValue: 2,
      },
    });
    expect(wrapper.vm.modelValue).toBe(2);
  });
  it('trigger focus event', async () => {
    const wrapper = mount(Number, {
      props: {
        id: 'number-input-element',
      },
    });
    const inputElement = wrapper.find('#number-input-element');
    inputElement.trigger('focus');
    await nextTick();
    const focusedInputElement = wrapper.find('.input-outer--focus');
    expect(focusedInputElement.exists()).toBeTruthy();
  });
  it('disabled state', () => {
    const wrapper = mount(Number, {
      props: {
        disabled: true,
      },
    });
    const inputElement = wrapper.find('input');
    expect(inputElement.attributes().disabled).toBeDefined();
  });
  it('readonly state', () => {
    const wrapper = mount(Number, {
      props: {
        readonly: true,
      },
    });
    const inputElement = wrapper.find('input');
    expect(inputElement.attributes().readonly).toBeDefined();
  });
  it('error state', () => {
    const wrapper = mount(Number, {
      props: {
        hasError: true,
      },
    });
    expect(wrapper.classes()).toContain('input-outer--error');
  });
  it('set bottom limiter', async () => {
    const wrapper = mount(Number, {
      props: {
        min: 0,
        modelValue: 0,
      },
    });
    const minBtn = wrapper.find('.number-min-btn');
    minBtn.trigger('click');
    await nextTick();
    minBtn.trigger('click');
    await nextTick();
    expect(wrapper.vm.modelValue).toBe(0);
  });
  it('set upper limiter', async () => {
    const wrapper = mount(Number, {
      props: {
        max: 1,
        modelValue: 1,
      },
    });
    const maxBtn = wrapper.find('.number-max-btn');
    maxBtn.trigger('click');
    await nextTick();
    maxBtn.trigger('click');
    await nextTick();
    expect(wrapper.vm.modelValue).toBe(1);
  });
  it('required true with a default value', () => {
    const wrapper = mount(Number, {
      props: {
        required: true,
        defaultValue: 5,
      },
    });
    expect(wrapper.vm.defaultValue).toBe(5);
  });
});
