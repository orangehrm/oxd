import Pagination from '@orangehrm/oxd/core/components/Pagination/Pagination';

export default {
  title: 'Example/Pagination',
  component: Pagination,
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      current: 2,
    };
  },
  components: {'oxd-pagination': Pagination},
  template:
    '<div>Current page: {{current}} </div><oxd-pagination :length="length" v-model:current="current" :max="max" />',
});

export const Default = Template.bind({});
Default.args = {
  length: 3,
  max: 6,
};

// export const Colored = Template.bind({});
// Colored.args = {
//   value: 'Textarea',
//   style: {backgroundColor: 'aliceblue'},
// };

// export const Error = Template.bind({});
// Error.args = {
//   value: 'Textarea',
//   hasError: true,
// };
