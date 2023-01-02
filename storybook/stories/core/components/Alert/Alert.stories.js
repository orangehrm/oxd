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

import Alert from '@ohrm/oxd/core/components/Alert/Alert';
import Button from '@ohrm/oxd/core/components/Button/Button';
import {TYPES} from '@ohrm/oxd/core/components/Alert/types';
import AlertContainer from './AlertContainer';

export default {
  title: 'Example/Alert',
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

const Template = (args) => ({
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
