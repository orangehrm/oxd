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
