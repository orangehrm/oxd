<script lang="ts">
import {defineComponent, h} from 'vue';

export default defineComponent({
  name: 'oxd-calendar-day',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  render() {
    return h('div', {class: 'oxd-calendar-day'}, this.name);
  },
});
</script>
