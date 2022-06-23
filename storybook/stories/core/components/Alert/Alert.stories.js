import Alert from '@orangehrm/oxd/core/components/Alert/Alert';
import Button from '@orangehrm/oxd/core/components/Button/Button';
import {TYPES, TYPE_WARN, TYPE_SUCCESS} from '@orangehrm/oxd/core/components/Alert/types';
import icons from 'bootstrap-icons/font/bootstrap-icons.json';
import oxdIcons from '@orangehrm/oxd/core/components/Icon/icons'
const bootstrapIconsNames = Object.keys(icons)
const oxdIconsNames = Object.keys(oxdIcons)
const iconNames = [...bootstrapIconsNames, ...oxdIconsNames]

import AlertContainer from './AlertContainer';

export default {
  title: 'Information/Alert',
  component: Alert,
  argTypes: {
    default: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Slot content. Typically used to add buttons'}
      },
    },
    type: {
      control: {type: 'select', options: TYPES},
      table: {
        type: {summary: 'Select alert type. Decides the color of the alert and the icon (unless a custom icon is given)'},
      },
    },
    message: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Message to show in the alert'}
      },
    },
    icon: {
      control: {type: 'select', options: iconNames},
      table: {
        type: {summary: 'Icon. If not given, icon is selected based on alert type'}
      },
    },
    show: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Whether to show the alert or not'},
      },
    },
    compact: {
      control: {type: 'boolean'},
      table: {
        type: {summary: `Compact alert, which is shorter and has a smaller border radius. ` +
          `Can be used inside a model, and when only the icon and message are there, but no buttons'`},
      },
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
  template: `<oxd-alert v-bind="args"><template v-if="${'default' in args}" v-slot>${args.default}</template></oxd-alert>`,
});

export const Default = Template.bind({});
Default.args = {
  show: true,
  type: TYPE_SUCCESS,
  message: 'Are you sure you want to continue?',
  compact: false,
  default: `<oxd-button size="medium" displayType="ghost" label="No, Cancel"/><oxd-button size="medium" displayType="secondary" label="Yes, Delete"/>`
};

Default.parameters = {
  docs: {
    source: {
      code: `<oxd-alert :show="true" type="success" message="Are you sure you want to continue?">
  <oxd-button size="medium" displayType="ghost" label="No, Cancel"/>
  <oxd-button size="medium" displayType="secondary" label="Yes, Delete"/>
</oxd-alert>`
    }
  }
}

export const CompactWithoutButtons = Template.bind({});
CompactWithoutButtons.args = {
  show: true,
  type: TYPE_WARN,
  message: 'Duplicate Leave Request Found!',
  compact: true,
  default: ''
}

CompactWithoutButtons.parameters = {
  docs: {
    source: {
      code: `<oxd-alert :show="true" type="warn" :compact="true" message="Duplicate Leave Request Found!">
</oxd-alert>`
    }
  }
}

export const Container = () => AlertContainer;
