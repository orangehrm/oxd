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
});
