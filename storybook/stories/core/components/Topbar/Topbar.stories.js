import Topbar from '@orangehrm/oxd/core/components/Topbar/Topbar.vue';

export default {
  title: 'Example/Topbar',
  component: Topbar,
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-top-bar': Topbar},
  template: `<oxd-top-bar/>`,
});

const argTypes = {
  menuItems: {control: {type: 'object'}},
  contextTitle: {control: {type: 'text'}},
};

export const Default = Template.bind({});
Default.args = {
  menuItems: [
    {
      name: 'Employee List',
      url: '#',
      active: false,
      children: [],
    },
    {
      name: 'Manage Data',
      url: '',
      active: false,
      children: [
        {
          name: 'Job Titles',
          url: '#',
        },
        {
          name: 'User Management',
          url: '#',
        },
        {
          name: 'Job Categories',
          url: '#',
        },
      ],
    },
    {
      name: 'Reports',
      url: '',
      active: false,
      children: [
        {
          name: 'Job Titles',
          url: '#',
        },
        {
          name: 'User Management',
          url: '#',
        },
        {
          name: 'Job Categories',
          url: '#',
        },
      ],
    },
  ],
  contextTitle: 'Personal Information Manager',
};
Default.argTypes = argTypes;
