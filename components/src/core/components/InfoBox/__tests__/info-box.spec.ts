import {mount, shallowMount} from '@vue/test-utils';
import InfoBox from '@orangehrm/oxd/core/components/InfoBox/InfoBox.vue';
import ButtonIcon from '@orangehrm/oxd/core/components/Button/Icon.vue';
import SelectOption from '@orangehrm/oxd/core/components/Input/Select/SelectOption.vue';
import SelectDropdown from '@orangehrm/oxd/core/components/Input/Select/SelectDropdown.vue';

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
    label: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.'
  }
];

describe('InfoBox.vue', () => {
  it('renders OXD Select Input', () => {
    const wrapper = mount(InfoBox, {
      props: {options},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should load options to Select', async () => {
    const wrapper = mount(InfoBox, {
      props: {options},
    });
    wrapper.findComponent(ButtonIcon).trigger('click');
    await wrapper.vm.$nextTick();
    const nodes = wrapper.findAllComponents(SelectOption);
    expect(nodes.length).toBe(7);
  });
  it('should select one option', async () => {
    const wrapper = mount(InfoBox, {
      props: {options},
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
});
