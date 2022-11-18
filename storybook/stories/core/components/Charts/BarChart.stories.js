import BarChart from '@orangehrm/oxd/core/components/Chart/BarChart';

export default {
  title: 'Example/Charts/Bar',
  component: BarChart,
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-bar-chart': BarChart},
  template: '<oxd-bar-chart v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  width: '400px',
  height: '400px',
  responsive: false,
  title: 'Bar Chart',
  data: [
    {value: 55, label: 'Cheese', color: 'red'},
    {value: 20, label: 'Ham', color: 'blue'},
    {value: 80, label: 'Bacon', color: 'green'},
    {value: 10, label: 'Taco', color: 'purple'},
    {value: 300, label: 'Butter', color: 'orange'},
  ],
};
