import TableSidebarStory from './TableSidebar.story.vue';
import TableSidebarWithIconsStory from './TableSidebarWithIcons.story.vue';

export default {
  title: 'Data Tables/TableSidebar',
};
const Template = args => ({
  setup() {
    return {args};
  },
  components: {TableSidebarWithIconsStory},
  template: '<TableSidebarWithIconsStory v-bind="args" />',
});
export const TableSidebar = () => TableSidebarStory;

export const TableSidebarWithIcons = Template.bind({});
TableSidebarWithIcons.args = {
  headerVisible: true,
  bodyVisible: false,
  listVisible: true,
  stages: [
    {
      "id": 1,
      "label": "All Reports",
      "iconName": "oxd-all-reports",
    },
    {
      "id": 2,
      "label": "Standard Reports",
      "iconName": "oxd-standard-reports",
    },
    {
      "id": 3,
      "label": "My Reports",
      "iconName": "oxd-my-reports",
    }
  ],
  buttonInfo: {
    "props": {
      "label": "New Report",
      "displayType": "secondary",
      "size": "long",
      iconName: "oxd-add"
    }
  }
};
