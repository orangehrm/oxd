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
import DefaultCardContainer from '@orangehrm/oxd/core/components/CardTable/Decorator/DefaultCardContainer.vue';
import DefaultCardMobile from '@orangehrm/oxd/core/components/CardTable/Decorator/DefaultCardMobile.vue';
import DefaultCardWeb from '@orangehrm/oxd/core/components/CardTable/Decorator/DefaultCardWeb.vue';
import {DEVICE_LG, DEVICE_MD} from '@orangehrm/oxd/composables/useResponsive';

describe('CardTable > Decorator > DefaultCardContainer.vue', () => {
  it('should renders DefaultCardWeb on screen LG, XL', async () => {
    const wrapper = mount(DefaultCardContainer, {
      global: {
        provide: {
          tableProps: {
            items: [],
          },
          screenState: {
            screenType: DEVICE_LG,
          },
        },
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(DefaultCardWeb).exists()).toBeTruthy();
  });

  it('should renders DefaultCardMobile on screen XS, SM, MD', async () => {
    const wrapper = mount(DefaultCardContainer, {
      global: {
        provide: {
          tableProps: {
            items: [],
          },
          screenState: {
            screenType: DEVICE_MD,
          },
        },
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(DefaultCardMobile).exists()).toBeTruthy();
  });
});
