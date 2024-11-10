import {mount} from '@vue/test-utils';
import Tabs from '@orangehrm/oxd/core/components/Tabs/Tabs.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import {h} from 'vue';

describe('Tabs.vue', () => {
  it('Renders two tabs along with icons', async () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: [
          h(
            'Tab',
            {tab: {id: '1', title: 'Posts', icon: 'oxd-posts'}},
            ' This is the content of tab 1',
          ),
          h(
            'Tab',
            {tab: {id: '2', title: 'Posts', icon: 'oxd-profile'}},
            ' This is the content of tab2',
          ),
        ],
      },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
    const icon = wrapper.findComponent(Icon);
    expect(icon.find('.tab-icon')).toBeTruthy();
  });

  it('Renders two tabs without icons', async () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: [
          h(
            'Tab',
            {tab: {id: '1', title: 'Posts'}},
            ' This is the content of tab 1',
          ),
          h(
            'Tab',
            {tab: {id: '2', title: 'Posts'}},
            ' This is the content of tab2',
          ),
        ],
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.tab-icon').exists()).toBeFalsy();
  });

  it('In initial rendering first tab Id is set to the currentTabId', () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: [
          h(
            'Tab',
            {tab: {id: '1', title: 'Posts'}},
            ' This is the content of tab 1',
          ),
          h(
            'Tab',
            {tab: {id: '2', title: 'Posts'}},
            ' This is the content of tab2',
          ),
        ],
      },
    });
    expect(wrapper.vm.selectedTabId).toBe('1');
  });

  it('Click on the second tab', () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: [
          h(
            'Tab',
            {tab: {id: '1', title: 'Posts'}},
            ' This is the content of tab 1',
          ),
          h(
            'Tab',
            {tab: {id: 'tab2', title: 'Resume'}},
            ' This is the content of tab2',
          ),
        ],
      },
    });

    wrapper.find('#tab2').trigger('click');
    wrapper.vm.$nextTick();
    expect(wrapper.emitted().click[0]).toContainEqual({
      id: 'tab2',
      title: 'Resume',
    });

    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('Hit Enter when focusing on the 2nd tab', () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: [
          h(
            'Tab',
            {tab: {id: 'tab1', title: 'Posts'}},
            ' This is the content of tab 1',
          ),
          h(
            'Tab',
            {tab: {id: 'tab2', title: 'Resume'}},
            ' This is the content of tab2',
          ),
        ],
      },
    });

    wrapper.find('#tab2').trigger('keyup.enter');
    wrapper.vm.$nextTick();
    expect(wrapper.emitted().change[0]).toContainEqual({
      id: 'tab2',
      title: 'Resume',
    });
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('Focusing on the third tab', () => {
    const wrapper = mount(Tabs, {
      props: {
        tabs: [
          {id: 'tab1', title: 'Details'},
          {id: 'tab2', title: 'Resume'},
          {id: 'tab3', title: 'Notes'},
        ],
      },
      slots: {
        default: [
          h(
            'Tab',
            {tab: {id: 'tab1', title: 'Details'}},
            ' This is the content of tab 1',
          ),
          h(
            'Tab',
            {tab: {id: 'tab2', title: 'Resume'}},
            ' This is the content of tab2',
          ),
          h(
            'Tab',
            {tab: {id: 'tab3', title: 'Notes'}},
            ' This is the content of tab2',
          ),
        ],
      },
    });

    wrapper.find('#tab3').trigger('focus');
    wrapper.vm.$nextTick();
    expect(wrapper.emitted().focus[0]).toContainEqual({
      id: 'tab3',
      title: 'Notes',
    });
    expect(wrapper.emitted('focus')).toBeTruthy();
  });

  it('Bluring on the first tab', () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: [
          h(
            'Tab',
            {tab: {id: 'tab1', title: 'Details'}},
            ' This is the content of tab 1',
          ),
          h(
            'Tab',
            {tab: {id: 'tab2', title: 'Resume'}},
            ' This is the content of tab2',
          ),
        ],
      },
    });

    wrapper.find('#tab1').trigger('blur');
    wrapper.vm.$nextTick();
    expect(wrapper.emitted().blur[0]).toContainEqual({
      id: 'tab1',
      title: 'Details',
    });
    expect(wrapper.emitted('blur')).toBeTruthy();
  });
  it('Displays tooltip on icon when title is empty and tooltip is provided', async () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: [
          h(
            'Tab',
            {
              tab: {
                id: 'tab1',
                title: '',
                icon: 'oxd-icon-info',
                tooltip: 'Information',
              },
            },
            'This is the content of tab 1',
          ),
        ],
      },
    });

    await wrapper.vm.$nextTick();

    const icon = wrapper.findComponent(Icon);
    expect(icon.exists()).toBeTruthy();
    expect(icon.attributes('tooltip')).toBe('Information');
    expect(icon.attributes('flow')).toBe('bottom');
  });
  it('Does not display tooltip on icon when title is provided', async () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: [
          h(
            'Tab',
            {
              tab: {
                id: 'tab1',
                title: 'Information',
                icon: 'oxd-icon-info',
                tooltip: 'Information',
              },
            },
            'This is the content of tab 1',
          ),
        ],
      },
    });

    await wrapper.vm.$nextTick();

    const icon = wrapper.findComponent(Icon);
    expect(icon.exists()).toBeTruthy();
    expect(icon.attributes('tooltip')).toBeFalsy();
    expect(icon.attributes('flow')).toBeFalsy();
  });
});
