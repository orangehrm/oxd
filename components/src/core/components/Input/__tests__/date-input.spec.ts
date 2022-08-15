import {mount} from '@vue/test-utils';
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

    expect(wrapper.find('.oxd-input--focus').exists()).toBe(true);
    wrapper.find('.oxd-input--focus').trigger('blur');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.oxd-input--focus').exists()).toBe(false);
  });
  it('should blur when when triggered onClickTextOutside method', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.findComponent(Icon).trigger('click');
    await wrapper.vm.$nextTick();
    const date = wrapper.findComponent(DateVue);
    date.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-input--focus').exists()).toBe(true);
    wrapper.vm.onClickTextOutside();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-input--focus').exists()).toBe(false);
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

  it('should close datepicker from "Escape" key', async () => {
    const wrapper = mount(DateInput, {});
    const event = {
      stopPropagation: jest.fn(),
      key: 'Escape',
    };
    wrapper.setData({open: true});
    await wrapper.vm.closeDropdown(event);
    expect(event.stopPropagation).toBeCalled();
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
  it('on calling to  toggleDropdown method  when readonly it should  not call openDropdown', async () => {
    const openDropdown = jest.spyOn(
      DateInput.methods ? DateInput.methods : DateInput,
      'openDropdown',
    );
    const wrapper = mount(DateInput, {});
    wrapper.setProps({
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

  it('format computed when displayFormat passed', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.setProps({
      displayFormat: 'yyyy/mm/dd',
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.format).toBe('yyyy/mm/dd');
  });

  it('format computed property when displayFormat not passed', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.setProps({
      displayFormat: '',
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.format).toBe('yyyy-MM-dd');
  });

  it('dateSelected computed property when valid dateSelected value is set', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.vm.dateSelected = new Date('2012-05-12');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toEqual([['2012-05-12']]);
  });

  it('dateSelected computed property when invalid dateSelected value is set', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.setData({
      dateTyped: '2004-04-24',
    });
    wrapper.vm.dateSelected = null;
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toEqual([['2004-04-24']]);
  });

  it('dateSelected computed property when invalid dateSelected value and dateTyped value  is set', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.vm.dateTyped = null;
    wrapper.vm.dateSelected = null;
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toEqual([[null]]);
  });

  it('dateSelected computed property value when call onBlur method  with dateTyped is not null', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.setData({
      dateTyped: '2004-04-24',
    });
    const event = {
      stopImmediatePropagation: jest.fn(),
    };
    wrapper.vm.onBlur(event);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toEqual([['2004-04-24']]);
  });

  it('dateSelected computed property value when call onBlur method with dateTyped is null ', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.vm.dateTyped = null;
    wrapper.vm.dateSelected = null;
    const event = {
      stopImmediatePropagation: jest.fn(),
    };
    wrapper.vm.onBlur(event);
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toEqual([[null]]);
  });
});
