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

import {h, ref} from 'vue';
import ColorInput from '@ohrm/oxd/core/components/Input/Color/ColorInput.vue';

export default {
  title: 'Example/ColorInput',
  component: ColorInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = (args) => ({
  setup() {
    const selected = ref(args.value ?? null);
    return {args, selected};
  },
  render() {
    return h(ColorInput, {
      ...this.args,
      modelValue: this.selected,
      'onUpdate:modelValue': (value) => {
        this.selected = value;
      },
    });
  },
});

export const Default = Template.bind({});
Default.args = {
  value: '#ff0000',
};

export const Left = Template.bind({});
Left.args = {
  value: null,
  dropdownPosition: 'left',
  style: {
    marginLeft: 'auto',
  },
};
