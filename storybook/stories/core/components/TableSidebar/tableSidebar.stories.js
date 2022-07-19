import TableSidebarStory from './TableSidebar.story.vue';
import TableSidebarWithIconsStory from './TableSidebarWithIcons.story.vue';

export default {
  title: 'Data Tables/TableSidebar',
  components: TableSidebarWithIconsStory,
};
const TableSidebarTemplate = (args) => ({
  setup() {
    return {args};
  },
  components: {TableSidebarStory},
  template: '<TableSidebarStory v-bind="args" />',
});
const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {TableSidebarWithIconsStory},
  template: '<TableSidebarWithIconsStory v-bind="args" />',
});

export const TableSidebar = TableSidebarTemplate.bind({});
TableSidebar.argTypes = {
  headerVisible: {
    control: {type: 'boolean'},
    defaultValue: true,
    table: {
      type: {
        summary: 'Set boolean value true to make header visible.',
      },
      defaultValue: {summary: true},
      category: 'Props',
    },
  },
  headerActionButtonVisible: {
    control: {type: 'boolean'},
    defaultValue: true,
    table: {
      type: {
        summary:
          'Set boolean value true to make header action buttons visible.',
      },
      defaultValue: {summary: true},
      category: 'Props',
    },
  },
  bubbleVisible: {
    control: {type: 'boolean'},
    defaultValue: true,
    table: {
      type: {
        summary:
          'Set boolean value true to make left panel list bubble visible.',
      },
      defaultValue: {summary: true},
      category: 'Props',
    },
  },
  bodyVisible: {
    control: {type: 'boolean'},
    defaultValue: true,
    table: {
      type: {
        summary: 'Set boolean value true to make side panel body visible.',
      },
      defaultValue: {summary: true},
      category: 'Props',
    },
  },
  listVisible: {
    control: {type: 'boolean'},
    defaultValue: true,
    table: {
      type: {
        summary: 'Set boolean value true to make side panel list visible',
      },
      defaultValue: {summary: true},
      category: 'Props',
    },
  },
  sidePanelList: {
    control: {type: 'array'},
    defaultValue: [
      {
        id: -1,
        label: 'All Candidates',
        count: 33,
        displayType: 'label-info',
        style: {
          backgroundColor: '#d1dff6',
          color: '#1f6ffd',
        },
      },
      {
        id: 1,
        label: 'Application Received',
        count: 24,
        displayType: 'label-info',
        style: {
          backgroundColor: '#d1dff6',
          color: '#1f6ffd',
        },
      },
      {
        id: 2,
        label: 'Phone Screening',
        count: 11,
        displayType: 'label-warn',
        style: {
          backgroundColor: '#ebebf0',
          color: '#65738f',
        },
      },
      {
        id: 3,
        label: '1st In-Person Interview',
        count: 3,
        displayType: 'label',
        style: {
          backgroundColor: '#ebebf0',
          color: '#65738f',
        },
      },
      {
        id: 4,
        label: 'Shortlisted',
        count: 0,
        displayType: 'label-warn',
        style: {
          backgroundColor: '#f8ebfd',
          color: '#c57afd',
        },
      },
      {
        id: 5,
        label: 'Panel Interview',
        count: 9,
        displayType: 'label-info',
        style: {
          backgroundColor: '#ebebf0',
          color: '#65738f',
        },
      },
      {
        id: 6,
        label: 'Reference Check',
        count: 1,
        displayType: 'label-warn',
        style: {
          backgroundColor: '#ebebf0',
          color: '#65738f',
        },
      },
      {
        id: 7,
        label: '321 Form Onboarding',
        count: 0,
        displayType: 'label-warn',
        style: {
          backgroundColor: '#ebebf0',
          color: '#65738f',
        },
      },
      {
        id: 8,
        label: 'Job Offer',
        count: 2,
        displayType: 'label-success',
        style: {
          backgroundColor: '#e1f8e0',
          color: '#74cb1e',
        },
      },
      {
        id: 9,
        label: 'Hired',
        count: 2,
        displayType: 'label-warn',
        style: {
          backgroundColor: '#fceee3',
          color: '#ed7d30',
        },
      },
      {
        id: 10,
        label: 'Rejected',
        count: 3,
        displayType: 'label-danger',
        style: {
          backgroundColor: '#f9e3e9',
          color: '#e74432',
        },
      },
    ],
    table: {
      type: {
        summary:
          'Set an array of objects which has id, label, count , displayType, style with backgroundColor and color included.',
      },
      category: 'Props',
    },
  },
  selectedListItemId: {
    control: {type: 'number'},
    defaultValue: 2,
    table: {
      type: {summary: 'Set selected item of left panel list.'},
      category: 'Props',
    },
  },
  button: {
    control: {type: 'object'},
    defaultValue: {
      props: {
        label: 'Add Candidate',
        displayType: 'secondary',
        size: 'long',
        iconName: 'oxd-add',
        iconSize: 'small',
      },
    },
    table: {
      type: {
        summary:
          'Set an object with label, iconName, iconImageSrc, iconSize, size, displayType, style, disabled, disabledTooltip properties as the left panel header button.',
      },
      category: 'Props',
    },
  },
  secondaryButton: {
    control: {type: 'object'},
    defaultValue: {
      props: {
        icon: 'oxd-import-templates',
        size: 'extra-large',
        label: 'Import Templates',
        style: {
          color: '#76bc21',
        },
      },
    },
    table: {
      type: {
        summary:
          'Set an object with icon, size, label and styles inside props as the secondary header button.',
      },
      category: 'Props',
    },
  },
  'sidePanelList:onSelect': {
    control: {type: 'array'},
    defaultValue: [],
    table: {
      type: {
        summary: 'emit event when selecting an item from left panel list.',
      },
      category: 'Events',
    },
  },
  'side-panel:onToggle': {
    control: {type: 'array'},
    defaultValue: [],
    table: {
      type: {
        summary: 'emit event when clicking on toggle button of side panel.',
      },
      category: 'Events',
    },
  },
  'sidePanelList:onHeaderBtnClick': {
    control: {type: 'array'},
    defaultValue: [],
    table: {
      type: {summary: 'emit event when clicking on left panel header button.'},
      category: 'Events',
    },
  },
  'sidePanelList:onHeaderSecondaryBtnClick': {
    control: {type: 'array'},
    defaultValue: [],
    table: {
      type: {
        summary:
          'emit event when clicking on left panel header secondaryButton',
      },
      category: 'Events',
    },
  },
};

export const TableSidebarWithIcons = Template.bind({});
TableSidebarWithIcons.args = {
  headerVisible: true,
  bodyVisible: false,
  listVisible: true,
  sidePanelList: [
    {
      id: 1,
      label: 'All Reports',
      iconName: 'oxd-all-reports',
    },
    {
      id: 2,
      label: 'Standard Reports',
      iconName: 'oxd-standard-reports',
    },
    {
      id: 3,
      label: 'My Reports',
      iconName: 'oxd-my-reports',
    },
  ],
  buttonInfo: {
    props: {
      label: 'New Report',
      displayType: 'secondary',
      size: 'long',
      iconName: 'oxd-add',
    },
  },
};
