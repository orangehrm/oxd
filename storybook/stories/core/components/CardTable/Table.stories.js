import CardTableStory from './CardTable.story.vue';
import CardTableSlots from './CardTableSlots.story.vue';
import ActionCardTable from './ActionCardTable.story.vue';
import SortableCardTable from './SortableCardTable.story.vue';
import CardTableJobs from './CardTableJobs.story.vue';
import CardTableRowOptions from './CardTableRowOptions.story.vue';
import CardTableLeavelist from './CardTableLeavelist.story.vue';
import CardTableHighlight from './CardTableHighlight.story.vue';
import CardTableIconHeaders from './CardTableIconHeaders.story.vue';

import candidateAvatars from './../List/candidate-avatars.json'

export default {
  title: 'Data Tables/CardTable',
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {CardTableStory},
  template: '<CardTableStory v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  selectable: true,
  disabled: false,
};

export const TableSlots = () => CardTableSlots;
export const ActionTable = () => ActionCardTable;
export const SortableTable = () => SortableCardTable;
export const JobTitleExample = () => CardTableJobs;
export const LeaveListExample = () => CardTableLeavelist;

const RowOptionsTemplate = args => ({
  setup() {
    return {args};
  },
  components: {CardTableRowOptions},
  template: '<CardTableRowOptions v-bind="args" />',
});

const HighlightTemplate = args => ({
  setup() {
    return {args};
  },
  components: {CardTableHighlight},
  template: '<CardTableHighlight v-bind="args" />',
});

const IconHeadersTemplate = args => ({
  setup() {
    return {args};
  },
  components: {CardTableIconHeaders},
  template: '<CardTableIconHeaders v-bind="args" />',
});

export const RowOptions = RowOptionsTemplate.bind({});

export const HighlightExample = HighlightTemplate.bind({});

export const IconHeadersExample = IconHeadersTemplate.bind({});

RowOptions.args = {
  selectable: true,
  disabled: false,
  loading: false,
  clickable: false,
  items: [
    {col1: 'Data 1', col2: 'Data 2', isSelectable: false, isDisabled: false},
    {col1: 'Data 2', col2: 'Data 2', isSelectable: true, isDisabled: false},
  ],
};

HighlightExample.args = {
  highlightRows: {
    rowIndexes: [0,2],
    type: 'success',
  }
};


IconHeadersExample.args = {
  headers: [
    {
      name: 'profilePic',
      title: 'Column 1',
      iconName: 'oxd-profile-pic',
      iconStyle: 'color: #929baa;',
      sortable: true,
      style: {
        width: '45px',
        'justify-content': 'center'
      },
      cellType: 'oxd-table-cell-profile-pic',
    },
    {
      name: 'col1',
      title: 'Column 1',
      sortable: true,
      style: {
        flex: 1,
        color: '#929baa',
      },
    },
    {
      name: 'col2',
      title: 'Column 2',
      style: {
        flex: 5,
        color: '#929baa',
      },
    },
  ],
  items: [
    {
      profilePic: candidateAvatars.avatars[0],
      col1: 'Data 1',
      col2: 'Data 2',
    },
    {
      profilePic: candidateAvatars.avatars[1],
      col1: 'Data 2',
      col2: 'Data 2',
    },
    {
      profilePic: candidateAvatars.avatars[2],
      col1: 'Data 3',
      col2:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ],
};
