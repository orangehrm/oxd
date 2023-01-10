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

import {h, render} from 'vue';
import type {ComponentPublicInstance, ConcreteComponent} from 'vue';
import type {RevoGrid} from '@revolist/revogrid/dist/types/interfaces';
import type {VNode} from '@revolist/revogrid/dist/types/stencil-public-runtime';

interface VueElement extends HTMLElement {
  __vue__?: ComponentPublicInstance;
}

/**
 * Based on https://github.com/revolist/vue-datagrid/blob/next/src/vue-template.tsx
 */
const componentLoader = (
  el: HTMLElement | null,
  vueComponent: string | ConcreteComponent,
  props: RevoGrid.ColumnDataSchemaModel,
) => {
  if (el) {
    let vueNode: VueElement | undefined;
    if (el.childNodes.length > 0) {
      vueNode = el.childNodes[0] as VueElement;
    }
    if (vueNode === undefined) {
      return render(h(vueComponent, props), el);
    } else {
      return vueNode.__vue__ ? vueNode.__vue__ : null;
    }
  }
  return null;
};

/**
 *  Custom cell renderer function as expected in Revo grid
 *  https://revolist.github.io/revogrid/guide/jsx.template.html#jsx-tsx-custom-content-render
 */
const cellTemplateFn = (component: string) => {
  return (
    createElement: RevoGrid.HyperFunc<VNode>,
    column: RevoGrid.ColumnDataSchemaModel,
  ) => {
    // if data inside cell is empty, don't bother mounting Vue elm
    const data = column.model[column.prop];
    if (Array.isArray(data) && data.length === 0) {
      return null;
    } else if (data === '' || data === undefined || data === null) {
      return null;
    }

    return createElement('span', {
      ref: (el: HTMLElement) => componentLoader(el, component, column),
    });
  };
};

export default cellTemplateFn;
