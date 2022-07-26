import {Directive, VNode} from 'vue';

export interface FocusFirstHTMLElement extends HTMLElement {
  activeElement?: Element | null;
}

const focusableElements = 'input, select, textarea, [tabindex], [href]';
const excludeElements =
  'button:not(.oxd-dialog-close-button,.modal-reset-button)';
const firstFocusedElementsOnMounted = new Map<string | null, Element>();
const firstFocusedElementsOnUpdated = new Map<string | null, Element>();

const focusOnFirstElement = (
  element: Element,
  matchingString: string,
  vnode: VNode,
) => {
  let firstFocusedElement = element.querySelectorAll(matchingString)[0];
  firstFocusedElementsOnMounted.set(vnode.scopeId, firstFocusedElement);
  if (firstFocusedElement) {
    (firstFocusedElement as HTMLElement).focus();
  }
};

const focusonFirstElementDirective: Directive = {
  updated(el: FocusFirstHTMLElement, binding, vnode: VNode) {
    let updatedFocusFirstElement = el.querySelectorAll(
      focusableElements + ', ' + excludeElements,
    )[0];
    firstFocusedElementsOnUpdated.set(vnode.scopeId, updatedFocusFirstElement);
    if (
      firstFocusedElementsOnMounted.get(vnode.scopeId) !==
      firstFocusedElementsOnUpdated.get(vnode.scopeId)
    ) {
      focusOnFirstElement(
        el,
        focusableElements + ', ' + excludeElements,
        vnode,
      );
    }
  },
  mounted(el: FocusFirstHTMLElement, binding, vnode: VNode) {
    el.activeElement = document.activeElement;
    focusOnFirstElement(el, focusableElements + ', ' + excludeElements, vnode);
  },
  beforeUnmount(el: FocusFirstHTMLElement, binding, vnode: VNode) {
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
            vnode,
          );
        }
      }
    } else {
      return;
    }
  },
};
export default focusonFirstElementDirective;
