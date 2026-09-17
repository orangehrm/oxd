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

  it('renders OXD InputField type `input` with hint', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'input',
        hint: 'This is the input field hint',
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.find('.oxd-input-field-hint').text()).toContain(
      'This is the input field hint',
    );
  });

  it('renders OXD InputField type `select` with hint', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'select',
        hint: 'This is the select field hint',
        label: 'Vacancy',
        options: [
          {id: 1, label: 'Vaccancy One'},
          {id: 2, label: 'Vaccancy Two'},
        ],
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.find('.oxd-input-field-hint').text()).toContain(
      'This is the select field hint',
    );
  });

  it('renders OXD InputField type `date` with hint', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'date',
        hint: 'This is date field hint',
        label: 'Date',
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.find('.oxd-input-field-hint').text()).toContain(
      'This is date field hint',
    );
  });

  it('renders OXD InputField type `textarea` with hint', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'textarea',
        hint: 'This is textarea field hint',
        label: 'Date',
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.find('.oxd-input-field-hint').text()).toContain(
      'This is textarea field hint',
    );
  });

  it('renders OXD InputField type `input` without hint', () => {
    const wrapper = mount(InputField, {
      props: {type: 'input', label: 'First Name'},
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.find('.oxd-input-field-hint').exists()).toBeFalsy();
  });

  it('renders OXD InputField type `input` with hint default positioned to top', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'input',
        hint: 'This is the input field hint',
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.find('.oxd-input-field-hint').classes()).toContain(
      'placement-top',
    );
  });

  it('renders OXD InputField type `input` with hint positioned to bottom', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'input',
        hint: 'This is the input field hint',
        hintPlacement: 'bottom',
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.find('.oxd-input-field-hint').classes()).toContain(
      'placement-bottom',
    );
  });

  it('renders OXD InputField type `input` positioned to bottom with custom styled hint', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'input',
        hint: 'This is the input field hint',
        hintPlacement: 'bottom',
        hintStyle: {'font-style': 'italic'},
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.find('.oxd-input-field-hint').attributes().style).toBe(
      'font-style: italic;',
    );
  });

  it('renders OXD InputField type `input` positioned to top with custom styled hint', () => {
    const wrapper = mount(InputField, {
      props: {
        type: 'input',
        hint: 'This is the input field hint',
        hintPlacement: 'top',
        hintStyle: {'font-style': 'bold'},
      },
      global: {
        provide: {
          [formKey as symbol]: mockFormAPI,
        },
      },
    });
    expect(wrapper.find('.oxd-input-field-hint').classes()).toContain(
      'placement-top',
    );
    expect(wrapper.find('.oxd-input-field-hint').attributes().style).toBe(
      'font-style: bold;',
    );
  });

  const mountField = (props: Record<string, unknown>) =>
    mount(InputField, {
      props,
      global: {provide: {[formKey as symbol]: mockFormAPI}},
    });

  it('associates the label with its control when no id is passed', () => {
    const wrapper = mountField({label: 'First Name'});
    const id = wrapper.find('input').attributes('id');
    expect(id).toBeTruthy();
    expect(wrapper.find('label').attributes('for')).toBe(id);
  });

  it('uses a consumer supplied id verbatim', () => {
    const wrapper = mountField({label: 'First Name', id: 'first-name'});
    expect(wrapper.find('input').attributes('id')).toBe('first-name');
    expect(wrapper.find('label').attributes('for')).toBe('first-name');
  });

  it('generates a distinct id per instance', () => {
    const first = mountField({label: 'First Name'});
    const second = mountField({label: 'Last Name'});
    expect(first.find('input').attributes('id')).not.toBe(
      second.find('input').attributes('id'),
    );
  });

  it.each(['checkboxgroup', 'radiogroup', 'radiopillgroup'])(
    'names a %s group without orphaning the label',
    type => {
      // `name` is required by radiopillgroup; harmless for the others
      const wrapper = mountField({
        label: 'Job Titles',
        type,
        options: [],
        name: 'job-titles',
      });
      const label = wrapper.find('label');

      // each member owns `${id}_${option.id}`, so nothing owns the field id —
      // a `for` here would point at no element at all
      expect(label.attributes('for')).toBeUndefined();

      // the group is named by pointing at the label instead
      const group = wrapper.find('[role="group"]');
      expect(group.exists()).toBe(true);
      expect(group.attributes('aria-labelledby')).toBe(label.attributes('id'));
      expect(label.attributes('id')).toBeTruthy();
    },
  );

  it('does not apply group semantics to a single control', () => {
    const wrapper = mountField({label: 'First Name', type: 'input'});
    expect(wrapper.find('[role="group"]').exists()).toBe(false);
    expect(wrapper.find('label').attributes('for')).toBe(
      wrapper.find('input').attributes('id'),
    );
  });

  // A field is only invalid when the injected form reports an error against
  // its cid, so an erroring form stands in for a failed validation rule.
  const invalidFormAPI: FormAPI = {
    ...mockFormAPI,
    searchErrors: jest.fn((cid: string) => [{cid, errors: ['Required']}]),
  };

  const mountInvalidField = (props: Record<string, unknown>) =>
    mount(InputField, {
      props,
      global: {provide: {[formKey as symbol]: invalidFormAPI}},
    });

  it('renders the message region before there is a message to put in it', () => {
    // v-if would have kept the region out of the accessibility tree until the
    // error appeared, and a region added at the same moment as its content is
    // not announced.
    const wrapper = mountField({label: 'First Name'});
    const region = wrapper.find('.oxd-input-group__message');

    expect(region.exists()).toBe(true);
    expect(region.attributes('role')).toBe('status');
    expect(region.text()).toBe('');
  });

  it('leaves a valid control unmarked', () => {
    const wrapper = mountField({label: 'First Name'});
    const input = wrapper.find('input');

    // absent, not aria-invalid="false" — the attribute is only meaningful
    // when the control really is invalid
    expect(input.attributes('aria-invalid')).toBeUndefined();
    expect(input.attributes('aria-describedby')).toBeUndefined();
  });

  it('marks an invalid control and points it at the message', () => {
    const wrapper = mountInvalidField({label: 'First Name'});
    const input = wrapper.find('input');
    const region = wrapper.find('.oxd-input-group__message');

    expect(input.attributes('aria-invalid')).toBe('true');
    expect(input.attributes('aria-describedby')).toBe(region.attributes('id'));
    expect(region.attributes('id')).toBeTruthy();
    expect(region.text()).toBe('Required');
  });

  it('appends to a consumer supplied aria-describedby rather than replacing it', () => {
    // $attrs is merged before InputField's own bindings, so a naive bind here
    // would drop the consumer's description entirely
    const wrapper = mountInvalidField({
      label: 'First Name',
      'aria-describedby': 'field-help',
    });
    const messageId = wrapper
      .find('.oxd-input-group__message')
      .attributes('id');

    expect(wrapper.find('input').attributes('aria-describedby')).toBe(
      `field-help ${messageId}`,
    );
  });

  it('keeps a consumer supplied aria-describedby when the field is valid', () => {
    const wrapper = mountField({
      label: 'First Name',
      'aria-describedby': 'field-help',
    });
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(
      'field-help',
    );
  });

  it.each(['checkboxgroup', 'radiogroup', 'radiopillgroup'])(
    'describes an invalid %s on the element carrying role=group',
    type => {
      const wrapper = mountInvalidField({
        label: 'Job Titles',
        type,
        options: [],
        name: 'job-titles',
      });
      const group = wrapper.find('[role="group"]');

      expect(group.attributes('aria-invalid')).toBe('true');
      expect(group.attributes('aria-describedby')).toBe(
        wrapper.find('.oxd-input-group__message').attributes('id'),
      );
    },
  );

  const mountNamed = (props: Record<string, unknown>) =>
    mount(InputField, {
      props,
      global: {provide: {[formKey as symbol]: mockFormAPI}},
    });

  it('hides a file input label from AT and names the control with it', () => {
    // A file input is exposed as a BUTTON. Screen readers do not suppress a
    // label that names a button the way they do for a textbox, so the label
    // was read as text and then again as the button's name - "Upload Resume"
    // twice under Orca.
    const wrapper = mountNamed({label: 'Upload Resume', type: 'file'});
    const label = wrapper.find('label');
    const input = wrapper.find('input[type="file"]');

    expect(label.attributes('aria-hidden')).toBe('true');
    // accname keeps an aria-hidden node that is DIRECTLY referenced by
    // aria-labelledby, so the control is still named. Without this reference
    // the field would go unnamed wherever aria-hidden is honoured during name
    // computation - a far worse failure than the duplicate.
    expect(input.attributes('aria-labelledby')).toBe(label.attributes('id'));
    expect(label.attributes('id')).toBeTruthy();
  });

  it('keeps the file label clickable', () => {
    // aria-hidden is AT-only; `for` still has to point at the input or the
    // label stops opening the file picker.
    const wrapper = mountNamed({label: 'Upload Resume', type: 'file'});
    expect(wrapper.find('label').attributes('for')).toBe(
      wrapper.find('input[type="file"]').attributes('id'),
    );
  });

  it('leaves ordinary field labels alone', () => {
    // Text fields are announced correctly today. Hiding their labels would
    // regress them, so the treatment is scoped to `file`.
    const wrapper = mountNamed({label: 'First Name', type: 'input'});
    const label = wrapper.find('label');

    expect(label.attributes('aria-hidden')).toBeUndefined();
    expect(wrapper.find('input').attributes('aria-labelledby')).toBeUndefined();
  });

  it.each(['checkboxgroup', 'radiogroup', 'radiopillgroup'])(
    'still names a %s without hiding its label',
    type => {
      // Groups are named by aria-labelledby because `for` cannot address
      // several controls - but their label must stay visible to AT.
      const wrapper = mountNamed({
        label: 'Job Titles',
        type,
        options: [],
        name: 'job-titles',
      });
      const label = wrapper.find('label');

      expect(label.attributes('aria-hidden')).toBeUndefined();
      expect(wrapper.find('[role="group"]').attributes('aria-labelledby')).toBe(
        label.attributes('id'),
      );
    },
  );
});
