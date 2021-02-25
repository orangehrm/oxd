import Icon from '@orangehrm/oxd/core/components/Icon/Icon';
import icons from 'bootstrap-icons/font/bootstrap-icons.json';

export default {
  title: 'Example/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: {type: 'select', options: Object.keys(icons)},
    },
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-icon': Icon},
  template: '<oxd-icon v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  name: 'trash',
};
