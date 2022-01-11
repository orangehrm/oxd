import {defineComponent} from 'vue';

export const translateMixin = defineComponent({
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $vt(key: string) {
      return this.$t(key);
    },
    $t(key: string) {
      return key;
    },
  },
});

export default translateMixin;
