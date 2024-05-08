import LinearProgress from '@orangehrm/oxd/core/components/LinearProgress/LinearProgress.vue';

export default {
  title: 'Information/LinearProgress',
  component: LinearProgress,
  argTypes: {
    progressValue: {
      control: {type: 'number'},
      table: {
        type: {summary: 'Progress valus as a percentage'},
      },
      defaultValue: 0
    },
    showPercentageValue: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Whether to show the percentage value or not'},
      },
      defaultValue: false
    },
    progressBarHeight: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Height of the progress bar'},
      },
      defaultValue: '8px'
    },
    progressBarFillColor: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Fill color of the progress bar'},
      },
    },
    progressBarBackgroundColor: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Background color of the progress bar'},
      },
    },
    progressPercentageValueStyles: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Custom style object for the percenage value'},
      },
    }
  }}

  const Template = (args) => ({
    setup() {
      return {args};
    },
    components: {'oxd-linear-progress': LinearProgress},
    template: '<oxd-linear-progress v-bind="args"> </oxd-linear-progress>',
  });
  
  export const Default = Template.bind({});
  Default.parameters = {
    docs: {
      source: {
        code: '<oxd-linear-progress/>',
      },
    },
  };
  
  export const CustomProgressValue = Template.bind({});
  CustomProgressValue.args = {
    progressValue: 20,
  };
  CustomProgressValue.parameters = {
    docs: {
      source: {
        code: '<oxd-progress-circle :progressValue=20/>',
      },
    },
  };
  
  export const ShowPercentageValue = Template.bind({});
  ShowPercentageValue.args = {
    progressValue: 55,
    showPercentageValue: true,
  };
  ShowPercentageValue.parameters = {
    docs: {
      source: {
        code: '<oxd-progress-circle :progressValue=55 :showPercentageValue=true />',
      },
    },
  };
  export const CustomProgressBarStyles = Template.bind({});
  CustomProgressBarStyles.args = {
    progressValue: 55,
    showPercentageValue: true,
    progressBarHeight: '20px',
    progressBarFillColor: '#17a954',
    progressBarBackgroundColor: '#ff7b1d',
    progressPercentageValueStyles: {
      'font-size': '15px',
      'color': '#eb0910'
    }
  };
  CustomProgressBarStyles.parameters = {
    docs: {
      source: {
        code: '<oxd-progress-circle :progressValue=55 :showPercentageValue=true :progressBarHeight="20px"/>',
      },
    },
  };


