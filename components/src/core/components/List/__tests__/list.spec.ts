import {mount, shallowMount} from '@vue/test-utils';
import List from '@orangehrm/oxd/core/components/List/List.vue';
import minimalListConfig from './list-minimal.json';
import AutocompleteTextInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteTextInput.vue';

describe('List > List.vue', () => {
  it('correctly computes initial sort order', () => {
    const wrapper = shallowMount(List, {
      props: {
        configurations: minimalListConfig,
      },
    });
    expect(wrapper.vm.order).toStrictEqual({
      candidate: {
        iconAsc: '',
        iconDesc: '',
        order: 'DEFAULT',
      },
      contactNumber: {
        iconAsc: '',
        iconDesc: '',
        order: 'DEFAULT',
      },
      dateOfApplication: {
        iconAsc: '',
        iconDesc: '',
        order: 'DESC',
      },
      email: {
        iconAsc: '',
        iconDesc: '',
        order: 'DEFAULT',
      },
    });
  });

  it('changes sort order when sort changes', () => {
    const wrapper = shallowMount(List, {
      props: {
        configurations: minimalListConfig,
      },
    });
    wrapper.vm.tableSort({
      candidate: 'ASC',
      email: 'DEFAULT',
      contactNumber: 'DEFAULT',
      dateOfApplication: 'DEFAULT',
    });

    // assert event has been emitted
    expect(wrapper.emitted()['update:order']).toBeTruthy();
    expect(wrapper.emitted()['update:order'].length).toBe(1);
    expect(wrapper.emitted()['update:order'][0]).toStrictEqual([
      {
        candidate: 'ASC',
        email: 'DEFAULT',
        contactNumber: 'DEFAULT',
        dateOfApplication: 'DEFAULT',
      },
    ]);

    // assert sort order has been updated
    expect(wrapper.vm.order).toStrictEqual({
      candidate: {
        iconAsc: '',
        iconDesc: '',
        order: 'ASC',
      },
      contactNumber: {
        iconAsc: '',
        iconDesc: '',
        order: 'DEFAULT',
      },
      dateOfApplication: {
        iconAsc: '',
        iconDesc: '',
        order: 'DEFAULT',
      },
      email: {
        iconAsc: '',
        iconDesc: '',
        order: 'DEFAULT',
      },
    });
  });

  it('Without quickSearchKeyWord prop set', () => {
    const wrapper = shallowMount(List, {
      props: {
        configurations: minimalListConfig,
      },
    });
    expect(wrapper.vm.state.quickSearchTerm).toBe(null);
    expect(wrapper.vm.state.selectedQuickSearch).toBe(null);
  });

  it('With quickSearchKeyWord prop set', () => {
    const wrapper = shallowMount(List, {
      props: {
        configurations: minimalListConfig,
        quickSearchKeyWord: 'searchWord',
      },
    });
    expect(wrapper.vm.state.quickSearchTerm).toBe('searchWord');
    expect(wrapper.vm.state.selectedQuickSearch).toStrictEqual({
      label: 'searchWord',
    });
  });

  const options = [{id: 53, label: 'schedule 1'}];

  const syncFunction = function() {
    return options;
  };

  const delayFunction = function(time: number) {
    return new Promise(reslove =>
      setTimeout(() => {
        reslove(true);
      }, time),
    );
  };

  it('Will not return image in quick search if not set', async () => {
    minimalListConfig.table.topBar.visible = true;
    const wrapper = mount(List, {
      props: {
        configurations: minimalListConfig,
        quickSearchOptions: syncFunction,
        quickSearchTriggered: true,
        quickSearchTerm: 'sch',
      },
    });
    const input = wrapper.findComponent(AutocompleteTextInput).find('input');
    const searchTerm = 'sch';
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    input.element.value = searchTerm;
    input.element.dispatchEvent(event);
    await wrapper.vm.$nextTick();
    await delayFunction(2000);
    expect(wrapper.find('.profile-image--extra-small').exists()).toBe(false);
  });

  it('Will return image in quick search if set withImageSearch to true', async () => {
    minimalListConfig.table.topBar.visible = true;
    minimalListConfig.table.topBar.quickSearch.withImageSearch = true;
    const wrapper = mount(List, {
      props: {
        configurations: minimalListConfig,
        quickSearchOptions: syncFunction,
        quickSearchTriggered: true,
        quickSearchTerm: 'sch',
      },
    });
    const input = wrapper.findComponent(AutocompleteTextInput).find('input');
    const searchTerm = 'sch';
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    input.element.value = searchTerm;
    input.element.dispatchEvent(event);
    await wrapper.vm.$nextTick();
    await delayFunction(2000);
    expect(wrapper.find('.profile-image--extra-small').exists()).toBe(true);
  });
});
