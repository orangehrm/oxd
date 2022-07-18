import {Directive} from 'vue';

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
  mounted(el: HTMLElement) {
    fixPosition(el);
  },
  updated(el: HTMLElement) {
    fixPosition(el);
  },
};

export default dropdownDirectionDirective;
