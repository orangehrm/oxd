import {mount} from '@vue/test-utils';
import {defineComponent} from 'vue';
import eventsMixin from '@orangehrm/oxd/core/components/Input/Select/events-mixin';
import {flushPromises} from '@vue/test-utils';

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

  it('should scroll to selected option when opening dropdown with modelValue', async () => {
    const options = [
      {id: 1, label: 'Option 1'},
      {id: 2, label: 'Option 2'},
      {id: 3, label: 'Option 3'},
    ];
    const selectedOption = {id: 2, label: 'Option 2'};

    const wrapper = mount(MockComponent, {
      props: {
        modelValue: selectedOption,
        options: options,
      },
    });

    const scrollToOptionByIndexSpy = jest.spyOn(
      wrapper.vm,
      'scrollToOptionByIndex',
    );

    wrapper.vm.onOpenDropdown();

    await flushPromises();

    expect(scrollToOptionByIndexSpy).toHaveBeenCalledWith(1);
    expect(wrapper.emitted()).toHaveProperty('dropdown:opened');
  });

  it('should scroll to scrollToOption when opening dropdown without modelValue', async () => {
    const options = [
      {id: 1, label: 'Option 1'},
      {id: 2, label: 'Option 2'},
      {id: 3, label: 'Option 3'},
    ];
    const scrollToOption = {id: 3, label: 'Option 3'};

    const wrapper = mount(MockComponent, {
      props: {
        modelValue: null,
        options: options,
        scrollToOption: scrollToOption,
      },
    });

    const scrollToOptionByIndexSpy = jest.spyOn(
      wrapper.vm,
      'scrollToOptionByIndex',
    );

    wrapper.vm.onOpenDropdown();

    await flushPromises();

    expect(scrollToOptionByIndexSpy).toHaveBeenCalledWith(2);
    expect(wrapper.emitted()).toHaveProperty('dropdown:opened');
  });

  it('should prioritize modelValue over scrollToOption when both exist', async () => {
    const options = [
      {id: 1, label: 'Option 1'},
      {id: 2, label: 'Option 2'},
      {id: 3, label: 'Option 3'},
    ];
    const selectedOption = {id: 1, label: 'Option 1'};
    const scrollToOption = {id: 3, label: 'Option 3'};

    const wrapper = mount(MockComponent, {
      props: {
        modelValue: selectedOption,
        options: options,
        scrollToOption: scrollToOption,
      },
    });

    const scrollToOptionByIndexSpy = jest.spyOn(
      wrapper.vm,
      'scrollToOptionByIndex',
    );

    wrapper.vm.onOpenDropdown();

    await flushPromises();

    expect(scrollToOptionByIndexSpy).toHaveBeenCalledWith(0);
    expect(scrollToOptionByIndexSpy).not.toHaveBeenCalledWith(2);
  });
});
