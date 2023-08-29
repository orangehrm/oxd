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

  it('type invalid value', async () => {
    const wrapper = mount(Number, {
      props: {
        max: 10,
      },
    });

    const inputElement = wrapper.find('input');
    (inputElement.element as HTMLInputElement).value = 'abcd';
    inputElement.trigger('input');
    expect((inputElement.element as HTMLInputElement).value).toBe('');
  });

  it('type valid positive', async () => {
    const wrapper = mount(Number, {
      props: {
        max: 10,
      },
    });

    const inputElement = wrapper.find('input');
    (inputElement.element as HTMLInputElement).value = '11';
    inputElement.trigger('input');
    expect((inputElement.element as HTMLInputElement).value).toBe('11');
  });

  it('type valid value with invalid part', async () => {
    const wrapper = mount(Number, {
      props: {
        max: 10,
      },
    });

    const inputElement = wrapper.find('input');
    (inputElement.element as HTMLInputElement).value = '100+';
    inputElement.trigger('input');
    expect((inputElement.element as HTMLInputElement).value).toBe('100');
  });

  it('type negative', async () => {
    const wrapper = mount(Number, {
      props: {
        max: 10,
      },
    });

    const inputElement = wrapper.find('input');
    (inputElement.element as HTMLInputElement).value = '-10';
    inputElement.trigger('input');
    expect((inputElement.element as HTMLInputElement).value).toBe('10');
  });

  it('type decimal', async () => {
    const wrapper = mount(Number, {
      props: {
        max: 10,
      },
    });

    const inputElement = wrapper.find('input');
    (inputElement.element as HTMLInputElement).value = '5.6';
    inputElement.trigger('input');
    expect((inputElement.element as HTMLInputElement).value).toBe('5');
  });

  it('type decimal front', async () => {
    const wrapper = mount(Number, {
      props: {
        max: 10,
      },
    });

    const inputElement = wrapper.find('input');
    (inputElement.element as HTMLInputElement).value = '.567';
    inputElement.trigger('input');
    expect((inputElement.element as HTMLInputElement).value).toBe('567');
  });

  it('type with special characters', async () => {
    const wrapper = mount(Number, {
      props: {
        max: 10,
      },
    });

    const inputElement = wrapper.find('input');
    (inputElement.element as HTMLInputElement).value = '456&';
    inputElement.trigger('input');
    expect((inputElement.element as HTMLInputElement).value).toBe('456');
  });

  it('type negative valid', async () => {
    const wrapper = mount(Number, {
      props: {
        max: 10,
        min: -5,
      },
    });

    const inputElement = wrapper.find('input');
    (inputElement.element as HTMLInputElement).value = '-10';
    inputElement.trigger('input');
    expect((inputElement.element as HTMLInputElement).value).toBe('-10');
  });

  it('type minus number within range', async () => {
    const wrapper = mount(Number, {
      props: {
        max: 10,
        min: -5,
        modelValue: -2,
      },
    });

    expect(wrapper.vm.modelValue).toBe(-2);
  });
});
