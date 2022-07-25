import {config, mount} from '@vue/test-utils';
import RadioPill from '@orangehrm/oxd/core/components/Input/RadioPills/RadioPill.vue';
import {nextTick} from 'vue';

config.global.mocks = {
  $t: (text: string) => text,
};

describe('RadioPill.vue', () => {
  it('renders single pill', () => {
    const wrapper = mount(RadioPill, {
      props: {
        name: 'color',
        label: 'Red Pill Value',
        value: 'red',
      },
    });

    const label = wrapper.find('label');
    expect(label.classes()).toContain('oxd-radio-pill-input-label');
    expect(label.classes()).not.toContain('--disabled');
    expect(label.classes()).not.toContain('--readonly');
    expect(label.classes()).not.toContain('--checked');
    expect(label.classes()).not.toContain('--focus');

    expect(label.exists()).toBeTruthy();
    expect(label.text()).toStrictEqual('Red Pill Value');

    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();
    expect(input.attributes('value')).toStrictEqual('red');
  });

  it('Does not emits events by default', async () => {
    const wrapper = mount(RadioPill, {
      props: {
        name: 'color',
        label: 'Red Pill Value',
        value: 'red',
      },
    });

    await nextTick();
    expect(wrapper.emitted()).toEqual({});
  });

  it('disabled pill', async () => {
    const wrapper = mount(RadioPill, {
      props: {
        name: 'color',
        label: 'Red Pill Value',
        value: 'red',
        disabled: true,
      },
    });

    expect(
      wrapper.find('label.oxd-radio-pill-input-label.--disabled').exists(),
    ).toBeTruthy();
    expect(wrapper.find('input').element.disabled).toBeTruthy();

    await wrapper.find('label').trigger('click');
    expect(wrapper.find('input').element.checked).toBeFalsy();
    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('change')).toBeFalsy();
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('readonly pill', async () => {
    const wrapper = mount(RadioPill, {
      props: {
        name: 'color',
        label: 'Red Pill Value',
        value: 'red',
        readonly: true,
      },
    });

    expect(
      wrapper.find('label.oxd-radio-pill-input-label.--readonly').exists(),
    ).toBeTruthy();
    expect(wrapper.find('input').element.readOnly).toBeTruthy();

    await wrapper.find('label').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('Check value changes the radio value', async () => {
    const wrapper = mount(RadioPill, {
      props: {
        name: 'color',
        label: 'Red Pill Value',
        value: 'red',
      },
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();
    expect(wrapper.find('input').element.value).toEqual('red');
    expect(wrapper.find('input').element.checked).toBeFalsy();

    await wrapper.find('label').trigger('click');
    expect(wrapper.find('input').element.checked).toBeTruthy();
  });

  it('Emits update:modelValue and change', async () => {
    const wrapper = mount(RadioPill, {
      props: {
        name: 'color',
        label: 'Red Pill Value',
        value: 'red',
      },
    });

    await wrapper.find('label').trigger('click');
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toEqual([['red']]);
  });

  it('Emits focus event', async () => {
    const wrapper = mount(RadioPill, {
      props: {
        name: 'color',
        label: 'Red Pill Value',
        value: 'red',
      },
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();
    expect(
      wrapper.find('label.oxd-radio-pill-input-label.--focus').exists(),
    ).toBeFalsy();
    await input.trigger('focus');
    expect(
      wrapper.find('label.oxd-radio-pill-input-label.--focus').exists(),
    ).toBeTruthy();
    expect(wrapper.emitted('focus')).toBeTruthy();
  });

  it('Emits blur event', async () => {
    const wrapper = mount(RadioPill, {
      props: {
        name: 'test',
        label: 'Red Pill Value',
        value: 'red',
      },
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();
    await input.trigger('blur');
    expect(wrapper.emitted('blur')).toBeTruthy();
  });
});
