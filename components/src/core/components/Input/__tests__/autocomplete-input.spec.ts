import {config, flushPromises, mount} from '@vue/test-utils';
import AutocompleteInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteInput.vue';
import AutocompleteTextInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteTextInput.vue';
import AutocompleteOption from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteOption.vue';

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

const delayFunction = function(time: number) {
  return new Promise(reslove =>
    setTimeout(() => {
      reslove(true);
    }, time),
  );
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

  it('on Focus it should add class "oxd-autocomplete-text--focus"', async () => {
    const wrapper = mount(AutocompleteInput, {
      props: {createOptions: syncFunction, readonly: false, disabled: false},
    });
    wrapper.find('[data-test="autocompleteSelect"]').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-autocomplete-text-input--focus').exists()).toBe(
      true,
    );
  });

  it('on Blur it should add class "oxd-autocomplete-text--active"', async () => {
    const wrapper = mount(AutocompleteInput, {
      props: {createOptions: syncFunction, readonly: false, disabled: false},
    });
    wrapper.find('[data-test="autocompleteSelect"]').trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-autocomplete-text-input--active').exists()).toBe(
      true,
    );
  });

  it('on Clear  it will empty AutoComplete', async () => {
    const wrapper = mount(AutocompleteInput, {
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
    await delayFunction(2000);
    expect(wrapper.vm.searchTerm).toEqual(searchTerm);
    expect(wrapper.vm.loading).toEqual(false);
    expect(wrapper.vm.options.length).toEqual(3);
  });

  it('should able to select one option', async () => {
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
    await delayFunction(2000);
    const nodes = wrapper.findAllComponents(AutocompleteOption);
    await nodes[0].trigger('mousedown');
    expect(wrapper.emitted('update:modelValue')).toEqual([
      [
        {
          id: 1,
          label: 'HR Admin',
          _selected: false,
        },
      ],
    ]);
  });

  it('should able to select multiple  option', async () => {
    const wrapper = mount(AutocompleteInput, {
      props: {
        createOptions: syncFunction,
        multiple: true,
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
    await delayFunction(2000);
    const nodes = wrapper.findAllComponents(AutocompleteOption);
    await nodes[0].trigger('mousedown');
    expect(wrapper.emitted('update:modelValue')).toEqual([
      [
        [
          {
            id: 1,
            label: 'HR Admin',
            _selected: false,
          },
        ],
      ],
    ]);
  });

  it('cannot click on disabled option', async () => {
    const wrapper = mount(AutocompleteInput, {
      props: {
        createOptions: syncDisabledOptionFunction,
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
    await delayFunction(2000);
    const nodes = wrapper.findAllComponents(AutocompleteOption);
    await nodes[0].trigger('mousedown');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should able to remove selected chip in multi select mode', async () => {
    const wrapper = mount(AutocompleteInput, {
      props: {
        createOptions: syncDisabledOptionFunction,
        multiple: true,
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
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')).toEqual([[[]]]);
  });
  it('should not able to remove selected chip when readonly mode and  multi select mode', async () => {
    const wrapper = mount(AutocompleteInput, {
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
  it('should not able to remove selected chip when disabled mode and  multi select mode', async () => {
    const wrapper = mount(AutocompleteInput, {
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

  it('should be able to see highlighed options even with spanish chars', async () => {
    const specialOptions = [
      {
        id: 1,
        label: 'Adiós',
      },
      {
        id: 2,
        label: 'Sí',
      },
      {
        id: 3,
        label: '¿Quién?',
      },
      {
        id: 4,
        label: 'Eello',
      },
    ];

    const wrapper = mount(AutocompleteInput, {
      props: {
        createOptions: function() {
          return specialOptions;
        },
      },
    });

    const input = wrapper.findComponent(AutocompleteTextInput).find('input');
    const searchTerm = 'i';
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });

    input.element.value = searchTerm;
    input.element.dispatchEvent(event);
    await wrapper.vm.$nextTick();

    await delayFunction(2000);
    expect(
      wrapper.find('.oxd-autocomplete-dropdown > div:nth-child(1)').html(),
    ).toEqual(
      '<div role="option" class="oxd-autocomplete-option"><span>Ad<b>i</b>ós</span></div>',
    );
    expect(
      wrapper.find('.oxd-autocomplete-dropdown > div:nth-child(2)').html(),
    ).toEqual(
      '<div role="option" class="oxd-autocomplete-option"><span>S<b>í</b></span></div>',
    );
    expect(
      wrapper.find('.oxd-autocomplete-dropdown > div:nth-child(3)').html(),
    ).toEqual(
      '<div role="option" class="oxd-autocomplete-option"><span>¿Qu<b>i</b>én?</span></div>',
    );
    expect(
      wrapper.find('.oxd-autocomplete-dropdown > div:nth-child(4)').html(),
    ).toEqual(
      '<div role="option" class="oxd-autocomplete-option"><span>Eello</span></div>',
    );
  });

  it('highlighed options should be truncated, styled and normalized', async () => {
    const specialOptions = [
      {
        id: 1,
        label: 'Image',
      },
      {
        id: 2,
        label: 'Sí',
      },
      {
        id: 3,
        label: '¿Quién?',
      },
      {
        id: 4,
        label: 'Hiii',
      },
      {
        id: 5,
        label: 'infomation',
      },
    ];

    const wrapper = mount(AutocompleteInput, {
      props: {
        createOptions: function() {
          return specialOptions;
        },
      },
    });

    const input = wrapper.findComponent(AutocompleteTextInput).find('input');
    const searchTerm = 'i';
    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    });

    input.element.value = searchTerm;
    input.element.dispatchEvent(event);
    await wrapper.vm.$nextTick();

    await delayFunction(2000);
    expect(wrapper.vm.highlightedOptions).toEqual([
      '<b>I</b>mage',
      'S<b>í</b>',
      '¿Qu<b>i</b>én?',
      'H<b>i</b><b>i</b><b>i</b>',
      '<b>i</b>nfomat<b>i</b>on',
    ]);
  });
});
