import CardTableStory from './CardTable.story.vue';
import CardTableSlots from './CardTableSlots.story.vue';
import ActionCardTable from './ActionCardTable.story.vue';
import SortableCardTable from './SortableCardTable.story.vue';
import CardTableJobs from './CardTableJobs.story.vue';
import CardTableRowOptions from './CardTableRowOptions.story.vue';
import CardTableLeavelist from './CardTableLeavelist.story.vue';
import CardTableLeavelistAlt from './CardTableLeavelistAlt.story.vue';

export default {
  title: 'Example/CardTable',
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
export const LeaveListExample2 = () => CardTableLeavelistAlt;

const RowOptionsTemplate = args => ({
  setup() {
    return {args};
  },
  components: {CardTableRowOptions},
  template: '<CardTableRowOptions v-bind="args" />',
});

export const RowOptions = RowOptionsTemplate.bind({});
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
