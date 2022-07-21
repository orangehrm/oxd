import SegmentsStory from './Segments.story.vue';

export default {
  title: 'Inputs/Segments',
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-segments-story': SegmentsStory},
  template: '<oxd-segments-story v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  options: [
    {
      id: 1,
      label: 'Single Assign',
    },
    {
      id: 2,
      label: 'Bulk Assign',
    },
  ],
};
