import {mount} from '@vue/test-utils';
import DateInput from '@orangehrm/oxd/core/components/Input/DateInput.vue';
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
});
