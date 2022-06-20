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
    wrapper.find('input').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.open).toBeTruthy();
    expect(wrapper.emitted('timeselect:opened')).toBeTruthy();
    expect(wrapper.find('.oxd-time-picker').exists()).toBeTruthy();
  });
  it('should not open timepicker on click, if disabled', async () => {
    const wrapper = mount(TimeInput, {
      props: {disabled: true},
    });
    wrapper.find('input').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.open).toBeFalsy();
    expect(wrapper.emitted('timeselect:opened')).toBeFalsy();
    expect(wrapper.find('.oxd-time-picker').exists()).toBeFalsy();
  });
  it('should accept valid input', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.find('input').trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const pickerInputs = picker.findAll('input');
    (pickerInputs[0].element as HTMLInputElement).value = '05';
    await pickerInputs[0].trigger('change');
    (pickerInputs[1].element as HTMLInputElement).value = '10';
    await pickerInputs[1].trigger('change');
    expect(wrapper.vm.timeInput).toEqual('05:10');
  });
  it('should not accept invalid input', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.find('input').trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const pickerInput = picker.find('input');
    (pickerInput.element as HTMLInputElement).value = '23';
    await pickerInput.trigger('change');
    expect(wrapper.vm.timeInput).toEqual('01:00');
  });
  it('should increment/decrement hour', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.find('input').trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const incrementBtn = picker.find('.oxd-time-hour-input-up');
    const decrementBtn = picker.find('.oxd-time-hour-input-down');
    expect(wrapper.vm.timeInput).toEqual('01:00');
    await incrementBtn.trigger('click');
    expect(wrapper.vm.timeInput).toEqual('02:00');
    await decrementBtn.trigger('click');
    expect(wrapper.vm.timeInput).toEqual('01:00');
  });
  it('should increment/decrement minute', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.find('input').trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const incrementBtn = picker.find('.oxd-time-minute-input-up');
    const decrementBtn = picker.find('.oxd-time-minute-input-down');
    expect(wrapper.vm.timeInput).toEqual('01:00');
    await incrementBtn.trigger('click');
    expect(wrapper.vm.timeInput).toEqual('01:01');
    await decrementBtn.trigger('click');
    expect(wrapper.vm.timeInput).toEqual('01:00');
  });
  it('should toggle AM/PM', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.find('input').trigger('click');
    await wrapper.vm.$nextTick();
    const period = wrapper.findAll('input[type="radio"]');
    expect(wrapper.vm.timeInput).toEqual('01:00');
    await period[1].setValue(true);
    expect(wrapper.vm.timeInput).toEqual('13:00');
    await period[0].setValue(true);
    expect(wrapper.vm.timeInput).toEqual('01:00');
  });
});
