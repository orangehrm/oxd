import {mount} from '@vue/test-utils';
import {defineComponent} from 'vue';
import navigationMixin from '@orangehrm/oxd/core/components/Input/Select/navigation-mixin';

const MockComponent = defineComponent({
  name: 'mock-component',
  mixins: [navigationMixin],
  data() {
    return {dropdownOpen: true};
  },
  // eslint-disable-next-line
  render() {},
  computed: {
    computedOptions() {
      return [
        {id: 1, label: 'apple'},
        {id: 2, label: 'banana'},
        {id: 3, label: 'cherry'},
        {id: 4, label: 'avocado'},
      ];
    },
  },
});

describe('navigationMixin.ts', () => {
  it('should increment pointer onSelectDown', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.pointer = -1;
    wrapper.vm.onSelectDown();
    expect(wrapper.vm.pointer).toStrictEqual(0);
  });
  it('should decrement pointer onSelectUp', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.pointer = 1;
    wrapper.vm.onSelectUp();
    expect(wrapper.vm.pointer).toStrictEqual(0);
  });
  it('should match pointer to keypress', () => {
    const wrapper = mount(MockComponent, {});
    const keydownEvent = new KeyboardEvent('keydown', {key: 'b'});
    wrapper.vm.onKeypress(keydownEvent);
    expect(wrapper.vm.pointer).toStrictEqual(1);
  });
  it('should match pointer to keypress on repeat keypress', () => {
    const wrapper = mount(MockComponent, {});
    const keydownEvent = new KeyboardEvent('keydown', {key: 'a'});
    wrapper.vm.onKeypress(keydownEvent);
    expect(wrapper.vm.pointer).toStrictEqual(0);
    wrapper.vm.onKeypress(keydownEvent);
    expect(wrapper.vm.pointer).toStrictEqual(3);
    wrapper.vm.onKeypress(keydownEvent);
    expect(wrapper.vm.pointer).toStrictEqual(0);
  });
  it('should not increment pointer beyond options length', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.pointer = 3;
    wrapper.vm.onSelectDown();
    expect(wrapper.vm.pointer).toStrictEqual(3);
  });
  it('should not decrement pointer beyond options length', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.pointer = 0;
    wrapper.vm.onSelectUp();
    expect(wrapper.vm.pointer).toStrictEqual(0);
  });
});
