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

import TreeView from '@ohrm/oxd/core/components/TreeView/TreeView.vue';
import CustomTemplate from './CustomTemplate.vue';

export default {
  title: 'Example/TreeView',
  component: TreeView,
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-tree-view': TreeView},
  template: `<oxd-tree-view v-bind="args"></oxd-tree-view>`,
});

const argTypes = {
  data: {control: {type: 'object'}},
};

export const Default = Template.bind({});
Default.args = {
  data: {
    name: '/',
    children: [
      {name: 'root'},
      {name: 'bin'},
      {name: 'opt'},
      {
        name: 'usr',
        children: [
          {
            name: 'share',
            children: [{name: 'man'}, {name: 'local'}],
          },
          {name: 'bin'},
          {name: 'sbin'},
          {
            name: 'local',
            children: [{name: 'etc'}, {name: 'bin'}],
          },
        ],
      },
      {name: 'etc'},
    ],
  },
};
Default.argTypes = argTypes;

export const withoutAnimation = Template.bind({});
withoutAnimation.args = {
  data: {
    name: '/',
    children: [
      {name: 'root'},
      {name: 'bin'},
      {name: 'opt'},
      {
        name: 'usr',
        children: [
          {
            name: 'share',
            children: [{name: 'man'}, {name: 'local'}],
          },
          {name: 'bin'},
          {name: 'sbin'},
          {
            name: 'local',
            children: [{name: 'etc'}, {name: 'bin'}],
          },
        ],
      },
      {name: 'etc'},
    ],
  },
  animation: '',
};
withoutAnimation.argTypes = argTypes;

export const openNodes = Template.bind({});
openNodes.args = {
  data: {
    name: '/',
    children: [
      {name: 'root'},
      {name: 'bin'},
      {name: 'opt'},
      {
        name: 'usr',
        children: [
          {
            name: 'share',
            children: [{name: 'man'}, {name: 'local'}],
          },
          {name: 'bin'},
          {name: 'sbin'},
          {
            name: 'local',
            children: [{name: 'etc'}, {name: 'bin'}],
          },
        ],
      },
      {name: 'etc'},
    ],
  },
  open: true,
};
openNodes.argTypes = argTypes;

export const CustomTreeview = () => CustomTemplate;
