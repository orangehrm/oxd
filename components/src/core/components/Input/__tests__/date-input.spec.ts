import {mount} from '@vue/test-utils';
import DateInput from '@orangehrm/oxd/core/components/Input/DateInput.vue';
import Calendar from '@orangehrm/oxd/core/components/Calendar/Calendar.vue';
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
    const input = wrapper.findComponent(Input);
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
  it('on calling selectMonth method it should emit selectMonth event', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.vm.selectMonth();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('selectMonth')).toBeTruthy();
  });
  it('on calling selectYear method it should emit selectYear event', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.vm.selectYear();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('selectYear')).toBeTruthy();
  });
  it('on calling onClickOutside method it should emit dateselect:closed event', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.vm.onClickOutside();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('dateselect:closed')).toBeTruthy();
  });
  it('on calling to  onDateSelected method it should call closeDropdown', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.vm.onDateSelected();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.closeDropdown).toBeTruthy();
  });
  it('on calling to  toggleDropdown method  when disabled or readonly it should  not call openDropdown', async () => {
    const openDropdown = jest.spyOn(
      DateInput.methods ? DateInput.methods : DateInput,
      'openDropdown',
    );
    const wrapper = mount(DateInput, {});
    wrapper.setProps({
      disabled: true,
      readonly: true,
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.toggleDropdown();
    expect(openDropdown).not.toBeCalled();
    openDropdown.mockRestore();
  });
  it('when date input closed and on calling to  toggleDropdown method not in disabled mode or readonly mode it should  call openDropdown', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.vm.toggleDropdown();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.openDropdown).toBeTruthy();
  });
  it('when date input opened and on calling to  toggleDropdown method not in disabled mode or readonly mode it should  call openDropdown', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.setData({
      open: true,
    });
    wrapper.vm.toggleDropdown();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.closeDropdown).toBeTruthy();
  });
});
