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

import ToastContainer from '@/components/Toast/Container.vue';
import {POSITIONS, POSITION_BOTTOM} from '@/components/Toast/types';
import ToastContainerCustomAnimationStory from './ToastContainerCustomAnimation.story.vue';
import ToastContainerCustomWrapperStory from './ToastContainerCustomWrapper.story.vue';

export default {
  title: 'Example/Toast/Container',
  component: ToastContainer,
  argTypes: {
    position: {
      control: {type: 'select', options: POSITIONS},
      defaultValue: POSITION_BOTTOM,
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  data() {
    return {
      toasts: [
        {
          type: 'success',
          title: 'Success',
          message: 'Success message',
          show: true,
        },
        {
          type: 'warn',
          title: 'Warn',
          message: 'Success message',
          show: true,
        },
        {
          type: 'default',
          title: 'Default',
          message: 'Success message',
          show: true,
        },
        {
          type: 'error',
          title: 'Error',
          message: 'Success message',
          show: true,
        },
        {
          type: 'info',
          title: 'Info',
          message: 'Success message',
          show: true,
        },
      ],
    };
  },
  components: {'oxd-toast-container': ToastContainer},
  template: `<oxd-toast-container v-model:toasts="toasts" :position="args.position" />`,
});

export const Default = Template.bind({});

export const CustomAnimation = () => ToastContainerCustomAnimationStory;

export const CustomWrapper = () => ToastContainerCustomWrapperStory;
