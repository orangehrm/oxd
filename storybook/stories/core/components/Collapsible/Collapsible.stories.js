import Collapsible from '@orangehrm/oxd/core/components/Collapsible/Collapsible.vue';
import CollapsibleEvents from './CollapsibleEvents.story.vue';

export default {
  title: 'Layout/Collapsible',
  component: Collapsible,
  argTypes: {
    headerTitle: {
      control: {type: 'text'},
      table: {
        type: {summary: 'This is the title label of the collapsible'},
      },
    },
    defaultExpand: {
      control: {type: 'boolean'},
      table: {
        type: {
          summary:
            'This is to define whether the content should be expanded or collapsed initially',
        },
      },
    },
    collapsible: {
      control: {type: 'boolean'},
      table: {
        type: {
          summary:
            'This is to define whether the collapse/expand button should be shown or not',
        },
      },
    },
    toggle: {
      control: {type: 'object'},
      defaultValue: {},
      table: {
        type: {
          summary:
            'Emit event when click on the toggle button. Object contains the state whether the content is expanded or not',
        },
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
    },
    commonContent: {
      control: {type: 'object'},
      table: {
        type: {
          summary:
            'The slot which defines the common content which should be shown in both expanded and collapsed views',
        },
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-collapsible': Collapsible},
  template:
    '<oxd-collapsible v-bind="args"> <template #commonContent> <div> This is the common content </div> </template> <template #collapsedContent> <div> This is the collapsed view </div> </template> <template #expandedContent> <div> This is the expanded view </div> </template>  </oxd-collapsible>',
});

export const Default = Template.bind({});
Default.args = {
  headerTitle: 'Collapsible Component',
};

Default.parameters = {
  docs: {
    source: {
      code: '<oxd-collapsible \n :headerTitle="Collapsible Component"' + '\n/>',
    },
  },
};

export const InitialExpandedView = Template.bind({});
InitialExpandedView.args = {
  headerTitle: 'Collapsible Component',
  defaultExpand: true,
};

InitialExpandedView.parameters = {
  docs: {
    source: {
      code:
        '<oxd-collapsible \n :headerTitle="Collapsible Component"' +
        '\n/> \n :defaultExpand=true',
    },
  },
};

export const NoButtonToExpandOrCollapse = Template.bind({});
NoButtonToExpandOrCollapse.args = {
  headerTitle: 'Collapsible Component',
  collapsible: false,
};

NoButtonToExpandOrCollapse.parameters = {
  docs: {
    source: {
      code:
        '<oxd-collapsible \n :headerTitle="Collapsible Component"' +
        '\n/> \n :collapsible=false',
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
        ':headerTitle="Collapsible Component"\n' +
        '@toggle="onToggle""\n' +
        '>\n' +
        '<template #commonContent>\n' +
        '<div>This the Common Content</div>\n' +
        '</template>\n' +
        '<template #collapsedContent>\n' +
        '<div>This the Collapsed View</div>\n' +
        '</template>\n' +
        '<template #expandedContent>\n' +
        '<div>This the Expanded View</div>\n' +
        '</template>\n' +
        '</oxd-collapsible>\n' +
        '</div>\n' +
        '<div style="margin-top: 2rem">\n' +
        '<span v-if="ToggleEvent">Toggle Event Triggered <br> Toggle data {{ToggleInfo}}</span>' +
        '</div>\n' +
        '//\n' +
        'File -> CollapsibleEvents.story.vue',
    },
  },
};
