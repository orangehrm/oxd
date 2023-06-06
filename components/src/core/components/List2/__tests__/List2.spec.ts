import {mount} from '@vue/test-utils';
import List from '@orangehrm/oxd/core/components/List2/List2.vue';

describe('List > List2.vue', () => {
  it('renders List2 table', () => {
    const wrapper = mount(List);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
