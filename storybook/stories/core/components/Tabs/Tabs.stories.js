import Tabs from '@orangehrm/oxd/core/components/Tabs/Tabs.vue';
import Tab from '@orangehrm/oxd/core/components/Tabs/Tab.vue';
import TabsEvents from './TabsEvents.story.vue';

export default {
  title: 'Layout/Tabs',
  component: Tabs,
  argTypes: {
    tabs: {
      control: {type: 'array'},
      table: {
        type: {
          summary:
            'There are three attributes, "id", "title" and the "icon" for an object. Icon is not mandatory.',
        },
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-tabs': Tabs, 'oxd-tab': Tab},
  template: `<oxd-tabs v-bind="args">   <oxd-tab :tab="{id:'1',title:'Posts'}"> <div> <input type="text"/> Hi this is the content of first tab </div> </oxd-tab><oxd-tab :tab="{id:'2',title:'Personal Details'}"> <div> Hi this is the content of second tab </div> </oxd-tab> <oxd-tab :tab="{id:'3',title:'Schedule'}"> <div> Hi this is the content of third tab </div> </oxd-tab> </oxd-tabs>`,
});

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  docs: {
    source: {
      code: `<oxd-tabs v-bind="args">   <oxd-tab :tab="{id:'1',title:'Posts'}"> <div> Hi this is the content of first tab </div> </oxd-tab><oxd-tab :tab="{id:'2',title:'Personal Details'}"> <div> Hi this is the content of second tab </div> </oxd-tab> <oxd-tab :tab="{id:'3',title:'Schedule'}"> <div> Hi this is the content of third tab </div> </oxd-tab> </oxd-tabs>`,
    },
  },
};

const TemplateWithIcon = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-tabs': Tabs, 'oxd-tab': Tab},
  template: `<oxd-tabs v-bind="args">   <oxd-tab :tab="{id:'1',title:'Posts',icon: 'oxd-posts'}"> <div> Hi this is the content of first tab </div> </oxd-tab><oxd-tab :tab="{id:'2',title:'Personal Details',icon: 'oxd-time'}"> <div> Hi this is the content of second tab </div> </oxd-tab> <oxd-tab :tab="{id:'3',title:'Schedule',icon: 'oxd-posts'}"> <div> Hi this is the content of third tab </div> </oxd-tab> <oxd-tab :tab="{id:'4',title:'',icon: 'oxd-posts', tooltip: 'Posts'}"> <div> Hi this is the content of fourth tab </div></oxd-tab> </oxd-tabs>`,
});
export const WithIcon = TemplateWithIcon.bind({});

WithIcon.parameters = {
  docs: {
    source: {
      code: `<oxd-tabs v-bind="args">   <oxd-tab :tab="{id:'1',title:'Posts',icon: 'oxd-posts'}"> <div> Hi this is the content of first tab </div> </oxd-tab><oxd-tab :tab="{id:'2',title:'Personal Details',icon: 'oxd-time'}"> <div> Hi this is the content of second tab </div> </oxd-tab> <oxd-tab :tab="{id:'3',title:'Schedule',icon: 'oxd-posts'}"> <div> Hi this is the content of third tab </div> </oxd-tab> <oxd-tab :tab="{id:'4',title:'',icon: 'oxd-posts', tooltip: 'Posts'}"> <div> Hi this is the content of fourth tab </div></oxd-tab> </oxd-tabs>`,
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
        ':tabs="tabs"\n' +
        '@focus="onFocus"\n' +
        '@blur="onBlur"\n' +
        '@click="onClick"\n' +
        '@keyup.enter="onClick"\n' +
        '>\n' +
        '<template #tab1>\n' +
        '<div>This is tab1</div>\n' +
        '</template>\n' +
        '<template #tab2>\n' +
        '<div>This is tab2</div>\n' +
        '</template>\n' +
        '<template #tab3>\n' +
        '<div>This is tab3</div>\n' +
        '</template>\n' +
        '</oxd-tabs>\n' +
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
