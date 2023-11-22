import {SetupContext, ShallowReactive, shallowRef, watch} from 'vue';

type RowItem = {
  [name: string]: string | number | object | null;
};

export const getDiff = (newValue: RowItem[], oldValue: RowItem[]) => {
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

export default function useFlashing(
  props: ShallowReactive<{
    order: object;
    loading: boolean;
    flashing: boolean;
    items: RowItem[];
  }>,
  context: SetupContext,
) {
  let flash = false;
  let cachedItems: RowItem[] = [];
  const flashIndexes = shallowRef<number[]>([]);

  // Reset cached values if loading or sorting
  watch(
    [() => props.loading, () => props.order],
    () => {
      context.emit('update:selected', []);
      flashIndexes.value = [];
      cachedItems = [];
      flash = false;
    },
    {
      flush: 'pre',
    },
  );

  if (props.flashing) {
    watch(
      () => props.items,
      newValue => {
        if (flash) {
          if (
            newValue.length === cachedItems.length ||
            newValue.length - cachedItems.length === 1
          ) {
            flashIndexes.value = [
              ...flashIndexes.value,
              ...getDiff(newValue, cachedItems),
            ];
          }
        } else {
          if (newValue.length === 0 || cachedItems.length === 0) flash = true;
        }
        cachedItems = JSON.parse(JSON.stringify(newValue));
      },
      {flush: 'post', deep: true},
    );
  }

  return flashIndexes;
}
