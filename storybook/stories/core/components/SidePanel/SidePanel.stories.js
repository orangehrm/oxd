import SidePanel from '@orangehrm/oxd/core/components/SidePanel/SidePanel';

export default {
  title: 'Panels/Sidepanel',
  component: SidePanel,
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-side-panel': SidePanel},
  template: `<oxd-side-panel v-bind="args"/>`,
});

const argTypes = {
  toggle: {control: {type: 'boolean'}},
  menuItems: {control: {type: 'object'}},
};

export const Default = Template.bind({});
Default.args = {
  menuItems: [
    {
      name: 'Home',
      url: '#',
      icon: 'icon-home',
      active: true,
    },
    {
      name: 'PIM',
      url: '#',
      icon: 'icon-pim',
      active: false,
    },
    {
      name: 'Time',
      url: '#',
      icon: 'icon-time',
      active: false,
    },
    {
      name: 'Recruitment',
      url: '#',
      icon: 'icon-recruitment',
      active: true,
    },
    {
      name: 'Leave',
      url: '#',
      icon: 'icon-leave',
      active: false,
    },
    {
      name: 'Disciplines',
      url: '#',
      icon: 'icon-discipline',
      active: false,
    },
    {
      name: 'Training',
      url: '#',
      icon: 'icon-training',
      active: false,
    },
    {
      name: 'S & D',
      url: '#',
      icon: 'icon-development',
      active: false,
    },
    {
      name: 'On-boarding',
      url: '#',
      icon: 'icon-onboarding',
      active: false,
    },
    {
      name: 'Expense',
      url: '#',
      icon: 'icon-expences',
      active: false,
    },
    {
      name: 'Reports',
      url: '#',
      icon: 'icon-report',
      active: false,
    },
    {
      name: 'All Settings',
      url: '#',
      icon: 'icon-admin',
      active: false,
    },
  ],
  brandImageSrc: require('@orangehrm/oxd/assets/images/orange.png').default,
};
Default.argTypes = argTypes;
