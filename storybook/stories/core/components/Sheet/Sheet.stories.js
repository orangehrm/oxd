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
 
import Sheet from '@orangehrm/oxd/core/components/Sheet/Sheet';
import {TYPES} from '@orangehrm/oxd/core/components/Sheet/types';
import SheetWithGuttersStory from './SheetWithGutters.story.vue';
import SheetWithBackgroundStory from './SheetWithBackground.story.vue';

export default {
  title: 'Example/Sheet',
  component: Sheet,
  argTypes: {
    type: {
      control: {type: 'select', options: TYPES},
    },
    rounded: {
      control: {type: 'boolean'},
    },
    gutters: {
      control: {type: 'boolean'},
    },
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-sheet': Sheet},
  template: '<oxd-sheet v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  type: 'gray',
  rounded: true,
  style: {
    width: '400px',
    height: '300px',
  },
};

export const SheetWithGutters = () => SheetWithGuttersStory;
SheetWithGutters.args = {
  type: 'gray-lighten-2',
  rounded: true,
  gutters: true,
};

export const SheetWithBackground = () => SheetWithBackgroundStory;
SheetWithBackground.args = {
  rounded: true,
};
