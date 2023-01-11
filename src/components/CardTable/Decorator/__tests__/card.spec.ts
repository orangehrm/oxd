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
import {describe, it, expect} from 'vitest';
import {DEVICE_LG, DEVICE_MD} from '@/composables/useResponsive';
import {tablePropsKey, tableScreenStateKey} from '@/composables/useCardtable';
import DefaultCardWeb from '@/components/CardTable/Decorator/DefaultCardWeb.vue';
import DefaultCardMobile from '@/components/CardTable/Decorator/DefaultCardMobile.vue';
import DefaultCardContainer from '@/components/CardTable/Decorator/DefaultCardContainer.vue';

describe('CardTable > Decorator > DefaultCardContainer.vue', () => {
  it('should renders DefaultCardWeb on screen LG, XL', async () => {
    const wrapper = mount(DefaultCardContainer, {
      global: {
        provide: {
          [tablePropsKey as symbol]: {
            items: [],
          },
          [tableScreenStateKey as symbol]: {
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
          [tablePropsKey as symbol]: {
            items: [],
          },
          [tableScreenStateKey as symbol]: {
            screenType: DEVICE_MD,
          },
        },
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(DefaultCardMobile).exists()).toBeTruthy();
  });
});
