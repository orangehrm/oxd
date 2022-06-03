import Icon from '@orangehrm/oxd/core/components/Icon/Icon';
import icons from 'bootstrap-icons/font/bootstrap-icons.json';
import {
  ICON_SIZES,
  ICON_SIZE_MEDIUM,
} from '@orangehrm/oxd/core/components/Icon/types';

import oxdIcons from '@orangehrm/oxd/core/components/Icon/icons'

const bootstrapIconsNames = Object.keys(icons)
const oxdIconsNames = Object.keys(oxdIcons)
const iconNames = [...bootstrapIconsNames, ...oxdIconsNames]

export default {
  title: 'Information/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: {type: 'select', options: iconNames},
    },
    size: {
      control: {type: 'select', options: ICON_SIZES},
      defaultValue: ICON_SIZE_MEDIUM,
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

export const OhrmIcon = Template.bind({});
OhrmIcon.args = {
  name: 'oxd-archive',
};
