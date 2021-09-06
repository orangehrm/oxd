import {defineComponent} from 'vue';

export const cellMixin = defineComponent({
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
