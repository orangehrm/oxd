import {mount, shallowMount} from '@vue/test-utils';
import InfoBox from '@orangehrm/oxd/core/components/InfoBox/InfoBox.vue';
import ButtonIcon from '@orangehrm/oxd/core/components/Button/Icon.vue';
import SelectOption from '@orangehrm/oxd/core/components/Input/Select/SelectOption.vue';
import {BOTTOM} from '../../Input/types';

const options = [
  {
    id: 2,
    label: 'Application Received',
  },
  {
    id: 3,
    label: 'Shortlisted',
  },
  {
    id: 4,
    label: 'In Progress',
  },
  {
    id: 5,
    label: 'Job Offer',
  },
  {
    id: 6,
    label: 'Hired',
    color: '#68a61d',
  },
  {
    id: 7,
    label: 'Rejected',
    color: '#eb0910',
  },
  {
    id: 7,
    label:
      'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.',
  },
];
const infoLabel = 'Current Stage of Recruitment';
const numOfTitleRows = 2;
const numOfValueRows = 3;
const dropdownPosition = BOTTOM;

describe('InfoBox.vue', () => {
  it('renders OXD Select Input', () => {
    const wrapper = mount(InfoBox, {
      props: {
        infoLabel,
        numOfTitleRows,
        numOfValueRows,
        options,
        dropdownPosition,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should load options to Select', async () => {
    const wrapper = mount(InfoBox, {
      props: {
        infoLabel,
        numOfTitleRows,
        numOfValueRows,
        options,
        dropdownPosition,
      },
    });
    wrapper.findComponent(ButtonIcon).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    expect(nodes.length).toBe(7);
  });

  it('should select one option', async () => {
    const wrapper = mount(InfoBox, {
      props: {
        infoLabel,
        numOfTitleRows,
        numOfValueRows,
        options,
        dropdownPosition,
      },
    });
    wrapper.findComponent(ButtonIcon).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    await nodes[1].trigger('mousedown');
    expect(wrapper.emitted('update:modelValue')).toEqual([
      [
        {
          id: 3,
          label: 'Shortlisted',
          _selected: false,
        },
      ],
    ]);
  });

  it('Dropdown trigger button should NOT be available when disabled', async () => {
    const wrapper = mount(InfoBox, {
      props: {
        infoLabel,
        numOfTitleRows,
        numOfValueRows,
        options,
        dropdownPosition,
        disabled: true,
      },
    });
    expect(wrapper.findComponent(ButtonIcon).exists()).toBeFalsy();
  });

  it('should close the dropdown when clicked outside', async () => {
    const wrapper = mount(InfoBox, {
      props: {
        infoLabel,
        numOfTitleRows,
        numOfValueRows,
        options,
        dropdownPosition,
      },
    });
    wrapper.vm.clickOutside();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('dropdown:opened')).toBeFalsy();
    expect(wrapper.vm.dropdownOpen).toEqual(false);
    expect(wrapper.find('.oxd-select-dropdown').exists()).toBeFalsy();
  });

  it('should select one option with color attribute and return converted rgba color', async () => {
    const wrapper = mount(InfoBox, {
      props: {
        infoLabel,
        numOfTitleRows,
        numOfValueRows,
        options,
        dropdownPosition,
      },
    });
    wrapper.setProps({
      modelValue: options[4],
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.infoBoxContainerStyles).toStrictEqual({
      'background-color': 'rgba(104, 166, 29, 7%)',
    });
  });

  it('should select one option with color attribute and return converted rgba color', async () => {
    const wrapper = mount(InfoBox, {
      props: {
        infoLabel,
        numOfTitleRows,
        numOfValueRows,
        options,
        dropdownPosition,
      },
    });
    wrapper.setProps({
      modelValue: '2022-05-03',
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.getLabel).toStrictEqual('2022-05-03');
  });

  it('should set empty array as default when didnot pass options', async () => {
    const wrapper = shallowMount(InfoBox, {
      props: {infoLabel, numOfTitleRows, numOfValueRows, dropdownPosition},
    });
    wrapper.findComponent(ButtonIcon).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    expect(nodes.length).toBe(0);
  });

  it('should not open the dropdown when the button icon is clicked but the component is readonly', async () => {
    const wrapper = mount(InfoBox, {
      props: {
        infoLabel,
        numOfTitleRows,
        numOfValueRows,
        options,
        dropdownPosition,
        readonly: true,
      },
    });
    wrapper.findComponent(ButtonIcon).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('dropdown:opened')).toBeFalsy();
    expect(wrapper.vm.dropdownOpen).toEqual(false);
    expect(wrapper.find('.oxd-select-dropdown').exists()).toBeFalsy();
  });

  it('Selected option should marked as selected true', async () => {
    const wrapper = mount(InfoBox, {
      props: {
        infoLabel,
        numOfTitleRows,
        numOfValueRows,
        options,
        dropdownPosition,
      },
    });
    wrapper.setProps({
      modelValue: options[1],
    });
    wrapper.findComponent(ButtonIcon).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.computedOptions[1]._selected).toStrictEqual(true);
  });

  it('on Focus it should NOT add a class "--focus" to the .oxd-select-fill-container when disabled', async () => {
    const wrapper = mount(InfoBox, {
      props: {
        infoLabel,
        numOfTitleRows,
        numOfValueRows,
        options,
        dropdownPosition,
        disabled: true,
      },
    });
    const fillContainer = wrapper.find('.oxd-select-fill-container');
    fillContainer.trigger('focus');
    await wrapper.vm.$nextTick();
    expect(
      fillContainer.find('.oxd-select-fill-container--focus').exists(),
    ).toBe(false);
  });

  it('on Focus it should add a class "--readonly" to the .oxd-select-fill-container when readonly', async () => {
    const wrapper = mount(InfoBox, {
      props: {
        infoLabel,
        numOfTitleRows,
        numOfValueRows,
        options,
        dropdownPosition,
        readonly: true,
      },
    });
    const fillContainer = wrapper.find('.oxd-select-fill-container');
    fillContainer.trigger('focus');
    await wrapper.vm.$nextTick();
    expect(
      fillContainer.find('.oxd-select-fill-container--readonly').exists(),
    ).toBe(true);
  });

  it('on Focus it should add a class "--focus" to the .oxd-select-fill-container', async () => {
    const wrapper = mount(InfoBox, {
      props: {
        infoLabel,
        numOfTitleRows,
        numOfValueRows,
        options,
        dropdownPosition,
      },
    });
    const fillContainer = wrapper.find('.oxd-select-fill-container');
    fillContainer.trigger('focus');
    await wrapper.vm.$nextTick();
    expect(
      fillContainer.find('.oxd-select-fill-container--focus').exists(),
    ).toBe(true);
  });

  it('on Blur it should remove the class "--focus" from .oxd-select-fill-container', async () => {
    const wrapper = mount(InfoBox, {
      props: {
        infoLabel,
        numOfTitleRows,
        numOfValueRows,
        options,
        dropdownPosition,
      },
    });
    wrapper.vm.onBlur();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-select-fill-container--focus').exists()).toBe(
      false,
    );
  });
});
