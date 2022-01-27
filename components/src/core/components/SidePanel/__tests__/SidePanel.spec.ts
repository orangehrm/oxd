import {mount, shallowMount} from '@vue/test-utils';
import SidePanel from '@orangehrm/oxd/core/components/SidePanel/SidePanel.vue';
import MainMenu from '@orangehrm/oxd/core/components/SidePanel/MainMenu.vue';
import MainMenuItem from '@orangehrm/oxd/core/components/SidePanel/MainMenuItem.vue';

describe('SidePanel.vue', () => {
  it('renders OXD Side Panel', () => {
    const wrapper = shallowMount(SidePanel);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render OXD Side Panel with menu items', async () => {
    const menuItems = [
      {
        name: 'Home',
        url: '#',
        icon: 'icon-home',
        active: false,
      },
      {
        name: 'PIM',
        url: '#',
        icon: 'icon-pim',
        active: true,
      },
      {
        name: 'Time',
        url: '#',
        icon: 'icon-time',
        active: false,
      },
    ];
    const wrapper = mount(SidePanel, {
      props: {menuItems},
    });
    const menuElems = wrapper.findAllComponents(MainMenuItem);
    expect(menuElems.length).toBe(3);
    expect(menuElems[0].findAll('a').length).toBeTruthy();
    if (menuElems[0].findAll('a')[1]) {
      expect(menuElems[0].findAll('a')[1].classes()).toContain('active');
    }
  });

  it('should emit OXD Side Panel collapse event', () => {
    const menuItems = [
      {
        name: 'Home',
        url: '#',
        icon: 'icon-home',
        active: false,
      },
    ];
    const wrapper = mount(SidePanel, {
      props: {menuItems},
    });
    wrapper
      .findComponent(MainMenu)
      .find('.oxd-main-menu-button')
      .trigger('click');
    expect(wrapper.emitted('collapse')).toBeTruthy();
  });
});
