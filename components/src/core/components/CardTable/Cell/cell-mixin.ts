import {defineComponent} from 'vue';
import {decoratorMixin} from '../Decorator/decorator-mixin';

export const cellMixin = defineComponent({
  mixins: [decoratorMixin],
  inject: ['tableProps', 'screenState'],

  props: {
    header: {
      type: Object,
      default: () => ({}),
    },
    rowItem: {
      type: Object,
      default: () => ({}),
    },
  },
});

export default cellMixin;
