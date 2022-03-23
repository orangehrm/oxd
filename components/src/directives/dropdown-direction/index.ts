import {Directive, DirectiveBinding} from 'vue';

function fixPosition(el: HTMLElement) {
  el.classList.remove('--positon-top');
  el.classList.remove('--positon-bottom');
  if (window.innerHeight - el.getBoundingClientRect().bottom < 0) {
    el.classList.add('--positon-top');
    if (el.getBoundingClientRect().top < 0) {
      el.classList.remove('--positon-top');
      el.classList.add('--positon-bottom');
    }
  } else {
    el.classList.add('--positon-bottom');
  }
}

function handleScroll(this: any) {
  fixPosition(this);
}

const dropdownDirectionDirective: Directive = {
  mounted(el: HTMLElement) {
    window.addEventListener('scroll', handleScroll.bind(el));
    fixPosition(el);
  },
  updated(el: HTMLElement) {
    fixPosition(el);
  },
  unmounted(el: HTMLElement) {
    window.removeEventListener('scroll', handleScroll.bind(el));
  },
};

export default dropdownDirectionDirective;
