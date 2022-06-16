import {mount, shallowMount} from '@vue/test-utils';
import DateInput from '@orangehrm/oxd/core/components/Input/DateInput.vue';
import DateVue from '@orangehrm/oxd/core/components/Calendar/Date.vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import {formatDate, freshDate} from '../../../../utils/date';

describe('DateInput.vue', () => {
  it('renders OXD Date Input', () => {
    const wrapper = mount(DateInput, {});
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should open datepicker on click', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.findComponent(Icon).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.open).toBeTruthy();
    expect(wrapper.emitted('dateselect:opened')).toBeTruthy();
    expect(wrapper.find('.oxd-calendar-wrapper').exists()).toBeTruthy();
  });
  it('should not open datepicker on click, if disabled', async () => {
    const wrapper = mount(DateInput, {
      props: {disabled: true},
    });
    wrapper.findComponent(Icon).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.open).toBeFalsy();
    expect(wrapper.emitted('dateselect:opened')).toBeFalsy();
    expect(wrapper.find('.oxd-calendar-wrapper').exists()).toBeFalsy();
  });
  it('should accept valid input', async () => {
    const wrapper = mount(DateInput, {});
    const input = wrapper.findComponent(Input).find('input');
    (input.element as HTMLInputElement).value = '2021-07-30';
    await input.trigger('input');
    await input.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toEqual([['2021-07-30']]);


  });
  it('should return today date onclick today', async () => {
    const wrapper = mount(DateInput, {});
    await wrapper.findComponent(Icon).trigger('click');
    await wrapper.vm.$nextTick();
    await wrapper.find('.oxd-date-input-link.--today').trigger('click');
    const dateExpected = formatDate(freshDate(), 'yyyy-MM-dd');
    expect(wrapper.emitted('update:modelValue')).toEqual([[dateExpected]]);
  });
  it('should clear date onclick clear', async () => {
    const wrapper = mount(DateInput, {});
    await wrapper.findComponent(Icon).trigger('click');
    await wrapper.vm.$nextTick();
    await wrapper.find('.oxd-date-input-link.--clear').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[null]]);
  });
  it('should close datepicker onclick close', async () => {
    const wrapper = mount(DateInput, {});
    await wrapper.findComponent(Icon).trigger('click');
    await wrapper.vm.$nextTick();
    await wrapper.find('.oxd-date-input-link.--close').trigger('click');
    expect(wrapper.emitted('dateselect:closed'))?.toBeTruthy();
  });
  it('should blur when click out side', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.findComponent(Icon).trigger('click');

    await wrapper.vm.$nextTick();

    const date = wrapper.findComponent(DateVue);
    date.trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-input--focus').exists()).toBe(
      true
    );
    wrapper.find('.oxd-input--focus').trigger('blur');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-input--focus').exists()).toBe(
      false
    );
  });
  it('should blur when when triggered onClickTextOutside method', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.findComponent(Icon).trigger('click');
    await wrapper.vm.$nextTick();
    const date = wrapper.findComponent(DateVue);
    date.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-input--focus').exists()).toBe(
      true
    );
    wrapper.vm.onClickTextOutside();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-input--focus').exists()).toBe(
      false
    );
  });
  it('should close the date picker when when triggered onClickOutside method', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.findComponent(Icon).trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.vm.onClickOutside();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.open).toBeFalsy();
  });
  it('should close the date picker by toggling if it is opened', async () => {
    const wrapper = mount(DateInput, {});
    await wrapper.findComponent(Icon).trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.vm.toggleDropdown();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.open).toBeFalsy();
  });
});
