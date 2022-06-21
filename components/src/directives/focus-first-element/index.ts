import {Directive} from 'vue';

export interface FocusFirstHTMLElement extends HTMLElement {
  activeElement?: Element | null;
}

const focusableElements = 'input, select, textarea, [tabindex], [href]';
const excludeElements =
  'button:not(.oxd-dialog-close-button,.modal-reset-button)';
let firstFocusableElement: Element;

const focusOnFirstElement = (element: Element, matchingString: string) => {
  firstFocusableElement = element.querySelectorAll(matchingString)[0];
  if (firstFocusableElement) {
    (firstFocusableElement as HTMLElement).focus();
  }
};

const focusonFirstElementDirective: Directive = {
  updated(el: FocusFirstHTMLElement) {
    el.activeElement = document.activeElement;
    if (!firstFocusableElement) {
      focusOnFirstElement(el, focusableElements + ', ' + excludeElements);
    }
  },
  mounted(el: FocusFirstHTMLElement) {
    el.activeElement = document.activeElement;
    focusOnFirstElement(el, focusableElements + ', ' + excludeElements);
  },
  beforeUnmount(el: FocusFirstHTMLElement, binding) {
    const {arg} = binding;
    if (arg === 'return-focus') {
      if (el.activeElement && (el.activeElement as HTMLElement).offsetParent) {
        (el.activeElement as HTMLElement).focus();
      } else {
        let rightPanel = binding.instance?.$root?.$el.parentNode;
        if (!rightPanel) {
          rightPanel = document.body;
        }
        if (rightPanel) {
          focusOnFirstElement(
            rightPanel,
            focusableElements + ', ' + excludeElements,
          );
        }
      }
    } else {
      return;
    }
  },
};
export default focusonFirstElementDirective;
