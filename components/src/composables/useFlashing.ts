import {ShallowReactive, ref, watch} from 'vue';

export default function useFlashing(
  props: ShallowReactive<{
    order: object;
    items: object[];
    loading: boolean;
  }>,
) {
  let oldValue: object[] = [];
  const flashIndexes = ref(Array(props.items.length).fill(false));

  // Reset cached values if loading or sorting
  watch([() => props.loading, () => props.order], () => (oldValue = []), {
    flush: 'pre',
  });

  watch(
    () => props.items,
    newValue => {
      flashIndexes.value = [];
      const length = Math.max(newValue.length, oldValue.length);
      flashIndexes.value = Array(length).fill(false);
      for (let i = 0; i < length; i++) {
        // All records are new, skip flashing
        if (oldValue.length === 0) break;

        // Missing new record or old record, flash
        if (!newValue[i] || !oldValue[i]) {
          flashIndexes.value[i] = true;
          continue;
        }

        // Deep check new record with old record, if not match flash
        const oldVal = JSON.stringify(Object.entries(oldValue[i]).sort());
        const newVal = JSON.stringify(Object.entries(newValue[i]).sort());
        if (oldVal !== newVal) flashIndexes.value[i] = true;
      }
      oldValue = JSON.parse(JSON.stringify(newValue));
    },
    {deep: true, flush: 'post'},
  );

  return flashIndexes;
}
