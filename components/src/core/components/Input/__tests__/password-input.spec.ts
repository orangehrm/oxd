import {mount} from '@vue/test-utils';
import PasswordInput from '@orangehrm/oxd/core/components/Input/PasswordInput.vue';

describe('PasswordInput.vue', () => {
  it('renders OXD Input', () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with custom color', () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value, style: {backgroundColor: 'aliceblue'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with error', () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value, hasError: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with error message', () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value, hasError: true, errorMessage: 'Error message'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with custom placeholder', () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value, placeholder: 'Custom placeholder'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with strength meter', () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value, strength: 1},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('if stregth value is 1 then it should show medium', async () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value, strength: 1},
    });
    await wrapper.find('.password-input').setValue('oldPass123');
    expect(wrapper.html()).toContain('Weak');
  });

  it('if stregth value is 2 then it should show medium', async () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value, strength: 2},
    });
    await wrapper.find('.password-input').setValue('oldPass123');
    expect(wrapper.html()).toContain('Better');
  });
  it('if stregth value is 3 then it should show strong', async () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value, strength: 3},
    });
    await wrapper.find('.password-input').setValue('oldPass123');
    expect(wrapper.html()).toContain('Medium');
  });
  it('if stregth value is 4 then it should show very strong', async () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value, strength: 4},
    });
    await wrapper.find('.password-input').setValue('oldPass123');
    expect(wrapper.html()).toContain('Strong');
  });
  it('on input', async () => {
    const wrapper = mount(PasswordInput, {});
    const input = wrapper.find('input');
    await input.trigger('input');
    expect(wrapper.emitted()).toHaveProperty('input');
  });
  it('should toggle password visibility when icon is clicked', async () => {
    const wrapper = mount(PasswordInput);
    expect(wrapper.vm.isPasswordVisible).toBe(false);
    const toggleButton = wrapper.find('.password-view-icon-container');
    await toggleButton.trigger('click');
    expect(wrapper.vm.isPasswordVisible).toBe(true);
    await toggleButton.trigger('click');
    expect(wrapper.vm.isPasswordVisible).toBe(false);
  });
  it('should hide password strength when password is too short', async () => {
    const wrapper = mount(PasswordInput, {
      data() {
        return {
          password: 'short',
        };
      },
    });

    expect(wrapper.vm.showStrength).toBe(false);
  });
  it('should show password strength when password is long enough', async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        strength: 1,
        hasError: false,
      },
      data() {
        return {
          password: 'longEnoughPassword',
        };
      },
    });

    expect(wrapper.vm.showStrength).toBe(true);
  });
  it('should hid password strength when password is too long ', async () => {
    const wrapper = mount(PasswordInput, {
      data() {
        return {
          password: 'a'.repeat(65),
        };
      },
    });

    expect(wrapper.vm.showStrength).toBe(false);
  });
  it('should hide password strength when component is disabled', async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.vm.showStrength).toBe(false);
  });
  it('should hide password strength when component is readonly', async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        readonly: true,
      },
    });

    expect(wrapper.vm.showStrength).toBe(false);
  });
  it('should hide password strength when component has an error', async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        hasError: true,
      },
    });

    expect(wrapper.vm.showStrength).toBe(false);
  });
  it('should hide password strength when component has no strength prop', async () => {
    const wrapper = mount(PasswordInput, {});
    expect(wrapper.vm.showStrength).toBe(false);
  });
  it('should show password strength gray color when hasMinimumPasswordStrength is false', async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        hasMinimumPasswordStrength: false,
        strength: 1,
      },
    });
    expect(wrapper.vm.showStrength).toBe(true);
    expect(wrapper.vm.strengthClass).toBe(
      'password-container below-minimum-strength',
    );
  });
});
