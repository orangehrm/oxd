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

import {nextTick, toRefs} from 'vue';
import {shallowMount} from '@vue/test-utils';
import {describe, it, expect, beforeEach, vi} from 'vitest';
import useResponsive, {DEVICE_XL, DEVICE_XS} from '../useResponsive';

describe('components/src/composables/useResponsive', () => {
  const addEventListener = vi.spyOn(window, 'addEventListener');
  const removeEventListener = vi.spyOn(window, 'removeEventListener');

  beforeEach(() => {
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1080,
    });
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
  });

  it('sets event handler for resize event', async () => {
    shallowMount({
      setup() {
        useResponsive();
      },
      template: '<div></div>',
    });
    await nextTick();
    expect(addEventListener).toHaveBeenCalled();
  });

  it('remove event handler for resize event', async () => {
    shallowMount({
      setup() {
        useResponsive();
      },
      template: '<div></div>',
    }).unmount();
    await nextTick();
    expect(removeEventListener).toHaveBeenCalled();
  });

  it('returns correct window height & width on mount', async () => {
    const wrapper = shallowMount({
      setup() {
        const responsiveState = useResponsive();
        return {
          ...toRefs(responsiveState),
        };
      },
      template: '<div></div>',
    });
    await nextTick();

    expect(wrapper.vm.windowWidth).toStrictEqual(1920);
    expect(wrapper.vm.windowHeight).toStrictEqual(1080);
  });

  it('update window height & width on resize', async () => {
    const wrapper = shallowMount({
      setup() {
        const responsiveState = useResponsive();
        return {
          ...toRefs(responsiveState),
        };
      },
      template: '<div></div>',
    });

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 720,
    });
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1280,
    });
    window.dispatchEvent(new Event('resize'));
    await nextTick();

    expect(wrapper.vm.windowWidth).toStrictEqual(1280);
    expect(wrapper.vm.windowHeight).toStrictEqual(720);
  });

  it('update screen type on resize', async () => {
    const wrapper = shallowMount({
      setup() {
        const responsiveState = useResponsive();
        return {
          ...toRefs(responsiveState),
        };
      },
      template: '<div></div>',
    });
    await nextTick();
    expect(wrapper.vm.screenType).toStrictEqual(DEVICE_XL);

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 320,
    });
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 568,
    });
    window.dispatchEvent(new Event('resize'));
    await nextTick();

    expect(wrapper.vm.screenType).toStrictEqual(DEVICE_XS);
  });
});
