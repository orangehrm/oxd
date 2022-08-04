import {mount} from '@vue/test-utils';
import DropDown from '@orangehrm/oxd/core/components/CardTable/Cell/Dropdown.vue';

describe('CardTable > Cell > Dropdown.vue', () => {
  it('should render OXD CardTable > Cell > Dropdown Cell', async () => {
    const wrapper = mount(DropDown, {
      props: {
        options: [
          {label: 'Add Comment', context: 'add_comment'},
          {label: 'View Leave Details', context: 'leave_details'},
          {label: 'View PIM Info', context: 'pim_details'},
          {label: 'Cancel Leave', context: 'cancel_leave'},
        ],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render OXD CardTable > Cell > Dropdown Cell (with icons)', async () => {
    const wrapper = mount(DropDown, {
      props: {
        options: [
          {
            label: 'Add Comment',
            context: 'add_comment',
            icon: 'oxd-icon-comment',
          },
          {
            label: 'View Leave Details',
            context: 'leave_details',
            icon: 'oxd-icon-leave',
          },
          {
            label: 'View PIM Info',
            context: 'pim_details',
            icon: 'oxd-icon-leave',
          },
          {
            label: 'Cancel Leave',
            context: 'cancel_leave',
            icon: 'oxd-icon-cancel',
          },
        ],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
