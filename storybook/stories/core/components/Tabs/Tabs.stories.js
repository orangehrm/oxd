import Tabs from '@orangehrm/oxd/core/components/Tabs/Tabs.vue';
import TabsEvents from './TabsEvents.story.vue';


export default {
  title: 'Layout/Tabs',
  component: Tabs,
  argTypes: {
    tabs: {
      control: {type: 'array'},
      table: {
        type: {summary: 'There are three attributes, "id", "title" and the "icon" for an object. Icon is not mandatory.'}
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

  export const Events = () => TabsEvents;

  Events.parameters = {
    docs: {
      source: {
        code:
          '  <div> \n' +
          '<oxd-tabs \n' +
          ':tabs="tabs"\n'+
          '@focus="onFocus"\n' +
          '@blur="onBlur"\n' +
          '@click="onClick"\n' +
          '@keyup.enter="onClick"\n' +
          '>\n' +
          '<template #tab1>\n'+
          '<div>This is tab1</div>\n'+
          '</template>\n'+
          '<template #tab2>\n'+
          '<div>This is tab2</div>\n'+
          '</template>\n'+
          '<template #tab3>\n'+
          '<div>This is tab3</div>\n'+
          '</template>\n'+
          '</oxd-tabs>\n'+
          '</div>\n' +
          '<div style="margin-top: 2rem">\n' +
          '<span v-if="FocusEvent">Focus Event Triggered <br> Tab data {{TabData}}</span>\n' +
          '<span v-if="BlurEvent">Blur Event Triggered <br> Tab data {{TabData}}</span>\n' +
          '<span v-if="ClickEvent">Click Event Triggered <br> Tab data {{TabData}}</span>\n' +
          '<span v-if="KeyUpEnterEvent">KeyUp Event Triggered <br> Tab data {{TabData} </span>\n' +
          '</div>\n' +
          '//\n' +
          'File -> TabsEvents.story.vue',
      },
    },
  };
