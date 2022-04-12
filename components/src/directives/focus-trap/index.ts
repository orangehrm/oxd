import {Directive} from 'vue';

export type TabHandler = (e: KeyboardEvent) => void;

export interface FocusTrapHTMLElement extends HTMLElement {
  activeElement?: Element | null;
  _tabClicking?: TabHandler;
}

const focusableElements = 'input, select, textarea, [tabindex], [href]';
const focusableButtonElements = 'button';

const focusTrapDirective: Directive = {
  mounted(el: FocusTrapHTMLElement) {
    const focusableContent = el.querySelectorAll(
      focusableElements + ', ' + focusableButtonElements,
    );

    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    el._tabClicking = function(e: KeyboardEvent) {
      const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
          (lastFocusableElement as HTMLElement).focus(); // add focus for the last focusable element
          e.preventDefault();
        }
      } else {
        // if tab key is pressed
        if (document.activeElement === lastFocusableElement) {
          // if focused has reached to last focusable element then focus first focusable element after pressing tab
          (firstFocusableElement as HTMLElement).focus(); // add focus for the first focusable element
          e.preventDefault();
        }
      }
    };
    document.addEventListener('keydown', el._tabClicking);
  },
  unmounted(el: FocusTrapHTMLElement) {
    if (!el._tabClicking) return;
    document.removeEventListener('keydown', el._tabClicking, true);
    delete el._tabClicking;
  },
};
export default focusTrapDirective;
