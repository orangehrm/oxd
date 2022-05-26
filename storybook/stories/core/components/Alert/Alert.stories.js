import Alert from '@orangehrm/oxd/core/components/Alert/Alert';
import Button from '@orangehrm/oxd/core/components/Button/Button';
import {TYPES} from '@orangehrm/oxd/core/components/Alert/types';
import AlertContainer from './AlertContainer';

export default {
  title: 'Information/Alert',
  component: Alert,
  argTypes: {
    type: {
      control: {type: 'select', options: TYPES},
    },
    show: {
      control: {type: 'boolean'},
    },
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {
    'oxd-alert': Alert,
    'oxd-button': Button,
  },
  template: `<oxd-alert v-bind="args">
  <oxd-button size="medium" displayType="ghost" label="No, Cancel"/>
  <oxd-button size="medium" displayType="secondary" label="Yes, Delete"/>
  </oxd-alert>`,
});

export const Default = Template.bind({});
Default.args = {
  show: true,
  type: 'success',
  message: 'Are you sure you want to continue?',
};

export const Container = () => AlertContainer;
