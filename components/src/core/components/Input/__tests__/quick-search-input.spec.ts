import {config, mount} from '@vue/test-utils';
import QuickSearchInput from '@orangehrm/oxd/core/components/Input/Autocomplete/QuickSearchInput.vue';
import AutocompleteInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteInput.vue';

config.global.mocks = {
  $t: (text: string) => text,
};

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

const disabledptions = [
  {
    id: 1,
    label: 'HR Admin',
    _disabled: true,
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

const syncDisabledOptionFunction = function() {
  return disabledptions;
};

describe('QuickSearchInput.vue', () => {
  it('Renders OXD QuickSearchInput Input', () => {
    const wrapper = mount(QuickSearchInput, {
      props: {
        createOptions: syncFunction,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('On Focus it should add class "oxd-autocomplete-text--focus"', async () => {
    const wrapper = mount(QuickSearchInput, {
      props: {createOptions: syncFunction, readonly: false, disabled: false},
    });
    wrapper.find('[data-test="autocompleteSelect"]').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-autocomplete-text-input--focus').exists()).toBe(
      true,
    );
  });

  it('On Blur it should add class "oxd-autocomplete-text--active"', async () => {
    const wrapper = mount(QuickSearchInput, {
      props: {createOptions: syncFunction, readonly: false, disabled: false},
    });
    wrapper.find('[data-test="autocompleteSelect"]').trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-autocomplete-text-input--active').exists()).toBe(
      true,
    );
    expect(wrapper.emitted('dropdown:blur')).toBeTruthy();
  });

  it('On Clear  it will empty QuickSearchInput', async () => {
    const wrapper = mount(QuickSearchInput, {
      props: {
        createOptions: syncFunction,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
      },
    });
    wrapper.find('[data-test="autocompleteSelectClearIcon"]').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toEqual([[null]]);
  });

  it('QuickSearch component emits "select enter"  when AutoComplete component emit "select enter"', async () => {
    const wrapper = mount(QuickSearchInput, {
      props: {
        createOptions: syncFunction,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
      },
    });
    const input = wrapper.findComponent(AutocompleteInput);
    input.vm.onSelectEnter();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('select:enter')).toBeTruthy();
  });

  it('QuickSearch component emits "dropdown:closed" when Autocomplete component emit  "dropdown:closed"', async () => {
    const wrapper = mount(QuickSearchInput, {
      props: {
        createOptions: syncFunction,
        modelValue: {
          id: 1,
          label: 'HR Admin',
        },
      },
    });
    const input = wrapper.findComponent(AutocompleteInput);
    input.setData({dropdownOpen: true});
    input.vm.onCloseDropdown();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('dropdown:closed')).toBeTruthy();
  });

  it('Should not able to remove selected chip when readonly mode and  multi select mode', async () => {
    const wrapper = mount(QuickSearchInput, {
      props: {
        createOptions: syncDisabledOptionFunction,
        multiple: true,
        readonly: true,
        modelValue: [
          {
            id: 1,
            label: 'HR Admin',
          },
        ],
      },
    });

    const cancelButton = wrapper.find("[data-test='removeIcon']");
    await cancelButton.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
  it('Should not able to remove selected chip when disabled mode and  multi select mode', async () => {
    const wrapper = mount(QuickSearchInput, {
      props: {
        createOptions: syncDisabledOptionFunction,
        multiple: true,
        disabled: true,
        modelValue: [
          {
            id: 1,
            label: 'HR Admin',
          },
        ],
      },
    });

    const cancelButton = wrapper.find("[data-test='removeIcon']");
    await cancelButton.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
});
