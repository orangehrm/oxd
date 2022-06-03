import Tabs from '@orangehrm/oxd/core/components/Tabs/Tabs.vue';

export default {
  title: 'Layout/Tabs',
  component: Tabs,
  argTypes: {
    tabs: {
      control: {type: 'Array'},
      table: {
        type: {summary: 'there are three attributes, "id", "title" and the "icon". Icon is not mandatory. i.e [{ id: "tab1", title: "Details", icon : "oxd-posts" }, { id: "tab2", title: "Resume", icon : "oxd-profile" }]'}
      }
    }
  }
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-tabs': Tabs},
  template: '<oxd-tabs v-bind="args"> <template #tab1> <div> Hi this is the content of first tab </div> </template> <template #tab2> <div> Hi this is the content of second tab </div> </template> <template #tab3> <div> Hi this is the content of third tab </div> </template> </oxd-tabs>'
});


const tabsDefault = [
    { id: "tab1", title: "Posts" }, 
    { id: "tab2", title: "Personal Details" }, 
    { id: "tab3", title: "Schedule"}
  ];

const tabsWithIcon = [
    { id: "tab1", title: "Posts", icon : 'oxd-posts' }, 
    { id: "tab2", title: "Personal Details", icon : 'oxd-profile' }, 
    { id: "tab3", title: "Schedule", icon : 'oxd-time'}
  ];

export const Default = Template.bind({});
Default.args = {
        tabs : tabsDefault
};

Default.parameters = {
    docs: {
      source: {
        code:
          '<oxd-tabs \n :tabs=' +
          JSON.stringify(tabsDefault) +
          '\n/>',
      },
    },
  };

export const WithIcon = Template.bind({});
WithIcon.args = {
    tabs : tabsWithIcon
};

WithIcon.parameters = {
    docs: {
      source: {
        code:
          '<oxd-tabs \n :tabs=' +
          JSON.stringify(tabsDefault) +
          '\n/>',
      },
    },
  };
