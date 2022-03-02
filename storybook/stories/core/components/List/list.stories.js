import ListComponent from '@orangehrm/oxd/core/components/List/List';
import ListStory from './List.story.vue';
import configurations from './list-config.json';
import data from './list-data.json';

export default {
  title: 'Example/List',
  argTypes: {
    listItems: {
      control: {type: 'object'},
      defaultValue: data.items,
    },
    listHighlightRows: {
      control: {type: 'object'},
      defaultValue: {
        rowIndexes: [0,2],
        type: 'success',
      },
    },
    configurations: {
      control: {type: 'object'},
      defaultValue: configurations,
    },
    pagination: {
      control: {type: 'object'},
      defaultValue: {
        perPage: {
          id: 2,
          label: '20',
        },
        limit: 20,
        pages: [10, 20, 50, 100]
      },
    },
    selectedListItem: {
      control: {type: 'array'},
      defaultValue: data.vacancies,
    },
    wholeRecordsCount: {
      control: {type: 'number'},
      defaultValue: 110,
    },
    filteredTotalRecordsCount: {
      control: {type: 'number'},
      defaultValue: 100,
    },
    sidePanelList: {
      control: {type: 'array'},
      defaultValue: data.stages,
    }
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {
    'oxd-list': ListComponent,
  },
  template: `
  <oxd-list
    v-bind="args"
  >
    <template v-slot:sidebarBody>
    </template>
    <template v-slot:list>
  </oxd-list>`,
});
export const Default = () => ListStory;


export const Configurable = Template.bind({});
Configurable.args = {
  configurations: configurations,
  listItems: data.items,
  listHighlightRows: {
    rowIndexes: [0,2],
    type: 'success',
  },
  sidePanelList: data.stages,
  pagination: {
    perPage: {
      id: 2,
      label: '20',
    },
    limit: 20,
    pages: [10, 20, 50, 100]
  },
  selectedListItem: data.vacancies,
  wholeRecordsCount: 120,
  filteredTotalRecordsCount: 100,
};
