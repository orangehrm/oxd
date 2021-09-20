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
 
import CellActions from '@orangehrm/oxd/core/components/CardTable/Cell/Actions';

export default {
  title: 'Example/CardTable/Cell',
  argTypes: {onClick: {action: 'clicked'}},
};

const Template = args => ({
  setup() {
    return {args};
  },
  provide: {tableProps: {}},
  components: {'oxd-table-cell-actions': CellActions},
  template: '<oxd-table-cell-actions v-bind="args" />',
});

export const Actions = Template.bind({});
Actions.args = {
  rowItem: {id: 1, col1: 'Test'},
  item: {
    delete: {
      component: 'oxd-icon-button',
      props: {
        name: 'trash',
      },
      onClick(item) {
        console.log(item);
      },
    },
    edit: {
      props: {
        name: 'pencil-fill',
      },
    },
  },
};
