import {mount} from '@vue/test-utils';
import InputField from '@orangehrm/oxd/core/components/InputField/InputField.vue';
import {FormAPI, formKey} from '@orangehrm/oxd/composables/types';

describe('InputField.vue', () => {
  const mockFormAPI: FormAPI = {
    searchErrors: jest.fn(() => []),
    purgeErrors: jest.fn(),
    addError: jest.fn(),
    registerField: jest.fn(),
    unregisterField: jest.fn(),
  };
  it('renders OXD InputField', () => {
    const wrapper = mount(InputField, {
      props: {},
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD InputField type `input`', () => {
    const wrapper = mount(InputField, {
      props: {type: 'input'},
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD InputField type `file`', () => {
    const wrapper = mount(InputField, {
      props: {type: 'file'},
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD InputField type `file` with button', () => {
    const wrapper = mount(InputField, {
      props: {type: 'file', buttonLabel: 'Browse'},
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD InputField type `textarea`', () => {
    const wrapper = mount(InputField, {
      props: {type: 'textarea'},
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD InputField type `input` with Hint', () => {
    const wrapper = mount(InputField, {
      props: {type: 'input', hint: 'This field has a hint'},
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD InputField type `input` with label help text', () => {
    const wrapper = mount(InputField, {
      props: {type: 'input', labelHelpText: 'This is the input field help text'},
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(
      wrapper
        .find('.oxd-label-help-text')
        .text(),
    ).toContain('This is the input field help text');

  });

  it('renders OXD InputField type `select` with label help text', () => {
    const wrapper = mount(InputField, {
      props: {type: 'select', labelHelpText: 'This is the select field help text', label:"Vacancy",
        options: [
          {id: 1, label: 'Vaccancy One'},
          {id: 2, label: 'Vaccancy Two'}
        ],
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(
      wrapper
        .find('.oxd-label-help-text')
        .text(),
    ).toContain('This is the select field help text');

  });

  it('renders OXD InputField type `date` with label help text', () => {
    const wrapper = mount(InputField, {
      props: {type: 'date', labelHelpText: 'This is date field help text',label:"Date",
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(
      wrapper
        .find('.oxd-label-help-text')
        .text(),
    ).toContain('This is date field help text');

  });

  it('renders OXD InputField type `textarea` with label help text', () => {
    const wrapper = mount(InputField, {
      props: {type: 'textarea', labelHelpText: 'This is textarea field help text',label:"Date",
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(
      wrapper
        .find('.oxd-label-help-text')
        .text(),
    ).toContain('This is textarea field help text');

  });

  it('renders OXD InputField type `input` without label help text', () => {
    const wrapper = mount(InputField, {
      props: {type: 'input', label : "First Name"},
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(
      wrapper
        .find('.oxd-label-help-text')
        .exists()
    ).toBeFalsy();

  });
    

});
