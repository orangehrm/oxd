import {Directive} from 'vue';

export interface FocusFirstHTMLElement extends HTMLElement {
  activeElement?: Element | null;
}

const focusableElements = 'input, select, textarea, [tabindex], [href]';
const excludeCloseButton = 'button:not(.oxd-dialog-close-button)';

const focusOnFirstElement = (element: Element, matchingString: string) => {
  const firstFocusableElement = element.querySelectorAll(matchingString)[0];
  if (firstFocusableElement) {
    (firstFocusableElement as HTMLElement).focus();
  }
};
const focusonFirstElementDirective: Directive = {
  mounted(el: FocusFirstHTMLElement) {
    el.activeElement = document.activeElement;
    focusOnFirstElement(el, focusableElements + ', ' + excludeCloseButton);
  },
  beforeUnmount(el: FocusFirstHTMLElement) {
    if (el.activeElement && (el.activeElement as HTMLElement).offsetParent) {
      (el.activeElement as HTMLElement).focus();
    } else {
      let rightPannel = document.querySelector('#mount-vue-app');
      if (!rightPannel) {
        rightPannel = document.body;
      }
      if (rightPannel) {
        focusOnFirstElement(
          rightPannel,
          focusableElements + ', ' + excludeCloseButton,
        );
      }
    }
  },
};
export default focusonFirstElementDirective;
