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
Default.parameters = {
  docs: {
    source: {
      code: `
<oxd-skeleton :width="100" :height="100" />
    `,
    },
  },
};

export const Animate = Template.bind({});
Animate.args = {
  width: 100,
  height: 100,
  animate: true,
};
Animate.parameters = {
  docs: {
    source: {
      code: `
<oxd-skeleton :width="100" :height="100" :animate="true" />
    `,
    },
  },
};

export const Circle = Template.bind({});
Circle.args = {
  width: 100,
  height: 100,
  circle: true,
  animate: true,
};
Circle.parameters = {
  docs: {
    source: {
      code: `
<oxd-skeleton :width="100" :height="100" :circle="true" :animate="true" />
    `,
    },
  },
};

export const Custom = () => CustomSkeletonStory;
Custom.parameters = {
  docs: {
    source: {
      code: `
<oxd-grid :cols="4">
  <oxd-grid-item v-for="i in 12" :key="i">
    <oxd-skeleton :width="50" :height="50" circle animate />
    <oxd-skeleton :lines="3" animate />
  </oxd-grid-item>
</oxd-grid>
    `,
    },
  },
};
