import Sheet from '@orangehrm/oxd/core/components/Sheet/Sheet';
import {TYPES} from '@orangehrm/oxd/core/components/Sheet/types';
import SheetWithGuttersStory from './SheetWithGutters.story.vue';
import SheetWithBackgroundStory from './SheetWithBackground.story.vue';

export default {
  title: 'Layout/Sheet',
  component: Sheet,
  argTypes: {
    type: {
      control: {type: 'select', options: TYPES},
    },
    rounded: {
      control: {type: 'boolean'},
    },
    gutters: {
      control: {type: 'boolean'},
    },
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-sheet': Sheet},
  template: '<oxd-sheet v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  type: 'gray',
  rounded: true,
  style: {
    width: '400px',
    height: '300px',
  },
};

export const SheetWithGutters = () => SheetWithGuttersStory;
SheetWithGutters.args = {
  type: 'gray-lighten-2',
  rounded: true,
  gutters: true,
};

export const SheetWithBackground = () => SheetWithBackgroundStory;
SheetWithBackground.args = {
  rounded: true,
};
