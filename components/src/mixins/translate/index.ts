import {defineComponent} from 'vue';

export const translateMixin = defineComponent({
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $oxdt(key?: any): string {
      if (typeof this.$t === 'function') {
        return this.$t(key);
      }
      return key;
    },
  },
});

export default translateMixin;
