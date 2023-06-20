import {SetupContext, ShallowReactive, shallowRef, watch} from 'vue';

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
  let cachedItems: RowItem[] = JSON.parse(JSON.stringify(props.items));

  // Reset cached values if loading or sorting
  watch(
    [() => props.loading, () => props.order],
    () => {
      context.emit('update:selected', []);
      flashIndexes.value = [];
      cachedItems = [];
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
    watch(
      () => props.items,
      newValue => {
        if (
          newValue.length === cachedItems.length ||
          newValue.length - cachedItems.length === 1
        ) {
          flashIndexes.value = [
            ...flashIndexes.value,
            ...getDiff(newValue, cachedItems),
          ];
        }
        cachedItems = JSON.parse(JSON.stringify(newValue));
      },
      {flush: 'post', deep: true},
    );
  }

  return flashIndexes;
}
