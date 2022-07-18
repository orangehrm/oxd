import {mount} from '@vue/test-utils';
import SwitchInput from '@orangehrm/oxd/core/components/Input/SwitchInput.vue';

describe('SwitchInput.vue', () => {
  it('renders OXD Switch Input', () => {
    const value = 'Checkbox';
    const wrapper = mount(SwitchInput, {
      props: {label: value},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with error', () => {
    const value = 'Checkbox';
    const wrapper = mount(SwitchInput, {
      props: {label: value, hasError: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should emit checked value on click', async () => {
    const wrapper = mount(SwitchInput, {
      props: {
        modelValue: false,
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toContainEqual([true]);
  });

  it('should emit unchecked value on click', async () => {
    const wrapper = mount(SwitchInput, {
      props: {
        modelValue: true,
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toContainEqual([false]);
  });

  it('should emit focus when focued', async () => {
    const wrapper = mount(SwitchInput, {
      props: {
        modelValue: true,
      },
    });
    wrapper.find("input[type='checkbox']").trigger('focus');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('focus')).toBeTruthy();
  });

  it('should emit blur when blured', async () => {
    const wrapper = mount(SwitchInput, {
      props: {
        modelValue: true,
      },
    });
    wrapper.find("input[type='checkbox']").trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('blur')).toBeTruthy();
  });

  it('should not emit any value if disabled', async () => {
    const wrapper = mount(SwitchInput, {
      props: {
        disabled: true,
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('renders OXD Switch Input with label on left and help popup', () => {
    const value = 'Checkbox';
    const wrapper = mount(SwitchInput, {
      props: {
        label: value,
        position: 'left',
        helpText: 'This is a help text describing what this switch does',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD Switch Input with label on right and help popup', () => {
    const value = 'Checkbox';
    const wrapper = mount(SwitchInput, {
      props: {
        label: value,
        position: 'right',
        helpText: 'This is a help text describing what this switch does',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD Switch Input with label on left and full width', () => {
    const value = 'Checkbox';
    const wrapper = mount(SwitchInput, {
      props: {
        label: value,
        position: 'left',
        fullWidth: true,
        helpText: 'This is a help text describing what this switch does',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD Switch Input with label on right and full width', () => {
    const value = 'Checkbox';
    const wrapper = mount(SwitchInput, {
      props: {label: value, position: 'right', fullWidth: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD Switch Input with label on left and full width with helpText', () => {
    const value = 'Checkbox';
    const wrapper = mount(SwitchInput, {
      props: {label: value, position: 'left', fullWidth: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD Switch Input with label on right and full width with helpText', () => {
    const value = 'Checkbox';
    const wrapper = mount(SwitchInput, {
      props: {
        label: value,
        position: 'right',
        fullWidth: true,
        helpText: 'This is a help text describing what this switch does',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
