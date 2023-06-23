import {mount} from '@vue/test-utils';
import List2Tabs from '@orangehrm/oxd/core/components/List2Tabs/List2Tabs.vue';

describe('List2 > ListTabs.vue', () => {
  it('renders List tabs no tabs', () => {
    const wrapper = mount(List2Tabs);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('renders List tabs', () => {
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
  it('change List tab on click', async () => {
    const wrapper = mount(List2Tabs, {
      props: {
        tabs: [
          {id: 'goal', label: 'Goal', icon: 'oxd-chat'},
          {id: 'okrs', label: 'OKRs', icon: 'oxd-search'},
        ],
        modelValue: 'goal',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({modelValue: e}),
      },
    });
    wrapper.find('span#okrs').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toStrictEqual([['okrs']]);
  });
});
