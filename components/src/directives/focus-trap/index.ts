import {Directive} from 'vue';

export type TabHandler = (e: KeyboardEvent) => void;

export interface FocusTrapHTMLElement extends HTMLElement {
  activeElement?: Element | null;
  _tabClicking?: TabHandler;
}

const focusableElements = 'input, select, textarea, [tabindex], [href]';
const focusableButtonElements = 'button:not([disabled])';

let focusableContent: NodeList,
  firstFocusableElement: Element,
  lastFocusableElement: Element;

const getFocusableContent = (element: Element, matchingString: string) => {
  focusableContent = element.querySelectorAll(matchingString);
  firstFocusableElement = focusableContent[0] as Element;
  lastFocusableElement = focusableContent[
    focusableContent.length - 1
  ] as Element;
};
const onTabClick = (e: KeyboardEvent) => {
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

const focusTrapDirective: Directive = {
  mounted(el: FocusTrapHTMLElement) {
    getFocusableContent(el, focusableElements + ', ' + focusableButtonElements);
    el._tabClicking = function(e: KeyboardEvent) {
      onTabClick(e);
    };
    document.addEventListener('keydown', el._tabClicking);
  },
  updated(el: FocusTrapHTMLElement) {
    const currentFocusableElementCount = focusableContent?.length;
    const updatedFocusableElementCount = el.querySelectorAll(
      focusableElements + ', ' + focusableButtonElements,
    )?.length;
    if (currentFocusableElementCount !== updatedFocusableElementCount) {
      getFocusableContent(
        el,
        focusableElements + ', ' + focusableButtonElements,
      );
      el._tabClicking = function(e: KeyboardEvent) {
        onTabClick(e);
      };
      document.addEventListener('keydown', el._tabClicking);
    }
  },
  unmounted(el: FocusTrapHTMLElement) {
    if (!el._tabClicking) return;
    document.removeEventListener('keydown', el._tabClicking, true);
    delete el._tabClicking;
  },
};
export default focusTrapDirective;
