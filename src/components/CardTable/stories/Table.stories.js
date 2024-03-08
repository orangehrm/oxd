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

import CardTableStory from './CardTable.story.vue';
import CardTableJobs from './CardTableJobs.story.vue';
import CardTableSlots from './CardTableSlots.story.vue';
import ActionCardTable from './ActionCardTable.story.vue';
import SortableCardTable from './SortableCardTable.story.vue';
import CardTableLeavelist from './CardTableLeavelist.story.vue';
import CardTableRowOptions from './CardTableRowOptions.story.vue';
import CardTableLeavelistAlt from './CardTableLeavelistAlt.story.vue';
import CardTableLangStringList from './CardTableLangStringList.story.vue';

export default {
  title: 'Example/CardTable',
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {CardTableStory},
  template: '<CardTableStory v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  selectable: true,
  disabled: false,
};

export const TableSlots = () => CardTableSlots;
export const ActionTable = () => ActionCardTable;
export const SortableTable = () => SortableCardTable;
export const JobTitleExample = () => CardTableJobs;
export const LeaveListExample = () => CardTableLeavelist;
export const LeaveListExample2 = () => CardTableLeavelistAlt;
export const LanguagePackageEdit = () => CardTableLangStringList;

const RowOptionsTemplate = (args) => ({
  setup() {
    return {args};
  },
  components: {CardTableRowOptions},
  template: '<CardTableRowOptions v-bind="args" />',
});

export const RowOptions = RowOptionsTemplate.bind({});
RowOptions.args = {
  selectable: true,
  disabled: false,
  loading: false,
  clickable: false,
  items: [
    {col1: 'Data 1', col2: 'Data 2', isSelectable: false, isDisabled: false},
    {col1: 'Data 2', col2: 'Data 2', isSelectable: true, isDisabled: false},
  ],
};
