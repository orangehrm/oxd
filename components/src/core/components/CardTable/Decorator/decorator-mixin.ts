import {defineComponent} from 'vue';

export const decoratorMixin = defineComponent({
  inject: ['tableProps', 'screenState'],
});

export default decoratorMixin;
