import HelpPopupIcon from 'oxd-components/src/core/components/Icon/HelpPopupIcon.vue'

export default {
  title: 'Example/Icon/HelpPopup',
  component: HelpPopupIcon,
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
