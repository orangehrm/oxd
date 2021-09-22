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

import {mount} from '@vue/test-utils';
import ActionsCell from '@orangehrm/oxd/core/components/CardTable/Cell/Actions.vue';
import {DEVICE_LG} from '@orangehrm/oxd/composables/useResponsive';

const GLOBAL = {
  provide: {
    tableProps() {
      return {
        items: [],
      };
    },
    screenState() {
      return {
        screenType: DEVICE_LG,
      };
    },
  },
};

describe('CardTable > Cell > Actions.vue', () => {
  it('should renders OXD CardTable > Cell > Actions', () => {
    const wrapper = mount(ActionsCell, {
      global: GLOBAL,
      props: {
        item: {
          delete: {
            component: 'oxd-icon-button',
            props: {
              name: 'trash',
            },
          },
          edit: {
            props: {
              name: 'pencil-fill',
            },
          },
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
