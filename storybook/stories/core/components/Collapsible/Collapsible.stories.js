import Collapsible from '@orangehrm/oxd/core/components/Collapsible/Collapsible.vue';
import CollapsibleEvents from './CollapsibleEvents.story.vue';


export default {
  title: 'Layout/Collapsible',
  component: Collapsible,
  argTypes: {
    headerTitle: {
        control: {type: 'text'},
        table: {
            type: {summary: 'This is the title label of the collapsible'}
          }
    },
    defaultExpand: {
        control: {type: 'boolean'},
        table: {
            type: {summary: 'This is to define whether the content should be expanded or collapsed initially'}
          }
    },
    'toggle': {
      control: {type: 'object'},
      defaultValue: {},
      table: {
        type: {summary: 'Emit event when click on the toggle button. Object contains the state whether the content is expanded or not'},
      },
    },
    collapsedContent: {
      control: {type: 'object'},
      table: {
        type: {summary: 'The slot which defines the collapsed content'},
      },
    },
    expandedContent: {
      control: {type: 'object'},
      table: {
        type: {summary: 'The slot which defines the expanded content'},
      },
    }
  }
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-collapsible': Collapsible},
  template: '<oxd-collapsible v-bind="args"> <template #collapsedContent> <div> This is the collapsed view </div> </template> <template #expandedContent> <div> This is the expanded view </div> </template>  </oxd-collapsible>'
});



export const Default = Template.bind({});
Default.args = {
    headerTitle : "Collapsible Component"
};

Default.parameters = {
    docs: {
      source: {
        code:
          '<oxd-collapsible \n :tabs="Collapsible Component"' +
          '\n/>',
      },
    },
  };

export const InitialExpandedView = Template.bind({});
InitialExpandedView.args = {
    headerTitle: "Collapsible Component",
    defaultExpand: true
};

InitialExpandedView.parameters = {
    docs: {
      source: {
        code:
        '<oxd-collapsible \n :tabs="Collapsible Component"' +
        '\n/> \n :defaultExpand=true',
      },
    },
  };

export const Events = () => CollapsibleEvents;

Events.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-collapsible \n' +
        ':headerTitle="Collapsible Component"\n'+
        '@toggle="onToggle""\n' +
        '>\n' +
        '<template #collapsedContent>\n'+
        '<div>This the Collapsed View</div>\n'+
        '</template>\n'+
        '<template #expandedContent>\n'+
        '<div>This the Expanded View</div>\n'+
        '</template>\n'+
        '</oxd-collapsible>\n'+
        '</div>\n' +
        '<div style="margin-top: 2rem">\n' +
        '<span v-if="ToggleEvent">Toggle Event Triggered <br> Toggle data {{ToggleInfo}}</span>' +
        '</div>\n' +
        '//\n' +
        'File -> CollapsibleEvents.story.vue',
    },
  },
};

