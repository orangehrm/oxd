/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */

import Button from '@ohrm/oxd/core/components/Button/Button';
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
  TYPE_LABEL_DANGER,
  TYPE_TEXT,
  TYPE_TOOL,
} from '@ohrm/oxd/core/components/Button/types';

export default {
  title: 'Example/Button',
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
  },
};

const Template = args => ({
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

export const LabelFeedback = Template.bind({});
LabelFeedback.args = {
  displayType: TYPE_LABEL_DANGER,
  label: 'Button',
};
LabelFeedback.argTypes = {
  displayType: {
    control: {
      type: 'select',
      options: ['label-info', 'label-danger', 'label-warn', 'label-success'],
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
