import PieChart from '@orangehrm/oxd/core/components/Chart/PieChart';

export default {
  title: 'Example/Charts/Pie',
  component: PieChart,
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-pie-chart': PieChart},
  template: '<oxd-pie-chart v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  width: '400px',
  height: '400px',
  responsive: false,
  title: 'Pie Chart',
  cutout: '50%',
  legend: {
    display: false,
  },
  tooltip: {
    enabled: false,
  },
  data: [
    {
      value: 55,
      label: 'Cheese',
      color: 'red',
    },
    {
      value: 20,
      label: 'Ham',
      color: 'blue',
    },
    {
      value: 80,
      label: 'Bacon',
      color: 'green',
    },
    {
      value: 10,
      label: 'Taco',
      color: 'purple',
    },
    {
      value: 300,
      label: 'Butter',
      color: 'orange',
    },
  ],
};

export const HideBorderWidth = Template.bind({});
HideBorderWidth.args = {
  width: '400px',
  height: '400px',
  responsive: false,
  title: 'Pie Chart',
  data: [
    {value: 80, label: 'Bacon', color: 'green'},
    {value: 10, label: 'Taco', color: 'purple'},
    {value: 300, label: 'Butter', color: 'orange'},
  ],
};
