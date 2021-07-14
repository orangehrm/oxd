import {mount} from '@vue/test-utils';
import AutocompleteInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteInput.vue';
import AutocompleteTextInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteTextInput.vue';

const options = [
  {
    id: 1,
    label: 'HR Admin',
  },
  {
    id: 2,
    label: 'ESS User',
  },
  {
    id: 3,
    label: 'Supervisor',
  },
];

const syncFunction = function() {
  return options;
};

describe('AutocompleteInput.vue', () => {
  it('renders OXD Autocomplete Input', () => {
    const wrapper = mount(AutocompleteInput, {
      props: {
        createOptions: syncFunction,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should load the options when input is changed', async () => {
    const wrapper = mount(AutocompleteInput, {
      props: {
        createOptions: syncFunction,
      },
    });

    const input = wrapper.findComponent(AutocompleteTextInput).find('input');
    const searchTerm = 'hr';
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    input.element.value = searchTerm;
    input.element.dispatchEvent(event);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dropdownOpen).toEqual(true);
    expect(wrapper.vm.loading).toEqual(true);
    expect(wrapper.vm.searchTerm).toEqual(searchTerm);
    expect(wrapper.emitted('update:modelValue')).toEqual([[null]]);

    setTimeout(() => {
      expect(wrapper.vm.loading).toEqual(false);
      expect(wrapper.vm.options).toEqual(3);
    }, 1000);
  });
});
