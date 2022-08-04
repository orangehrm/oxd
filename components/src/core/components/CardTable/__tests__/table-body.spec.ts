import {mount} from '@vue/test-utils';
import TableBody from '@orangehrm/oxd/core/components/CardTable/Table/TableBody.vue';

describe('CardTable > TableBody.vue', () => {
  it('renders OXD CardTable > TableBody', () => {
    const wrapper = mount(TableBody, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
