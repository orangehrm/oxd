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

import {RevoGrid} from '@revolist/revogrid/dist/types/interfaces';
import {VNode} from '@revolist/revogrid/dist/types/stencil-public-runtime';
import {ConcreteComponent, h, render, ComponentPublicInstance} from 'vue';

interface VueElement extends HTMLElement {
  __vue__?: ComponentPublicInstance;
}

/**
 * Based on https://github.com/revolist/vue-datagrid/blob/next/src/vue-template.tsx
 */
const componentLoader = (
  el: VueElement | null,
  vueComponent: string | ConcreteComponent,
  props: RevoGrid.ColumnDataSchemaModel,
) => {
  if (el && !el.__vue__) {
    return render(h(vueComponent, props), el);
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
  ) =>
    createElement('span', {
      ref: (el: HTMLElement) => componentLoader(el, component, column),
    });
};

export default cellTemplateFn;
