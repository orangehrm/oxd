import Pagination from '@orangehrm/oxd/core/components/Pagination/Pagination';

export default {
  title: 'Data Tables/Pagination',
  component: Pagination,
};

const Template = args => ({
  setup() {
    return {args};
  },
  data() {
    return {
      current: 2,
    };
  },
  components: {'oxd-pagination': Pagination},
  template:
    '<div>Current page: {{current}} </div><oxd-pagination :length="args.length" v-model:current="current" :max="args.max" />',
});

export const Default = Template.bind({});
Default.args = {
  length: 3,
  max: 6,
};
