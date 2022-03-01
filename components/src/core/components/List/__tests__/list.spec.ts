import {mount} from '@vue/test-utils';
import List from "@orangehrm/oxd/core/components/List/List.vue";
import minimalListConfig from './list-minimal.json'

describe('List > List.vue', () => {
  it('renders OXD List > List', () => {
    const wrapper = mount(List, {
      props: {
        configurations: minimalListConfig,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
