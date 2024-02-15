import {enableAutoUnmount, mount} from '@vue/test-utils';
import TimeInput from '@orangehrm/oxd/core/components/Input/Time/TimeInput.vue';
import TimePicker from '@orangehrm/oxd/core/components/Input/Time/TimePicker.vue';

const delayFunction = (time: number) => {
  return new Promise(reslove =>
    setTimeout(() => {
      reslove(true);
    }, time),
  );
};

describe('TimeInput.vue', () => {
  enableAutoUnmount(afterEach);
  it('renders OXD Time Input', () => {
    const wrapper = mount(TimeInput, {});
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('changing the input value updates model value', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        modelValue: '15:00',
      },
    });
    wrapper.find('.oxd-time-input input').setValue('12:16');
    await wrapper.find('.oxd-time-input input').trigger('blur');
    expect(wrapper.emitted('update:modelValue')).toEqual([['12:16']]);
  });

  it('changing the input value to invalid value emits it as is', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        modelValue: '15:00',
      },
    });
    await wrapper.find('.oxd-time-input input').setValue('124:16');
    await wrapper.find('.oxd-time-input input').trigger('blur');
    expect(wrapper.emitted('update:modelValue')).toEqual([['124:16 PM']]);
  });

  it('passing invalid modelValue sets input to blank AM', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        modelValue: '26:00',
      },
    });

    expect(
      (wrapper.find('.oxd-time-input input').element as HTMLInputElement).value,
    ).toEqual('');
    expect(
      wrapper.find('.oxd-time-input-am-pm-wrapper > label').text(),
    ).toEqual('AM');
    expect(
      (wrapper.find('.oxd-time-input-am-pm-checkbox')
        .element as HTMLInputElement).value,
    ).toEqual('on');
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

  it('AM/PM should toggle when enter is pressed', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        modelValue: '03:00',
      },
    });

    await wrapper
      .find('.oxd-time-input-am-pm-checkbox')
      .trigger('keydown.enter');
    expect(wrapper.emitted('update:modelValue')).toEqual([['15:00']]);
  });

  it('AM/PM toggle focus should add --focus class', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        modelValue: '03:00',
      },
    });

    expect(
      wrapper.find('.oxd-time-input-am-pm-wrapper > label').classes(),
    ).not.toContain('--focus');
    await wrapper.find('.oxd-time-input-am-pm-checkbox').trigger('focus');
    expect(
      wrapper.find('.oxd-time-input-am-pm-wrapper > label').classes(),
    ).toContain('--focus');
    await wrapper.find('.oxd-time-input-am-pm-checkbox').trigger('blur');
    expect(
      wrapper.find('.oxd-time-input-am-pm-wrapper > label').classes(),
    ).not.toContain('--focus');
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
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('invalid time value in 12 hrs format', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        modelValue: '58:00',
      },
    });
    expect(wrapper.vm.time).toEqual('');
  });

  it('invalid time value in 24 hrs format', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        format: '24',
        modelValue: '25:00',
      },
    });
    expect(wrapper.vm.time).toEqual('');
  });

  it('AM/PM toggle should not be available when is in 24 hours format', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        modelValue: '15:00',
        format: '24',
      },
    });
    expect(
      wrapper.find('.oxd-time-input-am-pm-wrapper').exists(),
    ).toStrictEqual(false);
  });

  it('model value should be available to set empty when allowEmpty is enabled', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        allowEmpty: true,
      },
    });
    const timeInputElm = wrapper.find('.oxd-input');
    timeInputElm.setValue('');
    timeInputElm.trigger('blur');
    await delayFunction(2000);
    // expect(wrapper.emitted('update:modelValue')).toMatchObject([
    //   ['01:00'],
    //   ['null AM'],
    // ]);
  });
  it('open with click and close timePicker with esc', async () => {
    const wrapper = mount(TimeInput, {});
    expect(wrapper.find('.oxd-time-picker').exists()).toBeFalsy();

    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-time-picker').exists()).toBeTruthy();

    await wrapper.find('.oxd-time-input-icon-wrapper').trigger('keyup.esc');
    expect(wrapper.find('.oxd-time-picker').exists()).toBeFalsy();
  });

  it('open with click and close timePicker with enter', async () => {
    const wrapper = mount(TimeInput, {});
    expect(wrapper.find('.oxd-time-picker').exists()).toBeFalsy();

    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-time-picker').exists()).toBeTruthy();

    await wrapper.find('.oxd-time-input-icon-wrapper').trigger('keyup.enter');
    expect(wrapper.find('.oxd-time-picker').exists()).toBeFalsy();
  });

  it('should accept valid input', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const pickerInputs = picker.findAll('input');
    (pickerInputs[0].element as HTMLInputElement).value = '05';
    await pickerInputs[0].trigger('input');
    await pickerInputs[0].trigger('blur');
    (pickerInputs[1].element as HTMLInputElement).value = '10';
    await pickerInputs[1].trigger('input');
    await pickerInputs[1].trigger('blur');
    expect(wrapper.vm.pickerInput).toEqual('05:10');
  });

  it('if more than 2 characters entered into timepicker inputs, should select first two characters', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        modelValue: '06:31',
      },
    });
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const [hourInput, minuteInput] = picker.findAll('input');
    (hourInput.element as HTMLInputElement).value = '102';
    (minuteInput.element as HTMLInputElement).value = '532';
    await hourInput.trigger('input');
    await hourInput.trigger('blur');
    await minuteInput.trigger('input');
    await minuteInput.trigger('blur');
    expect(wrapper.vm.pickerInput).toEqual('10:53');
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

  it('should not accept invalid input 24hrs format is enabled', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        format: '24',
      },
    });
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const pickerInput = picker.find('input');
    (pickerInput.element as HTMLInputElement).value = '25:00';
    await pickerInput.trigger('input');
    expect(wrapper.vm.pickerInput).toEqual('01:00');
  });

  it('should increment/decrement hour', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const incrementBtn = picker.find('.oxd-time-hour-input-up');
    const decrementBtn = picker.find('.oxd-time-hour-input-down');
    expect(wrapper.vm.pickerInput).toEqual('01:00');
    await incrementBtn.trigger('click');
    expect(wrapper.vm.pickerInput).toEqual('02:00');
    await decrementBtn.trigger('click');
    expect(wrapper.vm.pickerInput).toEqual('01:00');
  });

  it('should increment/decrement hours in 24hrs format', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        format: '24',
      },
    });
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const incrementBtn = picker.find('.oxd-time-hour-input-up');
    const decrementBtn = picker.find('.oxd-time-hour-input-down');
    wrapper.vm.pickerInput = '15:00';
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.pickerInput).toEqual('15:00');
    await incrementBtn.trigger('click');
    expect(wrapper.vm.pickerInput).toEqual('16:00');
    await decrementBtn.trigger('click');
    expect(wrapper.vm.pickerInput).toEqual('15:00');
  });

  it('click on time picker reset', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        format: '24',
        resetEnabled: true,
        modelValue: '05:00',
      },
    });
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.time).toEqual('05:00');
    const picker = wrapper.findComponent(TimePicker);
    const reset = picker.find('.oxd-time-picker-reset-button');
    const resetBtn = reset.find('.oxd-button');
    expect(resetBtn.exists()).toBeTruthy();
    await resetBtn.trigger('click');
    await wrapper.vm.$nextTick();
    await picker.vm.$nextTick();
    expect(wrapper.vm.time).toEqual('');
  });

  it('click on time picker reset and increment hour', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        format: '24',
        resetEnabled: true,
        modelValue: '05:00',
      },
    });
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.time).toEqual('05:00');
    const picker = wrapper.findComponent(TimePicker);
    const reset = picker.find('.oxd-time-picker-reset-button');
    const resetBtn = reset.find('.oxd-button');
    expect(resetBtn.exists()).toBeTruthy();
    await resetBtn.trigger('click');
    await wrapper.vm.$nextTick();
    await picker.vm.$nextTick();

    const incrementBtn = picker.find('.oxd-time-hour-input-up');
    await incrementBtn.trigger('click');
    await wrapper.vm.$nextTick();
    await picker.vm.$nextTick();

    expect(picker.vm.hour).toEqual('01');
    expect(picker.vm.minute).toEqual('00');
  });

  it('click on time picker reset and decrement hour', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        format: '24',
        resetEnabled: true,
        modelValue: '05:00',
      },
    });
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.time).toEqual('05:00');
    const picker = wrapper.findComponent(TimePicker);
    const reset = picker.find('.oxd-time-picker-reset-button');
    const resetBtn = reset.find('.oxd-button');
    expect(resetBtn.exists()).toBeTruthy();
    await resetBtn.trigger('click');
    await wrapper.vm.$nextTick();
    await picker.vm.$nextTick();

    const decrementBtn = picker.find('.oxd-time-hour-input-down');
    await decrementBtn.trigger('click');
    await picker.vm.$nextTick();

    expect(picker.vm.hour).toEqual('01');
    expect(picker.vm.minute).toEqual('00');
  });

  it('click on time picker reset and decrement minute', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        format: '24',
        resetEnabled: true,
        modelValue: '05:00',
      },
    });
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.time).toEqual('05:00');
    const picker = wrapper.findComponent(TimePicker);
    const reset = picker.find('.oxd-time-picker-reset-button');
    const resetBtn = reset.find('.oxd-button');
    expect(resetBtn.exists()).toBeTruthy();
    await resetBtn.trigger('click');
    await wrapper.vm.$nextTick();
    await picker.vm.$nextTick();

    const decrementBtn = picker.find('.oxd-time-minute-input-down');
    await decrementBtn.trigger('click');
    await picker.vm.$nextTick();

    expect(picker.vm.hour).toEqual('01');
    expect(picker.vm.minute).toEqual('00');
  });

  it('should increment/decrement minute', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const incrementBtn = picker.find('.oxd-time-minute-input-up');
    const decrementBtn = picker.find('.oxd-time-minute-input-down');
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

  it('should toggle AM/PM when clicking enter', async () => {
    const wrapper = mount(TimeInput, {});
    await wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    await wrapper.vm.$nextTick();
    const period = wrapper.findAll('input[type="radio"]');
    expect(wrapper.vm.pickerInput).toEqual('01:00');
    await period[1].trigger('keydown.enter');
    expect(wrapper.vm.pickerInput).toEqual('13:00');
    await period[0].trigger('keydown.enter');
    expect(wrapper.vm.pickerInput).toEqual('01:00');
  });

  it('should close timePicker when esc clicked', async () => {
    const wrapper = mount(TimeInput, {});
    await wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    expect(wrapper.find('.oxd-time-picker').exists()).toBeTruthy();

    const picker = wrapper.findComponent(TimePicker);

    await wrapper.find('.oxd-time-picker').trigger('keyup.esc');
    expect(wrapper.find('.oxd-time-picker').exists()).toBeFalsy();
    expect(picker.emitted('timepicker:closed')).toBeTruthy();
    expect(wrapper.emitted('timeselect:closed')).toBeTruthy();
  });

  it('should close timePicker when clicked outside', async () => {
    document.body.innerHTML = `
  <div>
    <div id="app"></div>
  </div>`;

    const wrapper = mount(TimeInput, {
      attachTo: '#app',
    });

    await wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    expect(wrapper.find('.oxd-time-picker').exists()).toBeTruthy();

    await wrapper.find('.oxd-time-input').trigger('click');
    expect(wrapper.find('.oxd-time-picker').exists()).toBeFalsy();
  });

  it('AM/PM toggle in input field should reflect in time picker AM/PM', async () => {
    const wrapper = mount(TimeInput, {
      props: {
        modelValue: '05:11',
      },
    });

    // Toggle AM/PM to make the time 05:11 PM
    await wrapper
      .find('.oxd-time-input-am-pm-wrapper > label')
      .trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['17:11']]);

    // Open time picker and verify time is still 05:11 PM
    await wrapper.find('.oxd-time-input-icon-wrapper').trigger('click');
    const picker = wrapper.findComponent(TimePicker);
    const [hourInput, minuteInput] = picker.findAll('input');

    expect((hourInput.element as HTMLInputElement).value).toEqual('05');
    expect((minuteInput.element as HTMLInputElement).value).toEqual('11');

    const amInput = picker.find('.oxd-time-period-label > input[name="am"]');
    const pmInput = picker.find('.oxd-time-period-label > input[name="pm"]');

    expect((amInput.element as HTMLInputElement).checked).toBeFalsy();
    expect((pmInput.element as HTMLInputElement).checked).toBeTruthy();
  });
});
