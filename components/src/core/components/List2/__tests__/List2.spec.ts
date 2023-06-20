import {mount} from '@vue/test-utils';
import List from '@orangehrm/oxd/core/components/List2/List2.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import {h} from 'vue';

describe('List > List2.vue', () => {
  it('renders List', () => {
    const wrapper = mount(List);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('renders List with flat top', () => {
    const wrapper = mount(List, {
      props: {
        flatTop: true,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('collapse sidepanel on click', async () => {
    const wrapper = mount(List, {
      props: {
        showCollapse: true,
      },
      slots: {
        sidepanel: h('div', {}, 'Sidepanel'),
      },
    });
    expect(wrapper.vm.isCollapsed).toBeFalsy();
    wrapper.findComponent(IconButton).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isCollapsed).toBeTruthy();
  });
});
