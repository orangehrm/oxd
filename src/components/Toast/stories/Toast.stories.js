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

import {TYPES} from '@/components/Toast/types';
import Toast from '@/components/Toast/Toast.vue';
import ToastAnimation from './ToastAnimation.story.vue';

export default {
  title: 'Example/Toast/Toast',
  component: Toast,
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
  components: {'oxd-toast': Toast},
  template: `<oxd-toast v-bind="args" />`,
});

export const Default = Template.bind({});
Default.args = {
  show: true,
  type: 'success',
  title: 'Lorem Ipsum',
  message: `Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. Lorem Ipsum has been the industry's standard dummy text ever
  since the 1500s, when an unknown printer took a galley of type and
  scrambled it to make a type specimen book. It has survived not only five
  centuries, but also the leap into electronic typesetting, remaining
  essentially unchanged. It was popularised in the 1960s with the release of
  Letraset sheets containing Lorem Ipsum passages, and more recently with
  desktop publishing software like Aldus PageMaker including versions of
  Lorem Ipsum.`,
};

export const Animation = () => ToastAnimation;
