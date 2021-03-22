import {defineComponent} from 'vue';
import {nanoid} from 'nanoid';

export const uuid = defineComponent({
  data() {
    return {
      cid: '',
    };
  },
  created() {
    this.cid = nanoid();
  },
});
