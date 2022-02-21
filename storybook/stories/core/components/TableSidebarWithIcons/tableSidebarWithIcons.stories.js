import TableSidebarWithIconsStory from './TableSidebarWithIcons.story.vue';

export default {
  title: 'Example/TableSidebarWithIcons',
};
const Template = args => ({
  setup() {
    return {args};
  },
  components: {TableSidebarWithIconsStory},
  template: '<TableSidebarWithIconsStory v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};

