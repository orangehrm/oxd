import ListComponent from '@orangehrm/oxd/core/components/List/List';
import ListStory from './List.story.vue';
import basicList from './basic-list-schema';
import listWithSidebar from './list-with-sidebar';
import data from './list-data.json';

export default {
  title: 'Data Tables/List',
  argTypes: {
    listItems: {
      control: {type: 'object'},
      defaultValue: data.candidates,
      table: {
        type: {summary: 'Set list items to the list'},
      },
    },
    listHighlightRows: {
      control: {type: 'object'},
      defaultValue: {
        rowIndexes: [0, 2],
        type: 'success',
      },
      table: {
        type: {summary: 'Set the highlighted rows'},
      },
    },
    configurations: {
      control: {type: 'object'},
      defaultValue: listWithSidebar,
      table: {
        type: {summary: 'Set the list configurations'},
      },
    },
    pagination: {
      control: {type: 'object'},
      defaultValue: {
        perPage: {
          id: 2,
          label: '20',
        },
        limit: 20,
        pages: [10, 20, 50, 100],
      },
      table: {
        type: {summary: 'Set the options for pagination'},
      },
    },
    selectedListItem: {
      control: {type: 'array'},
      defaultValue: data.vacancies,
      table: {
        type: {summary: 'Set the list list item for the left sidebar'},
      },
    },
    wholeRecordsCount: {
      control: {type: 'number'},
      defaultValue: 110,
      table: {
        type: {summary: 'Set the Total number of Records in the list'},
      },
    },
    filteredTotalRecordsCount: {
      control: {type: 'number'},
      defaultValue: 100,
      table: {
        type: {
          summary: 'Set the Number of records showing in the current page',
        },
      },
    },
    sidePanelList: {
      control: {type: 'array'},
      defaultValue: data.stages,
      table: {
        type: {summary: 'Set the options showing in the side panel'},
      },
    },
    emptyMsg: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set no data found icon and message'},
      },
    },
  },
};

const Template = (args) => ({
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

export const BasicList = Template.bind({});
const basicListArgs = {
  configurations: basicList,
  listItems: data.historyEvents,
  listHighlightRows: null,
  pagination: null,
  wholeRecordsCount: 4,
  filteredTotalRecordsCount: 4,
};
BasicList.args = basicListArgs;
BasicList.storyName = 'Basic List';

export const EmptyList = Template.bind({});
EmptyList.args = {
  configurations: basicList,
  listItems: [],
  listHighlightRows: null,
  pagination: null,
  wholeRecordsCount: 0,
  filteredTotalRecordsCount: 0,
};
EmptyList.storyName = 'Empty List';

export const Configurable = Template.bind({});
Configurable.args = {
  configurations: listWithSidebar,
  listItems: data.candidates,
  listHighlightRows: {
    rowIndexes: [0, 2],
    type: 'success',
  },
  sidePanelList: data.stages,
  pagination: {
    perPage: {
      id: 2,
      label: '20',
    },
    limit: 20,
    pages: [10, 20, 50, 100],
  },
  selectedListItem: data.vacancies,
  wholeRecordsCount: 120,
  filteredTotalRecordsCount: 100,
  emptyMsg: {
    message: 'Sorry, No Data Found!',
    icon: 'oxd-no-data',
  },
};
