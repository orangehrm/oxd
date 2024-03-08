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

import {
  TAGS,
  TYPE_SUBTITLE_1,
  TYPE_SUBTITLE_2,
  TYPE_CARD_TITLE,
} from '@/components/Text/types';
import Text from '@/components/Text/Text.vue';

export default {
  title: 'Example/Text',
  component: Text,
};

const DUMMY_TEXT = 'Nunito is a well balanced sans serif typeface';

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-text': Text},
  template: `<oxd-text v-bind="args">${DUMMY_TEXT}</oxd-text>`,
});

const argTypes = {
  tag: {
    options: TAGS,
    control: {type: 'select'},
  },
  style: {control: {type: 'object'}},
};

export const Default = Template.bind({});
Default.args = {tag: 'p'};
Default.argTypes = argTypes;

export const Colored = Template.bind({});
Colored.args = {style: {color: 'brown'}};
Colored.argTypes = argTypes;

const TemplateAll = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {'oxd-text': Text},
  template: `<oxd-text tag="h1">${args.label}</oxd-text>
  <oxd-text tag="h2">${args.label}</oxd-text>
  <oxd-text tag="h3">${args.label}</oxd-text>
  <oxd-text tag="h4">${args.label}</oxd-text>
  <oxd-text tag="h5">${args.label}</oxd-text>
  <oxd-text tag="h6">${args.label}</oxd-text>
  <oxd-text>${args.label}</oxd-text>`,
});

export const All = TemplateAll.bind({});
All.args = {
  label: DUMMY_TEXT,
};

export const CardTitle = Template.bind({});
CardTitle.args = {type: TYPE_CARD_TITLE};

export const Subtitle1 = Template.bind({});
Subtitle1.args = {type: TYPE_SUBTITLE_1};

export const Subtitle2 = Template.bind({});
Subtitle2.args = {type: TYPE_SUBTITLE_2};
