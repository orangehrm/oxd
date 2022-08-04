import {mount} from '@vue/test-utils';
import {defineComponent} from 'vue';
import eventsMixin from '@orangehrm/oxd/core/components/Input/Select/events-mixin';

const MockComponent = defineComponent({
  name: 'mock-component',
  mixins: [eventsMixin],
  // eslint-disable-next-line
  render() {},
});

describe('eventsMixin.ts', () => {
  it('should emits dropdown:opened', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.onOpenDropdown();
    expect(wrapper.emitted()).toHaveProperty('dropdown:opened');
  });
  it('should emits dropdown:closed', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.dropdownOpen = true;
    wrapper.vm.onCloseDropdown(null);
    expect(wrapper.emitted()).toHaveProperty('dropdown:closed');
  });
  it('should emits dropdown:blur', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.dropdownOpen = true;
    wrapper.vm.onBlur();
    expect(wrapper.emitted()).toHaveProperty('dropdown:closed');
    expect(wrapper.emitted()).toHaveProperty('dropdown:blur');
  });
  it('should emits dropdown:clear and clear modelvalue', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.onClear();
    expect(wrapper.emitted()).toHaveProperty('dropdown:clear');
    const tempWrapper =
      wrapper && wrapper.emitted('update:modelValue')
        ? wrapper.emitted('update:modelValue')
        : [];
    if (tempWrapper) {
      expect(tempWrapper[0]).toEqual([null]);
    }
  });
  it('should emits update:modelvalue on Select', () => {
    const option = {id: 1, label: 'test'};
    const wrapper = mount(MockComponent, {});
    wrapper.vm.onSelect(option);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([option]);
  });
  it('should emits update:modelvalue as array on Select Multiple', () => {
    const option = {id: 1, label: 'test'};
    const wrapper = mount(MockComponent, {
      props: {
        modelValue: [],
      },
    });
    wrapper.vm.onSelect(option);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[option]]);
  });
  it('should emits update:modelvalue on Remove Selected', () => {
    const option = {id: 1, label: 'test'};
    const wrapper = mount(MockComponent, {
      props: {
        modelValue: [option],
      },
    });
    wrapper.vm.onRemoveSelected(option);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]]);
  });

  it('should not emit dropdown:opened if disabled', () => {
    const wrapper = mount(MockComponent, {
      props: {
        disabled: true,
      },
    });
    wrapper.vm.onOpenDropdown();
    expect(wrapper.emitted('dropdown:opened')).toBeFalsy();
  });
  it('should not emit dropdown:closed if disabled', () => {
    const wrapper = mount(MockComponent, {
      props: {
        disabled: true,
      },
    });
    wrapper.vm.onCloseDropdown(null);
    expect(wrapper.emitted('dropdown:closed')).toBeFalsy();
  });
});
