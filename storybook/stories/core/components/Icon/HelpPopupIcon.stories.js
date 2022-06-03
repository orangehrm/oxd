import HelpPopupIcon from '@orangehrm/oxd/core/components/Icon/HelpPopupIcon.vue'
import {BOTTOM_RIGHT, HELP_POSITIONS} from '@orangehrm/oxd/core/components/Icon/types';

export default {
  title: 'Information/Icon/Help Popup',
  component: HelpPopupIcon,
  argTypes: {
    helpPosition: {
      control: {type: 'select', options: HELP_POSITIONS},
      defaultValue: BOTTOM_RIGHT,
    },
  },
  decorators: [() => ({ template: '<div style="margin-left: 15em; margin-top:3em"><story/></div>' })],
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-help-popup-icon': HelpPopupIcon},
  template: '<oxd-help-popup-icon v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  helpText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
};
