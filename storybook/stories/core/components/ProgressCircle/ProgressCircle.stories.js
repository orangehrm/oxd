import ProgressCircle from '@orangehrm/oxd/core/components/ProgressCircle/ProgressCircle.vue';

export default {
  title: 'Information/ProgressCircle',
  component: ProgressCircle,
  argTypes: {
    strokeWidth: {
      control: {type: 'number'},
      table: {
        type: {summary: 'Width of the stroke around the circle'},
      },
    },
    rotation: {
      control: {type: 'number'},
      table: {
        type: {summary: 'Rotation angle in degrees'},
      },
    },
    radius: {
      control: {type: 'number'},
      table: {
        type: {summary: 'Radius of the circle'},
      },
    },
    value: {
      control: {type: 'number'},
      table: {
        type: {summary: 'Percentage value that should be filled'},
      },
    },
    animation: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Stroke should be animated or not'},
      },
    },
    roundCorners: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Corners of the stroke should be rounded or not'},
      },
    },
    strokeBackgroundColor: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Stroke color of the empty area'},
      },
    },
    strokeFillColor: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Stroke color of the filled area'},
      },
    },
    progressCircleInnerContent: {
      control: {type: 'object'},
      table: {
        type: {
          summary:
            'The slot which defines the content inside the progress circle',
        },
      },
    },
    progressCircleBottomContent: {
      control: {type: 'object'},
      table: {
        type: {
          summary:
            'The slot which defines the bottom content of the progress circle',
        },
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-progress-circle': ProgressCircle},
  template: '<oxd-progress-circle v-bind="args"> </oxd-progress-circle>',
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    source: {
      code: '<oxd-progress-circle/>',
    },
  },
};

export const CustomValue = Template.bind({});
CustomValue.args = {
  value: 60,
};
CustomValue.parameters = {
  docs: {
    source: {
      code: '<oxd-progress-circle :value=60/>',
    },
  },
};

export const CustomStrokeWidth = Template.bind({});
CustomStrokeWidth.args = {
  strokeWidth: 5,
  value: 60,
};
CustomStrokeWidth.parameters = {
  docs: {
    source: {
      code: '<oxd-progress-circle :strokeWidth=5 :value=60 />',
    },
  },
};

export const CustomRotationAngle = Template.bind({});
CustomRotationAngle.args = {
  rotation: 180,
  value: 60,
};
CustomRotationAngle.parameters = {
  docs: {
    source: {
      code: '<oxd-progress-circle :rotation=180 :value=60 />',
    },
  },
};

export const CustomRadius = Template.bind({});
CustomRadius.args = {
  radius: 80,
  value: 60,
};
CustomRadius.parameters = {
  docs: {
    source: {
      code: '<oxd-progress-circle :radius=80 :value=60 />',
    },
  },
};

export const WithoutAnimation = Template.bind({});
WithoutAnimation.args = {
  animation: false,
  value: 60,
};
WithoutAnimation.parameters = {
  docs: {
    source: {
      code: '<oxd-progress-circle :animation=false :value=60 />',
    },
  },
};

export const SquareCorners = Template.bind({});
SquareCorners.args = {
  roundCorners: false,
  value: 60,
};
SquareCorners.parameters = {
  docs: {
    source: {
      code: '<oxd-progress-circle :roundCorners=false :value=60 />',
    },
  },
};

export const CustomStrokeColorEmptyArea = Template.bind({});
CustomStrokeColorEmptyArea.args = {
  strokeBackgroundColor: 'blue',
  value: 60,
};
CustomStrokeColorEmptyArea.parameters = {
  docs: {
    source: {
      code: '<oxd-progress-circle :strokeBackgroundColor="blue" :value=60 />',
    },
  },
};

export const CustomStrokeColorFilledArea = Template.bind({});
CustomStrokeColorFilledArea.args = {
  strokeFillColor: 'green',
  value: 60,
};
CustomStrokeColorFilledArea.parameters = {
  docs: {
    source: {
      code: '<oxd-progress-circle :strokeFillColor="green" :value=60 />',
    },
  },
};

const CustomInnerSlotTemplate = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-progress-circle': ProgressCircle},
  template:
    '<oxd-progress-circle v-bind="args"> <template #progressCircleInnerContent><div> Slot </div></template> </oxd-progress-circle>',
});

export const CustomInnerSlot = CustomInnerSlotTemplate.bind({});
CustomInnerSlot.args = {};
CustomInnerSlot.parameters = {
  docs: {
    source: {
      code: '<oxd-progress-circle><template #progressCircleInnerContent><div> Slot </div></template></oxd-progress-circle>',
    },
  },
};

const CustomBottomSlotTemplate = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-progress-circle': ProgressCircle},
  template:
    '<oxd-progress-circle v-bind="args"> <template #progressCircleBottomContent><div> Bottom Content Comes here! </div></template> </oxd-progress-circle>',
});

export const CustomBottomSlot = CustomBottomSlotTemplate.bind({});
CustomBottomSlot.args = {};
CustomBottomSlot.parameters = {
  docs: {
    source: {
      code: '<oxd-progress-circle><template #progressCircleBottomContent><div> Bottom Content Comes here! </div></template></oxd-progress-circle>',
    },
  },
};
