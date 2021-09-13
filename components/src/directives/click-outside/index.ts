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

import {Directive, DirectiveBinding} from 'vue';
export type ClickOutsideHandler = (e: Event) => void;
export interface ClickOutsideBindingArgs {
  handler: ClickOutsideHandler;
}
export interface ClickOutsideDirectiveBinding extends DirectiveBinding {
  value: ClickOutsideHandler | ClickOutsideBindingArgs;
}
export interface ClickOutsideHTMLElement extends HTMLElement {
  _clickOutside?: ClickOutsideHandler;
}
const clickOutsideDirective: Directive = {
  beforeMount(
    el: ClickOutsideHTMLElement,
    binding: ClickOutsideDirectiveBinding,
  ) {
    const handler =
      typeof binding.value === 'function'
        ? binding.value
        : binding.value.handler;
    const onClick = (e: Event) => {
      if (!(el == e.target || el.contains(e.target as HTMLInputElement))) {
        if (typeof handler === 'function') {
          handler(e as PointerEvent);
        }
      }
    };
    document.addEventListener('click', onClick, true);
    el._clickOutside = onClick;
  },
  unmounted(el: ClickOutsideHTMLElement) {
    if (!el._clickOutside) return;
    document.removeEventListener('click', el._clickOutside, true);
    delete el._clickOutside;
  },
};
export default clickOutsideDirective;
