import GlassButton from '@/components/Button/GlassButton.vue';
import {GLASS_ICON_TYPES, TYPE_GLASS_VIDEO} from '@/components/Button/types';

export default {
  title: 'Example/Button/GlassButton',
  component: GlassButton,
  argTypes: {
    icon: {
      options: GLASS_ICON_TYPES,
      control: {type: 'select'},
    },
    style: {control: {type: 'object'}},
    disabled: {control: {type: 'boolean'}},
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-glass-button': GlassButton},
  template: '<oxd-glass-button v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  label: 'Share Video',
  icon: TYPE_GLASS_VIDEO,
};
