import { Directive, DirectiveBinding } from 'vue';

const offset = 10;
function fixPosition(el: HTMLElement) {
  el.classList.remove('--positon-top', '--positon-bottom');
  if (window.innerHeight - el.getBoundingClientRect().bottom < offset) {
    el.classList.add('--positon-top');
    if (el.getBoundingClientRect().top < offset) {
      el.classList.remove('--positon-top');
      el.classList.add('--positon-bottom');
    }
  } else {
    el.classList.add('--positon-bottom');
  }
}

const dropdownDirectionDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const skipReposition = binding.value === true; //skip repositioning when binding value is true
    if (skipReposition) return;
    fixPosition(el);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const skipReposition = binding.value === true; //skip repositioning when binding value is true
    if (skipReposition) return;
    fixPosition(el);
  },
};

export default dropdownDirectionDirective;
