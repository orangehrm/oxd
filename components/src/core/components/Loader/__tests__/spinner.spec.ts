import {mount} from '@vue/test-utils';
import Spinner from '@orangehrm/oxd/core/components/Loader/Spinner.vue';

describe('Loader > Spinner.vue', () => {
  it('renders OXD Spinner', () => {
    const wrapper = mount(Spinner, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Spinner with container', () => {
    const wrapper = mount(Spinner, {
      props: {withContainer: false},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
