import {mount} from '@vue/test-utils';
import Segments from '@orangehrm/oxd/core/components/Segments/Segments.vue';

const optionsList = [
  {
    id: 1,
    label: 'Item one',
    icon: 'oxd-show',
    iconSize: 'small',
  },
  {
    id: 2,
    label: 'Item two',
    icon: 'oxd-edit',
    iconSize: 'xx-small',
  },
];

describe('Segments > Segments.vue', () => {
  it('renders OXD Segments', () => {
    const wrapper = mount(Segments, {
      props: {
        options: optionsList,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should accept valid input', async () => {
    const wrapper = mount(Segments, {
      props: {
        options: optionsList,
        modelValue: {
          id: 1,
          label: 'Item one',
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('#segment-id_1').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-segment-label.active').exists()).toBeTruthy();
  });
});
