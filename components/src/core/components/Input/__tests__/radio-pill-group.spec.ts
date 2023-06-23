import {config, mount} from '@vue/test-utils';
import RadioPillGroup from '@orangehrm/oxd/core/components/Input/RadioPills/RadioPillGroup.vue';
import RadioPill from '@orangehrm/oxd/core/components/Input/RadioPills/RadioPill.vue';
import {nextTick} from 'vue';

config.global.mocks = {
  $t: (text: string) => text,
};

const options = [
  {
    id: 'all',
    label: 'All Days',
  },
  {
    id: 'start',
    label: 'Start Day Only',
    style: {'background-color': 'lightblue'},
  },
  {
    id: 'end',
    label: 'End Day Only',
    style: {'background-color': 'lightgreen'},
    disabled: true,
  },
  {
    id: 'start_and_end',
    label: 'Start and End Day',
    style: {'background-color': 'lightyellow', color: 'blue'},
  },
];

describe('RadioPillGroup.vue', () => {
  it('renders pill group', () => {
    const wrapper = mount(RadioPillGroup, {
      props: {
        name: 'partialDays',
        options: options,
        modelValue: 'all',
      },
    });

    expect(wrapper.find('div.radio-pill-group').exists()).toBeTruthy();

    const pills = wrapper.findAllComponents(RadioPill);
    expect(pills).toHaveLength(options.length);

    options.forEach((option, index) => {
      expect(pills[index].find('label').text()).toStrictEqual(option.label);
      expect(pills[index].find('input').element.value).toStrictEqual(option.id);
      const disabled = pills[index].find('input').element.disabled;
      if (option.disabled) {
        expect(disabled).toBeTruthy();
      } else {
        expect(disabled).toBeFalsy();
      }
    });

    const element3Style = pills[3].find('label').element.style;
    expect(element3Style.getPropertyValue('background-color')).toEqual(
      'lightyellow',
    );
    expect(element3Style.getPropertyValue('color')).toEqual('blue');
  });

  it('does not emit events by default', async () => {
    const wrapper = mount(RadioPillGroup, {
      props: {
        name: 'partialDays',
        options: options,
        modelValue: 'all',
      },
    });

    await nextTick();
    expect(wrapper.emitted()).toEqual({});
  });

  it('change the value by selecting another pill', async () => {
    const wrapper = mount(RadioPillGroup, {
      props: {
        name: 'partialDays',
        options: options,
        modelValue: 'all',
      },
    });

    await wrapper
      .findAllComponents(RadioPill)[1]
      .find('label')
      .trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')).toEqual([['start']]);
  });

  it('focus on a pill triggers focus event', async () => {
    const wrapper = mount(RadioPillGroup, {
      props: {
        name: 'partialDays',
        options: options,
        modelValue: 'all',
      },
    });

    await wrapper
      .findAllComponents(RadioPill)[1]
      .find('input')
      .trigger('focus');

    expect(wrapper.emitted('focus')).toBeTruthy();
  });

  it('blur on a pill triggers blur event', async () => {
    const wrapper = mount(RadioPillGroup, {
      props: {
        name: 'partialDays',
        options: options,
        modelValue: 'all',
      },
    });

    await wrapper
      .findAllComponents(RadioPill)[1]
      .find('input')
      .trigger('blur');

    expect(wrapper.emitted('blur')).toBeTruthy();
  });

  it('pill group without options', () => {
    const wrapper = mount(RadioPillGroup, {
      props: {
        name: 'partialDays',
        modelValue: 'all',
      },
    });

    expect(wrapper.find('div.radio-pill-group').exists()).toBeTruthy();
    expect(wrapper.findAllComponents(RadioPill)).toHaveLength(0);
  });
});
