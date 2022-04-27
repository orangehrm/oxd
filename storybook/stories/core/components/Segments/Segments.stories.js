import SegmentsStory from './Segments.story.vue';
import {nanoid} from 'nanoid';

export default {
  title: 'Example/Segments',
};

const Template = args => ({
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
      id: nanoid(8),
      label: 'Single Assign',
    },
    {
      id: nanoid(8),
      label: 'Bulk Assign',
    },
  ],
};
