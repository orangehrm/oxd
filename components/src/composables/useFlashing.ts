import {SetupContext, ShallowReactive, shallowRef, watch} from 'vue';

type RowItem = {
  [name: string]: string | number | object | null;
};

const sanitize = (item: RowItem, ignoredKeys: string[] = []) => {
  for (const key of ignoredKeys) {
    delete item[key];
  }
  return item;
};

export const getDiff = (
  newValue: RowItem[],
  oldValue: RowItem[],
  ignoredKeys: string[] = [],
) => {
  const diff: number[] = [];
  for (let i = 0; i < newValue.length; i++) {
    const isNew =
      oldValue.findIndex(item => {
        const o = JSON.stringify(
          Object.entries(sanitize(item, ignoredKeys)).sort(),
        );
        const n = JSON.stringify(
          Object.entries(sanitize(newValue[i], ignoredKeys)).sort(),
        );
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
    selectionMode?: 'index' | 'property';
    flashIgnoreKeys: string[];
  }>,
  context: SetupContext,
) {
  let flash = false;
  let cachedItems: RowItem[] = [];
  const flashIndexes = shallowRef<number[]>([]);

  // Reset cached values if loading or sorting, but only clear selection for index-based selection
  watch(
    [() => props.loading, () => props.order],
    () => {
      if (props.selectionMode !== 'property') {
        context.emit('update:selected', []);
      }
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
        const newValueClone = JSON.parse(JSON.stringify(newValue));

        if (flash) {
          if (
            newValueClone.length === cachedItems.length ||
            newValueClone.length - cachedItems.length === 1
          ) {
            flashIndexes.value = [
              ...flashIndexes.value,
              ...getDiff(newValueClone, cachedItems, props.flashIgnoreKeys),
            ];
          }
        } else {
          if (newValueClone.length === 0 || cachedItems.length === 0)
            flash = true;
        }

        cachedItems = newValueClone;
      },
      {flush: 'post', deep: true},
    );
  }

  return flashIndexes;
}
