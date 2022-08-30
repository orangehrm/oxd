import BulletPoints from '@orangehrm/oxd/core/components/BulletPoints/BulletPoints.vue';

export default {
  title: 'Layout/BulletPoints',
  component: BulletPoints,
  argTypes: {
    list: {
      control: {type: 'array'},
      table: {
        type: {
          summary:
            'This is an array of ListItem objects. "id" and the "name" is mandatory,"styles" can be used to  override the styles of bullet points',
        },
      },
    },
    lineColor: {
      control: {type: 'text'},
      table: {
        type: {
          summary:
            'Custom color that can be defined for the vertical line',
        },
      }
    }
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-bullet-points': BulletPoints},
  template:
    '<oxd-bullet-points v-bind="args"> <template #1> <div> Item 1 </div> </template> <template #2> <div> Item 2 </div> </template> <template #3> <div> Item 3 </div> </template> </oxd-bullet-points>',
});

const bulletPointsDefault = [
  {id: '1', name: 'item_1'},
  {id: '2', name: 'item_2'},
  {id: '3', name: 'item_3'},
];

export const Default = Template.bind({});
Default.args = {
  list: bulletPointsDefault,
};

Default.parameters = {
  docs: {
    source: {
      code:
        '<oxd-bullet-points \n :list=' +
        JSON.stringify(bulletPointsDefault) +
        '\n/>',
    },
  },
};

const singleBulletPoint = [{id: '1', name: 'item_1'}];
export const SingleBulletPoint = Template.bind({});
SingleBulletPoint.args = {
  list: singleBulletPoint,
};

SingleBulletPoint.parameters = {
  docs: {
    source: {
      code:
        '<oxd-bullet-points \n :list=' +
        JSON.stringify(singleBulletPoint) +
        '\n/>',
    },
  },
};

const bulletPointsColoured = [
  {id: '1', name: 'item_1', styles: {backgroundColor: 'red'}},
  {id: '2', name: 'item_2'},
  {id: '3', name: 'item_3', styles: {backgroundColor: 'green'}},
];
export const ColouredBulletPoints = Template.bind({});
ColouredBulletPoints.args = {
  list: bulletPointsColoured,
};

ColouredBulletPoints.parameters = {
  docs: {
    source: {
      code:
        '<oxd-bullet-points \n :list=' +
        JSON.stringify(bulletPointsColoured) +
        '\n/>',
    },
  },
};

const bulletPointsSameColoured = [
  {id: '1', name: 'item_1', styles: {backgroundColor: 'red'}},
  {id: '2', name: 'item_2', styles: {backgroundColor: 'red'}},
  {id: '3', name: 'item_3', styles: {backgroundColor: 'red'}},
];
export const ColouredVerticalLine = Template.bind({});
ColouredVerticalLine.args = {
  list: bulletPointsSameColoured,
  lineColor: 'red',
};

ColouredVerticalLine.parameters = {
  docs: {
    source: {
      code:
        '<oxd-bullet-points \n :list=' +
        JSON.stringify(bulletPointsSameColoured) +
        '\n :lineColor: "red"/>' +
        '\n/>',
    },
  },
};
