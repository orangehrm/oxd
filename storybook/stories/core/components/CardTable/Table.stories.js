import CardTableStory from './CardTable.story.vue';
import CardTableSlots from './CardTableSlots.story.vue';
import ActionCardTable from './ActionCardTable.story.vue';
import SortableCardTable from './SortableCardTable.story.vue';
import CardTableJobs from './CardTableJobs.story.vue';

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
};

export const TableSlots = () => CardTableSlots;
export const ActionTable = () => ActionCardTable;
export const SortableTable = () => SortableCardTable;
export const JobTitleExample = () => CardTableJobs;
