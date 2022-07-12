import {mount} from '@vue/test-utils';
import TimeInput from '@orangehrm/oxd/core/components/Input/Time/TimeInput.vue';
import TimePicker from '@orangehrm/oxd/core/components/Input/Time/TimePicker.vue';

describe('TimeInput.vue', () => {
  it('renders OXD Time Input', () => {
    const wrapper = mount(TimeInput, {});
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should open timepicker on click', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.timePickerOpen).toBeTruthy();
    expect(wrapper.emitted('timeselect:opened')).toBeTruthy();
    expect(wrapper.find('.oxd-time-picker').exists()).toBeTruthy();
  });
  it('clock icon should be available', () => {
    const wrapper = mount(TimeInput, {
      props: {disabled: true},
    });
    expect(wrapper.find('.oxd-time-input-icon-wrapper').exists()).toBeFalsy();
  });
  it('AM/PM toggle should be available and should toggle AM/PM value', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        modelValue: '15:00',
      },
    });
    expect(
      wrapper.find('.oxd-time-input-am-pm-wrapper').exists(),
    ).toStrictEqual(true);

    await wrapper
      .find('.oxd-time-input-am-pm-wrapper > label')
      .trigger('click');
    // 15:00 = 3:00 PM -> 3:00 AM
    // expect(wrapper.vm.modelValue).toEqual('03:00');
    expect(wrapper.emitted('update:modelValue')).toEqual([['03:00']]);
  });
  it('AM/PM toggle should be available but not clickable when disabled', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        modelValue: '15:00',
        disabled: true,
      },
    });
    expect(
      wrapper.find('.oxd-time-input-am-pm-wrapper').exists(),
    ).toStrictEqual(true);

    // await wrapper.find('.oxd-time-input-am-pm-wrapper > label').trigger('click');
    // 15:00 = 3:00 PM -> 3:00 AM
    // expect(wrapper.vm.modelValue).toEqual('15:00');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should accept valid input', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const pickerInputs = picker.findAll('input');
    (pickerInputs[0].element as HTMLInputElement).value = '05';
    await pickerInputs[0].trigger('input');
    (pickerInputs[1].element as HTMLInputElement).value = '10';
    await pickerInputs[1].trigger('input');
    expect(wrapper.vm.pickerInput).toEqual('05:10');
  });
  it('should not accept invalid input', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const pickerInput = picker.find('input');
    (pickerInput.element as HTMLInputElement).value = '23';
    await pickerInput.trigger('input');
    expect(wrapper.vm.pickerInput).toEqual('01:00');
  });
  it('should increment/decrement hour', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const incrementBtn = picker.find('.oxd-time-hour-input-down');
    const decrementBtn = picker.find('.oxd-time-hour-input-up');
    expect(wrapper.vm.pickerInput).toEqual('01:00');
    await incrementBtn.trigger('click');
    expect(wrapper.vm.pickerInput).toEqual('02:00');
    await decrementBtn.trigger('click');
    expect(wrapper.vm.pickerInput).toEqual('01:00');
  });
  it('should increment/decrement minute', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const incrementBtn = picker.find('.oxd-time-minute-input-down');
    const decrementBtn = picker.find('.oxd-time-minute-input-up');
    expect(wrapper.vm.pickerInput).toEqual('01:00');
    await incrementBtn.trigger('click');
    expect(wrapper.vm.pickerInput).toEqual('01:01');
    await decrementBtn.trigger('click');
    expect(wrapper.vm.pickerInput).toEqual('01:00');
  });
  it('should toggle AM/PM', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    const period = wrapper.findAll('input[type="radio"]');
    expect(wrapper.vm.pickerInput).toEqual('01:00');
    await period[1].setValue(true);
    expect(wrapper.vm.pickerInput).toEqual('13:00');
    await period[0].setValue(true);
    expect(wrapper.vm.pickerInput).toEqual('01:00');
  });
});
