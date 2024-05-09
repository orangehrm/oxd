import Button from '@orangehrm/oxd/core/components/Button/Button';
import {
  SIZES,
  TYPES,
  SIZE_LARGE,
  SIZE_SMALL,
  SIZE_MEDIUM,
  TYPE_MAIN,
  TYPE_SECONDARY,
  TYPE_DANGER,
  TYPE_GHOST,
  TYPE_GHOST_DANGER,
  TYPE_LABEL,
  TYPE_LABEL_FEEDBACK_DANGER,
  TYPE_TEXT,
  TYPE_TOOL,
  TOOLTIP_BOTTOM,
} from '@orangehrm/oxd/core/components/Button/types';
import {
  ICON_SIZES,
  ICON_SIZE_MEDIUM,
} from '@orangehrm/oxd/core/components/Icon/types';
import icons from 'bootstrap-icons/font/bootstrap-icons.json';
import oxdIcons from '@orangehrm/oxd/core/components/Icon/icons';

const bootstrapIconsNames = Object.keys(icons);
const oxdIconsNames = Object.keys(oxdIcons);
const iconNames = [...bootstrapIconsNames, ...oxdIconsNames];

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    size: {
      control: {type: 'select', options: SIZES},
      defaultValue: SIZE_MEDIUM,
    },
    displayType: {
      control: {type: 'select', options: TYPES},
      defaultValue: TYPE_MAIN,
    },
    style: {control: {type: 'object'}},
    disabled: {control: {type: 'boolean'}},
    iconName: {
      control: {type: 'select', options: iconNames},
    },
    iconSize: {
      control: {type: 'select', options: ICON_SIZES},
      defaultValue: ICON_SIZE_MEDIUM,
    },
    iconRightName: {
      control: {type: 'select', options: iconNames},
    },
    iconRightSize: {
      control: {type: 'select', options: ICON_SIZES},
      defaultValue: ICON_SIZE_MEDIUM,
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-button': Button},
  template: '<oxd-button v-bind="args" />',
});

export const Main = Template.bind({});
Main.args = {
  displayType: TYPE_MAIN,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  displayType: TYPE_SECONDARY,
  label: 'Button',
};

export const Ghost = Template.bind({});
Ghost.args = {
  displayType: TYPE_GHOST,
  label: 'Button',
};

export const GhostFeedback = Template.bind({});
GhostFeedback.args = {
  displayType: TYPE_GHOST_DANGER,
  label: 'Button',
};
GhostFeedback.argTypes = {
  displayType: {
    control: {
      type: 'select',
      options: ['ghost-info', 'ghost-danger', 'ghost-warn', 'ghost-success'],
    },
  },
};

export const Feedback = Template.bind({});
Feedback.args = {
  displayType: TYPE_DANGER,
  label: 'Button',
};
Feedback.argTypes = {
  displayType: {
    control: {type: 'select', options: ['info', 'danger', 'warn', 'success']},
  },
};

export const Label = Template.bind({});
Label.args = {
  displayType: TYPE_LABEL,
  label: 'Button',
};
Label.argTypes = {
  displayType: {
    control: {
      type: 'select',
      options: ['label-info', 'label-danger', 'label-warn', 'label-success'],
    },
  },
};

export const LabelFeedback = Template.bind({});
LabelFeedback.args = {
  displayType: TYPE_LABEL_FEEDBACK_DANGER,
  label: 'Button',
};
LabelFeedback.argTypes = {
  displayType: {
    control: {
      type: 'select',
      options: [
        'label-feedback-info',
        'label-feedback-danger',
        'label-feedback-warn',
        'label-feedback-success',
        'label-feedback-reject'
      ],
    },
  },
};

export const Large = Template.bind({});
Large.args = {
  size: SIZE_LARGE,
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: SIZE_SMALL,
  label: 'Button',
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  label: 'Button',
  style: {backgroundColor: 'palegreen'},
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Button',
  disabled: true,
};

export const DisabledWithTooltip = Template.bind({});
DisabledWithTooltip.args = {
  label: 'Button',
  disabled: true,
  disabledTooltip: 'Disabled',
  flow: TOOLTIP_BOTTOM,
};

export const ButtonWithIcon = Template.bind({});
ButtonWithIcon.args = {
  label: 'Button',
  iconName: 'trash',
};

export const ButtonWithIconRight = Template.bind({});
ButtonWithIconRight.args = {
  label: 'Button',
  iconRightName: 'arrow-right',
};

export const Text = Template.bind({});
Text.args = {
  label: 'Button',
  displayType: TYPE_TEXT,
};

export const Tool = Template.bind({});
Tool.args = {
  label: 'Button',
  iconName: 'person-plus',
  displayType: TYPE_TOOL,
};
