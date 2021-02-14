import {defineComponent} from 'vue';

export const pageableMixin = defineComponent({
  props: {
    page: {
      type: Number,
      default: 1,
      validator: (val: number) => Number.isInteger(val),
    },
  },
});

export default pageableMixin;
