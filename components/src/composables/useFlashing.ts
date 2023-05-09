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
      flashIndexes.value = Array(newValue.length).fill(false);
      for (let i = 0; i < flashIndexes.value.length; i++) {
        if (oldValue.length === 0) break;
        const isNew =
          oldValue.findIndex(item => {
            const oldVal = JSON.stringify(Object.entries(item).sort());
            const newVal = JSON.stringify(Object.entries(newValue[i]).sort());
            return oldVal === newVal;
          }) === -1;
        if (isNew) flashIndexes.value[i] = true;
      }
      oldValue = JSON.parse(JSON.stringify(newValue));
    },
    {deep: true, flush: 'post'},
  );

  return flashIndexes;
}
