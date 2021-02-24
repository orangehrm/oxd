import {defineComponent} from 'vue';
import {ToastType, TYPE_DEFAULT, TYPES} from './types';

export const toastMixin = defineComponent({
  props: {
    type: {
      type: String,
      default: TYPE_DEFAULT,
      validator: function(value: ToastType) {
        return TYPES.indexOf(value) !== -1;
      },
    },
  },
});

export default toastMixin;
