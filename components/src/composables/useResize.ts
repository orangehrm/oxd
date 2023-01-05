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

import {nextTick, onBeforeUnmount, onMounted, reactive, Ref, toRefs} from 'vue';

export interface State {
  width: number;
  height: number;
}

export default function useResize(
  domElem: Ref<HTMLElement | null | undefined>,
) {
  const state: State = reactive({
    width: 0,
    height: 0,
  });

  const setElementSize = () => {
    state.width = domElem.value?.clientWidth || 0;
    state.height = domElem.value?.clientHeight || 0;
  };

  onMounted(async () => {
    await nextTick();
    setElementSize();
    window.addEventListener('resize', setElementSize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', setElementSize);
  });

  return {
    ...toRefs(state),
  };
}
