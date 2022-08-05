import {shallowMount} from '@vue/test-utils';
import Alert from '@orangehrm/oxd/core/components/Alert/Alert.vue';

describe('Alert.vue', () => {
  it('renders OXD Alert', () => {
    const wrapper = shallowMount(Alert, {
      props: {
        show: true,
        type: 'success',
        message: 'This is an alert',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('Compact Alert', () => {
    const wrapper = shallowMount(Alert, {
      props: {
        show: true,
        type: 'success',
        message: 'This is an alert',
        compact: true,
      },
    });
    expect(wrapper.findAll('.oxd-alert.oxd-alert--compact').length).toEqual(1);
    expect(
      wrapper.findAll('.oxd-alert-content.oxd-alert-content--compact').length,
    ).toEqual(1);
    expect(
      wrapper.findAll('.oxd-alert-action.oxd-alert-action--compact').length,
    ).toEqual(1);
  });
  it('Non Compact Alert', () => {
    const wrapper = shallowMount(Alert, {
      props: {
        show: true,
        type: 'success',
        message: 'This is an alert',
        compact: false,
      },
    });
    expect(wrapper.findAll('.oxd-alert.oxd-alert--compact').length).toEqual(0);
    expect(
      wrapper.findAll('.oxd-alert-content.oxd-alert-content--compact').length,
    ).toEqual(0);
    expect(
      wrapper.findAll('.oxd-alert-action.oxd-alert-action--compact').length,
    ).toEqual(0);
  });
});
