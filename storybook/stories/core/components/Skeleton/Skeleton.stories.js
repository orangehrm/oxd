import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';
import CustomSkeletonStory from './CustomSkeleton.story.vue';

export default {
  title: 'Panels/Skeleton',
  component: Skeleton,
  argTypes: {
    animate: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Whether to show animation'},
      },
    },
    circle: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Whether to show as circle'},
      },
    },
    width: {
      control: {type: 'number'},
      table: {
        type: {summary: 'Set the width of skeleton element'},
      },
    },
    height: {
      control: {type: 'number'},
      table: {
        type: {summary: 'Set the height of skeleton element'},
      },
    },
    lines: {
      control: {type: 'number'},
      defaultValue: 1,
      table: {
        type: {summary: 'Set the number of repetitions'},
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-skeleton': Skeleton},
  template: '<oxd-skeleton v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  width: 100,
  height: 100,
};

export const Animate = Template.bind({});
Animate.args = {
  width: 100,
  height: 100,
  animate: true,
};

export const Circle = Template.bind({});
Circle.args = {
  width: 100,
  height: 100,
  circle: true,
  animate: true,
};

export const Custom = () => CustomSkeletonStory;
