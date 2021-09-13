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
 
import FileInput from '@orangehrm/oxd/core/components/Input/FileInput';
import {computed, h, ref} from 'vue';

export default {
  title: 'Example/FileInput',
  component: FileInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-file-input': FileInput},
  template: '<oxd-file-input v-bind="args" />',
});

const defaultPic = require('@orangehrm/oxd/assets/images/user-default-400.png');

const SlotTemplate = args => ({
  setup() {
    const file = ref('');
    const imgSrc = computed({
      get: () => {
        if (file.value) {
          return `data:image/jpeg;base64,${file.value}`;
        } else {
          return defaultPic;
        }
      },
    });
    return {args, file, imgSrc};
  },
  render() {
    return h(
      FileInput,
      {
        'onUpdate:modelValue': value => {
          if (value?.base64) {
            this.file = value.base64;
          }
        },
        buttonLabel: this.args.buttonLabel,
        style: this.args.style,
      },
      {
        default: () => {
          return h('img', {
            src: this.imgSrc,
            width: 130,
            height: 130,
            style: {
              margin: '0 auto',
            },
          });
        },
      },
    );
  },
});

export const Default = Template.bind({});
Default.args = {};

export const Colored = Template.bind({});
Colored.args = {
  style: {backgroundColor: 'aliceblue'},
};

export const Error = Template.bind({});
Error.args = {
  hasError: true,
};

export const Labled = Template.bind({});
Labled.args = {
  buttonLabel: 'Browse',
};

export const SlotDemo = SlotTemplate.bind({});
SlotDemo.args = {
  buttonLabel: 'Browse',
  style: {
    width: '8rem',
    height: '8rem',
    'border-radius': '100%',
    overflow: 'hidden',
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
