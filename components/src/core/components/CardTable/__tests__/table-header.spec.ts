import {mount} from '@vue/test-utils';
import TableHeader from '@orangehrm/oxd/core/components/CardTable/Table/TableHeader.vue';

describe('CardTable > TableHeader.vue', () => {
  it('renders OXD CardTable > TableHeader', () => {
    const wrapper = mount(TableHeader, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
