import {Directive} from 'vue';

export interface FocusFirstHTMLElement extends HTMLElement {
  activeElement?: Element | null;
}

const focusableElements = 'input, select, textarea, [tabindex], [href]';
const excludeElements= 'button:not(.oxd-dialog-close-button)';

const focusOnFirstElement = (element: Element, matchingString: string) => {
  const firstFocusableElement = element.querySelectorAll(matchingString)[0];
  if (firstFocusableElement) {
    (firstFocusableElement as HTMLElement).focus();
  }
};

const focusonFirstElementDirective: Directive = {
  mounted(el: FocusFirstHTMLElement) {
    el.activeElement = document.activeElement;
    focusOnFirstElement(el, focusableElements + ', ' + excludeElements);
  },
  beforeUnmount(el: FocusFirstHTMLElement, binding) {
    const { arg } = binding;
    if(arg==="return-focus"){
      console.log("retuned focus");
      if (el.activeElement && (el.activeElement as HTMLElement).offsetParent) {
        (el.activeElement as HTMLElement).focus();
      } else {
        let rightPanel = document.querySelector('#mount-vue-app');
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
    }
    else{
      return;
    }
  },
};
export default focusonFirstElementDirective;
