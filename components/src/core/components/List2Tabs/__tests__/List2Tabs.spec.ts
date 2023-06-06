import {mount} from '@vue/test-utils';
import List2Tabs from '@orangehrm/oxd/core/components/List2Tabs/List2Tabs.vue';

describe('List2 > ListTabs.vue', () => {
  it('renders List Tabs', () => {
    const wrapper = mount(List2Tabs, {
      props: {
        tabs: [
          {id: 'goal', label: 'Goal', icon: 'oxd-chat'},
          {id: 'okrs', label: 'OKRs', icon: 'oxd-search'},
        ],
        modelValue: 'okrs',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
