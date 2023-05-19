import {SetupContext, ShallowReactive, shallowRef, watch} from 'vue';

export default function useFlashing(
  props: ShallowReactive<{
    order: object;
    items: object[];
    loading: boolean;
    flashing: boolean;
  }>,
  context: SetupContext,
) {
  let oldValue: object[] = [];
  const flashIndexes = shallowRef(Array(props.items.length).fill(false));

  // Reset cached values if loading or sorting
  watch(
    [() => props.loading, () => props.order],
    () => {
      oldValue = [];
      context.emit('update:selected', []);
    },
    {
      flush: 'pre',
    },
  );

  if (props.flashing) {
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
  }

  return flashIndexes;
}
