import {Directive} from 'vue';

const offset = 10;
function fixPosition(el: HTMLElement) {
  el.classList.remove('--positon-pop-over-left', '--positon-pop-over-right');
  if (el.getBoundingClientRect().left < offset) {
    el.classList.add('--positon-pop-over-left');
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
