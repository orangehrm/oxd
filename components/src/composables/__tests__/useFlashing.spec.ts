import {defineComponent} from 'vue';
import {mount} from '@vue/test-utils';
import useFlashing, {getDiff} from '../useFlashing';

const TestComponent = defineComponent({
  props: ['loading', 'flashing', 'items', 'order', 'flashIgnoreKeys'],
  setup(props, context) {
    return {
      flashIndexes: useFlashing(props, context),
    };
  },
  template: `<pre>{{flashIndexes}}</pre>`,
});

describe('useFlashing composable', () => {
  it('useFlashing::getDiff should detect when item added to array', () => {
    const original = [
      {id: 1, name: 'Orange'},
      {id: 2, name: 'Apple'},
      {id: 3, name: 'Cherry'},
    ];

    const updated = [...original, {id: 4, name: 'Banana'}];
    expect(getDiff(updated, original)).toStrictEqual([3]);
  });
  it('useFlashing::getDiff should detect when item updated in array', () => {
    const original = [
      {id: 1, name: 'Orange'},
      {id: 2, name: 'Apple'},
      {id: 3, name: 'Cherry'},
    ];

    const updated = JSON.parse(JSON.stringify(original));
    updated[2].name = 'Guava';
    expect(getDiff(updated, original)).toStrictEqual([2]);
  });
  it('useFlashing::getDiff should not detect when items reordered in array', () => {
    const original = [
      {id: 1, name: 'Orange'},
      {id: 2, name: 'Apple'},
      {id: 3, name: 'Cherry'},
    ];

    const updated = [...original].reverse();
    expect(getDiff(updated, original)).toStrictEqual([]);
  });
  it('useFlashing::getDiff should not detect when items removed in array', () => {
    const original = [
      {id: 1, name: 'Orange'},
      {id: 2, name: 'Apple'},
      {id: 3, name: 'Cherry'},
    ];

    const updated = [...original];
    updated.pop();
    expect(getDiff(updated, original)).toStrictEqual([]);
  });

  it('useFlashing should detect changes', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        flashing: true,
      },
    });
    await wrapper.setProps({
      items: [
        {id: 1, name: 'Orange'},
        {id: 2, name: 'Apple'},
        {id: 3, name: 'Cherry'},
      ],
    });
    expect(wrapper.vm.flashIndexes).toStrictEqual([]);
    await wrapper.setProps({
      items: [
        {id: 1, name: 'Orange'},
        {id: 2, name: 'Apple'},
        {id: 3, name: 'Cherry'},
        {id: 4, name: 'Guava'},
      ],
    });
    expect(wrapper.vm.flashIndexes).toStrictEqual([3]);
  });

  it('useFlashing should not detect changes if flashing disabled', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        flashing: false,
      },
    });
    await wrapper.setProps({
      items: [
        {id: 1, name: 'Orange'},
        {id: 2, name: 'Apple'},
        {id: 3, name: 'Cherry'},
      ],
    });
    expect(wrapper.vm.flashIndexes).toStrictEqual([]);
    await wrapper.setProps({
      items: [
        {id: 1, name: 'Orange'},
        {id: 2, name: 'Apple'},
        {id: 3, name: 'Cherry'},
        {id: 4, name: 'Guava'},
      ],
    });
    expect(wrapper.vm.flashIndexes).toStrictEqual([]);
  });

  it('useFlashing::getDiff should not detect changes in ignored keys', () => {
    const original = [
      {id: 1, name: 'Orange', timestamp: '2024-01-01', count: 5},
      {id: 2, name: 'Apple', timestamp: '2024-01-02', count: 3},
      {id: 3, name: 'Cherry', timestamp: '2024-01-03', count: 7},
    ];

    const updated = JSON.parse(JSON.stringify(original));
    // Update ignored keys
    updated[0].timestamp = '2024-01-04';
    updated[1].count = 10;
    // Update non-ignored key
    updated[2].name = 'Guava';

    expect(getDiff(updated, original, ['timestamp', 'count'])).toStrictEqual([
      2,
    ]);
  });

  it('useFlashing should respect flashIgnoreKeys', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        flashing: true,
        flashIgnoreKeys: ['timestamp', 'count'],
      },
    });

    await wrapper.setProps({
      items: [
        {id: 1, name: 'Orange', timestamp: '2024-01-01', count: 5},
        {id: 2, name: 'Apple', timestamp: '2024-01-02', count: 3},
      ],
    });

    // First update - change ignored keys
    await wrapper.setProps({
      items: [
        {id: 1, name: 'Orange', timestamp: '2024-01-04', count: 10},
        {id: 2, name: 'Apple', timestamp: '2024-01-05', count: 8},
      ],
    });
    expect(wrapper.vm.flashIndexes).toStrictEqual([]);

    // Second update - change non-ignored key
    await wrapper.setProps({
      items: [
        {id: 1, name: 'Orange', timestamp: '2024-01-04', count: 10},
        {id: 2, name: 'Banana', timestamp: '2024-01-05', count: 8},
      ],
    });
    expect(wrapper.vm.flashIndexes).toStrictEqual([1]);
  });
});
