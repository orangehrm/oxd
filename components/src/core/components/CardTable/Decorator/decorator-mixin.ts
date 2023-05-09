import {defineComponent} from 'vue';

export const decoratorMixin = defineComponent({
  inject: ['tableProps'],
});

export default decoratorMixin;
