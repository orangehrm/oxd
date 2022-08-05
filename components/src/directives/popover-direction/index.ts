import {Directive} from 'vue';

function fixPosition(el: HTMLElement) {

  el.classList.remove('--positon-pop-over-left', '--positon-pop-over-right');
  if (el.getBoundingClientRect().left < window.innerWidth/2) {
    el.classList.add('--positon-pop-over-left');
  } else {
    el.classList.add('--positon-pop-over-right');
  }
}

const popoverHorizontalDirectionDirective: Directive = {
  mounted(el: HTMLElement) {
    fixPosition(el);
  },
  updated(el: HTMLElement) {
    fixPosition(el);
  },
};

export default popoverHorizontalDirectionDirective;