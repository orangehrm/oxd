import {SetupContext, ShallowReactive, computed, shallowRef, watch} from 'vue';

type RowItem = {
  [name: string]: string | number | object | null;
};

export default function useFlashing(
  props: ShallowReactive<{
    order: object;
    loading: boolean;
    flashing: boolean;
    items: RowItem[];
  }>,
  context: SetupContext,
) {
  const flashIndexes = shallowRef<number[]>([]);

  // Reset cached values if loading or sorting
  watch(
    [() => props.loading, () => props.order],
    () => {
      context.emit('update:selected', []);
      flashIndexes.value = [];
    },
    {
      flush: 'pre',
    },
  );

  const getDiff = (newValue: RowItem[], oldValue: RowItem[]) => {
    const diff: number[] = [];
    for (let i = 0; i < newValue.length; i++) {
      const isNew =
        oldValue.findIndex(item => {
          const o = JSON.stringify(Object.entries(item).sort());
          const n = JSON.stringify(Object.entries(newValue[i]).sort());
          return o === n;
        }) === -1;
      if (isNew) diff.push(i);
    }
    return diff;
  };

  if (props.flashing) {
    const items = computed(() => JSON.stringify(props.items));

    watch(
      items,
      (newVal, oldVal) => {
        const newValue = JSON.parse(newVal) as RowItem[];
        const oldValue = JSON.parse(oldVal) as RowItem[];
        if (
          newValue.length === oldValue.length ||
          newValue.length - oldValue.length === 1
        ) {
          flashIndexes.value = [
            ...flashIndexes.value,
            ...getDiff(newValue, oldValue),
          ];
        }
      },
      {flush: 'post'},
    );
  }

  return flashIndexes;
}
