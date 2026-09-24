import {mount} from '@vue/test-utils';
import {nextTick, ref} from 'vue';
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

  it('renders the live region before there is a message to put in it', () => {
    // v-if would have kept the region out of the accessibility tree until the
    // error appeared, and a region added at the same moment as its content is
    // not announced. The live region is the announcer, not the visible text.
    const wrapper = mountField({label: 'First Name'});
    const region = wrapper.find('.oxd-input-field-announcer');

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
    // Already pointed at the (empty) description: an empty description is
    // not read, and the reference must not appear only once an error does.
    expect(input.attributes('aria-describedby')).toBe(
      wrapper.find('.oxd-input-field-description').attributes('id'),
    );
  });

  it('does not change aria-describedby when an error appears', () => {
    // Errors appear while the user is typing, i.e. on the FOCUSED control.
    // Adding the message id to aria-describedby at that moment makes a screen
    // reader announce the new description - and the live region announces
    // the same text, so the error was read twice.
    const valid = mountField({label: 'First Name', id: 'first-name'});
    const invalid = mountInvalidField({label: 'First Name', id: 'first-name'});

    expect(invalid.find('input').attributes('aria-invalid')).toBe('true');
    expect(invalid.find('input').attributes('aria-describedby')).toBe(
      valid.find('input').attributes('aria-describedby'),
    );
  });

  it('marks an invalid control and points it at the message', () => {
    const wrapper = mountInvalidField({label: 'First Name'});
    const input = wrapper.find('input');
    const region = wrapper.find('.oxd-input-group__message');
    const description = wrapper.find('.oxd-input-field-description');

    expect(input.attributes('aria-invalid')).toBe('true');
    // described by the (non-live) copy, announced by the live region
    expect(input.attributes('aria-describedby')).toBe(
      description.attributes('id'),
    );
    expect(description.text()).toBe('Required');
    // shown and described, but not announced: the user was not typing in
    // this field when the error appeared
    expect(region.text()).toBe('Required');
    expect(wrapper.find('.oxd-input-field-announcer').text()).toBe('');
  });

  it('appends to a consumer supplied aria-describedby rather than replacing it', () => {
    // $attrs is merged before InputField's own bindings, so a naive bind here
    // would drop the consumer's description entirely
    const wrapper = mountInvalidField({
      label: 'First Name',
      'aria-describedby': 'field-help',
    });
    const messageId = wrapper
      .find('.oxd-input-field-description')
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
    const messageId = wrapper
      .find('.oxd-input-field-description')
      .attributes('id');
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(
      `field-help ${messageId}`,
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
        wrapper.find('.oxd-input-field-description').attributes('id'),
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

  describe('while the control has focus', () => {
    // What a screen reader receives as the description: the text of every
    // element aria-describedby points at, not the attribute itself.
    const descriptionText = (wrapper: ReturnType<typeof mount>) =>
      (wrapper.find('input').attributes('aria-describedby') || '')
        .split(' ')
        .filter(Boolean)
        .map(id => document.getElementById(id)?.textContent?.trim() ?? '')
        .join(' ')
        .trim();

    const mountWithLiveErrors = () => {
      const errors = ref<string[]>([]);
      const form: FormAPI = {
        ...mockFormAPI,
        // reading the ref inside searchErrors makes `message` reactive
        searchErrors: jest.fn((cid: string) =>
          errors.value.length ? [{cid, errors: errors.value}] : [],
        ),
      };
      const wrapper = mount(InputField, {
        props: {label: 'Email'},
        attachTo: document.body,
        global: {provide: {[formKey as symbol]: form}},
      });
      return {wrapper, errors};
    };

    it('keeps its description steady when an error appears while typing', async () => {
      // Orca 46 + Chrome, measured: typing an invalid email spoke "Expected
      // format: admin@example.com" twice - once from
      // object:property-change:accessible-description on the focused entry,
      // once from the role="status" region. The live region must be the
      // only thing that changes while the user is in the field.
      const {wrapper, errors} = mountWithLiveErrors();
      const input = wrapper.find('input');
      (input.element as HTMLInputElement).focus();
      await input.trigger('focusin');
      const before = descriptionText(wrapper);

      errors.value = ['Expected format: admin@example.com'];
      await nextTick();

      expect(wrapper.find('.oxd-input-group__message').text()).toBe(
        'Expected format: admin@example.com',
      );
      expect(descriptionText(wrapper)).toBe(before);
      wrapper.unmount();
    });

    it('describes the error once focus leaves, so returning to the field reads it', async () => {
      const {wrapper, errors} = mountWithLiveErrors();
      const input = wrapper.find('input');
      (input.element as HTMLInputElement).focus();
      await input.trigger('focusin');
      errors.value = ['Expected format: admin@example.com'];
      await nextTick();

      await input.trigger('focusout');

      expect(descriptionText(wrapper)).toBe(
        'Expected format: admin@example.com',
      );
      wrapper.unmount();
    });

    it('stops describing an error as soon as the focused field becomes valid', async () => {
      // The copy is frozen while focused so a new error is not spoken twice,
      // but a field the user has just fixed must not keep reporting its old
      // error to anyone who queries it (PR 910 review). Clearing a
      // description announces nothing, so this costs no extra speech.
      const {wrapper, errors} = mountWithLiveErrors();
      errors.value = ['Required']; // e.g. raised on submit
      await nextTick();
      const input = wrapper.find('input');
      (input.element as HTMLInputElement).focus();
      await input.trigger('focusin');
      expect(descriptionText(wrapper)).toBe('Required');

      errors.value = [];
      await nextTick();

      expect(descriptionText(wrapper)).toBe('');
      wrapper.unmount();
    });

    it('describes an error that appears while unfocused straight away', async () => {
      // e.g. submit: focus is on the button, not the field
      const {wrapper, errors} = mountWithLiveErrors();
      errors.value = ['Required'];
      await nextTick();

      expect(descriptionText(wrapper)).toBe('Required');
      wrapper.unmount();
    });
  });

  describe('announcing an error', () => {
    // Orca 46 with key echo, measured with real X keystrokes: every keypress
    // runs "Interrupting presentation" + "Flushing live region messages", so
    // an error announced the moment it appears is thrown away by the next
    // key the user types. The error is therefore announced once the user
    // pauses, from a dedicated live region; the visible message stays
    // immediate but is no longer itself a live region.
    const mountLive = () => {
      const errors = ref<string[]>([]);
      const form: FormAPI = {
        ...mockFormAPI,
        searchErrors: jest.fn((cid: string) =>
          errors.value.length ? [{cid, errors: errors.value}] : [],
        ),
      };
      const wrapper = mount(InputField, {
        props: {label: 'Email', modelValue: ''},
        attachTo: document.body,
        global: {provide: {[formKey as symbol]: form}},
      });
      return {wrapper, errors};
    };
    const announcer = (w: ReturnType<typeof mount>) =>
      w.find('.oxd-input-field-announcer');
    const focus = async (w: ReturnType<typeof mount>) => {
      const input = w.find('input');
      (input.element as HTMLInputElement).focus();
      await input.trigger('focusin');
    };

    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('is the only live region in the field', () => {
      const {wrapper} = mountLive();
      const live = wrapper.findAll('[role="status"], [aria-live]');

      expect(live).toHaveLength(1);
      expect(live[0].classes()).toContain('oxd-input-field-announcer');
      expect(
        wrapper.find('.oxd-input-group__message').attributes('role'),
      ).toBeUndefined();
      wrapper.unmount();
    });

    it('waits for the user to pause typing before announcing', async () => {
      const {wrapper, errors} = mountLive();
      await focus(wrapper);

      errors.value = ['Expected format: admin@example.com'];
      await wrapper.setProps({modelValue: 'x'});
      // visible at once, but not announced mid-typing
      expect(wrapper.find('.oxd-input-group__message').text()).toBe(
        'Expected format: admin@example.com',
      );
      expect(announcer(wrapper).text()).toBe('');

      jest.advanceTimersByTime(600);
      await wrapper.setProps({modelValue: 'xy'}); // still typing: restart
      jest.advanceTimersByTime(600);
      await nextTick();
      expect(announcer(wrapper).text()).toBe('');

      jest.advanceTimersByTime(500);
      await nextTick();
      expect(announcer(wrapper).text()).toBe(
        'Expected format: admin@example.com',
      );
      wrapper.unmount();
    });

    it('clears the announcement afterwards so line-by-line reading does not repeat it', async () => {
      const {wrapper, errors} = mountLive();
      await focus(wrapper);
      errors.value = ['Required'];
      await nextTick();
      jest.advanceTimersByTime(1000);
      await nextTick();
      expect(announcer(wrapper).text()).toBe('Required');

      jest.advanceTimersByTime(5000);
      await nextTick();
      expect(announcer(wrapper).text()).toBe('');
      wrapper.unmount();
    });

    it('announces straight away when focus leaves before the pause', async () => {
      const {wrapper, errors} = mountLive();
      await focus(wrapper);
      errors.value = ['Required'];
      await nextTick();

      await wrapper.find('input').trigger('focusout');
      expect(announcer(wrapper).text()).toBe('Required');
      wrapper.unmount();
    });

    it('announces the same error again when it comes back', async () => {
      // Measured on the user's own Chrome (AT-SPI log): clear Last Name ->
      // "Required" announced; type -> valid; clear again -> NOTHING. The
      // announcer still held "Required", so writing the same text changed
      // nothing and the screen reader had no change to announce.
      const {wrapper, errors} = mountLive();
      await focus(wrapper);

      errors.value = ['Required'];
      await wrapper.setProps({modelValue: ''});
      jest.advanceTimersByTime(1000);
      await nextTick();
      expect(announcer(wrapper).text()).toBe('Required');

      errors.value = []; // user types: valid
      await wrapper.setProps({modelValue: 'a'});
      errors.value = ['Required']; // user clears it again
      await wrapper.setProps({modelValue: ''});
      jest.advanceTimersByTime(1000);
      await nextTick();
      // emptied first, so the rewrite is a real change
      expect(announcer(wrapper).text()).toBe('');
      jest.advanceTimersByTime(150);
      await nextTick();
      expect(announcer(wrapper).text()).toBe('Required');
      wrapper.unmount();
    });

    it('drops a pending re-announcement once the error is no longer current', async () => {
      // PR 910 review: the same-text rewrite waits 100ms. If the user typed
      // in that gap and the error cleared, nothing cancelled the rewrite, so
      // the old "Required" was spoken after it had stopped being true.
      const {wrapper, errors} = mountLive();
      await focus(wrapper);
      errors.value = ['Required'];
      await wrapper.setProps({modelValue: ''});
      jest.advanceTimersByTime(1000);
      await nextTick();
      expect(announcer(wrapper).text()).toBe('Required');

      // same error again -> rewrite armed (announcer emptied, 100ms gap)
      errors.value = [];
      await wrapper.setProps({modelValue: 'a'});
      errors.value = ['Required'];
      await wrapper.setProps({modelValue: ''});
      jest.advanceTimersByTime(1000);
      await nextTick();
      expect(announcer(wrapper).text()).toBe('');

      // user types inside the gap and the field becomes valid
      errors.value = [];
      await wrapper.setProps({modelValue: 'ab'});
      // when the rewrite would have fired - the moment it would be spoken
      jest.advanceTimersByTime(150);
      await nextTick();
      expect(announcer(wrapper).text()).toBe('');
      jest.advanceTimersByTime(2000);
      await nextTick();
      expect(announcer(wrapper).text()).toBe('');
      wrapper.unmount();
    });

    it('never repeats the exact text of the previous announcement, across fields', async () => {
      // Orca 46 (web/script_utilities.py handleAsLiveRegion) drops a live
      // region text insert whose text equals the LAST one it queued - page
      // wide, from any field: "Event is believed to be duplicate message".
      // So after First Name announced "Required", Last Name's "Required" was
      // silently dropped. Consecutive announcements must differ in raw text;
      // the difference is a trailing no-break space, which Orca strips before
      // speaking and trim() removes, so nothing heard or seen changes.
      const first = mountLive();
      const second = mountLive();
      const raw = (w: ReturnType<typeof mount>) =>
        (announcer(w).element.textContent || '').replace(/^\s+(?=\S)/, '');

      await focus(first.wrapper);
      first.errors.value = ['Required'];
      await nextTick();
      jest.advanceTimersByTime(1000);
      await nextTick();

      await focus(second.wrapper);
      second.errors.value = ['Required'];
      await nextTick();
      jest.advanceTimersByTime(1000);
      await nextTick();

      expect(announcer(first.wrapper).text()).toBe('Required');
      expect(announcer(second.wrapper).text()).toBe('Required');
      expect(raw(second.wrapper)).not.toBe(raw(first.wrapper));
      first.wrapper.unmount();
      second.wrapper.unmount();
    });

    it('never leaves the announcer completely empty', async () => {
      // Orca 46 caches per element whether it "has text"
      // (treatAsTextObject: character count > 0). Reading the page in browse
      // mode walked over the EMPTY announcer, cached "no text", and every
      // later error from that field was dropped (rig: arrowed over First/Last
      // Name, then neither announced "Required"). An idle no-break space keeps
      // the count above zero; Orca strips it, so nothing is spoken.
      const {wrapper, errors} = mountLive();
      const raw = () => announcer(wrapper).element.textContent || '';
      expect(raw().length).toBeGreaterThan(0);
      expect(announcer(wrapper).text()).toBe('');

      await focus(wrapper);
      errors.value = ['Required'];
      await nextTick();
      jest.advanceTimersByTime(1000);
      await nextTick();
      expect(announcer(wrapper).text()).toBe('Required');

      jest.advanceTimersByTime(5000); // auto-clear
      await nextTick();
      expect(announcer(wrapper).text()).toBe('');
      expect(raw().length).toBeGreaterThan(0);
      wrapper.unmount();
    });

    it('leaves an error raised while unfocused (submit) to the form', async () => {
      // On submit every invalid field got its error at once while focus was
      // on the Apply button, so Orca spoke "Required" alongside the form's
      // own "Please fill in all required fields" toast. QA's expected
      // behaviour is the toast alone. The field still shows the error and
      // describes it, so tabbing to it reads "invalid entry, Required".
      const {wrapper, errors} = mountLive();
      errors.value = ['Required'];
      await nextTick();
      jest.advanceTimersByTime(2000);
      await nextTick();

      expect(announcer(wrapper).text()).toBe('');
      expect(wrapper.find('.oxd-input-group__message').text()).toBe('Required');
      expect(wrapper.find('.oxd-input-field-description').text()).toBe(
        'Required',
      );
      wrapper.unmount();
    });
  });

  it('describes a control with its hint', () => {
    // The hint carries instructions - accepted file types, a size cap, a
    // required format. It rendered with no id, so nothing referenced it and a
    // reader tabbing between fields never reached it: it sat in the tree as a
    // loose paragraph after the control.
    const wrapper = mountNamed({
      label: 'Upload Resume',
      type: 'file',
      hint: 'Accepts .pdf up to 5MB',
    });
    const hint = wrapper.find('.oxd-input-field-hint');
    const describedBy = wrapper
      .find('input[type="file"]')
      .attributes('aria-describedby');

    expect(hint.attributes('id')).toBeTruthy();
    expect(describedBy).toBe(
      `${hint.attributes('id')} ${wrapper
        .find('.oxd-input-field-description')
        .attributes('id')}`,
    );
  });

  it('describes with hint and error together, hint first', () => {
    const wrapper = mount(InputField, {
      props: {label: 'First Name', hint: 'Letters only'},
      global: {provide: {[formKey as symbol]: invalidFormAPI}},
    });
    const ids = wrapper
      .find('input')
      .attributes('aria-describedby')
      .split(' ');

    expect(ids).toHaveLength(2);
    expect(ids[0]).toBe(wrapper.find('.oxd-input-field-hint').attributes('id'));
    expect(ids[1]).toBe(
      wrapper.find('.oxd-input-field-description').attributes('id'),
    );
  });

  it('still appends to a consumer aria-describedby when a hint is present', () => {
    const wrapper = mountNamed({
      label: 'First Name',
      hint: 'Letters only',
      'aria-describedby': 'field-help',
    });
    const ids = wrapper
      .find('input')
      .attributes('aria-describedby')
      .split(' ');

    expect(ids[0]).toBe('field-help');
    expect(ids[1]).toBe(wrapper.find('.oxd-input-field-hint').attributes('id'));
  });

  it('points only at the empty description when there is no hint or error', () => {
    const wrapper = mountNamed({label: 'First Name'});
    const description = wrapper.find('.oxd-input-field-description');

    expect(description.text()).toBe('');
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(
      description.attributes('id'),
    );
  });

  it.each(['select', 'multiselect', 'treeselect'])(
    'opens the %s dropdown when its label is clicked',
    async type => {
      // All three render SelectText, whose focusable element is a <div>, and
      // `for` only addresses labelable elements - so none of them get native
      // label-click behaviour and all three need the forwarding.
      const wrapper = mount(InputField, {
        props: {label: 'Job Title', type, options: []},
        attachTo: document.body,
        global: {provide: {[formKey as symbol]: mockFormAPI}},
      });
      expect(wrapper.find('label').attributes('for')).toBeUndefined();
      expect(wrapper.find('.oxd-select-dropdown').exists()).toBe(false);
      // treeselect deliberately claims no combobox role - its popup is a table
      // of checkbox rows, not a listbox - so only assert the state on the two
      // that do.
      const hasCombobox = type !== 'treeselect';
      if (hasCombobox) {
        expect(
          wrapper.find('[role="combobox"]').attributes('aria-expanded'),
        ).toBe('false');
      }

      await wrapper.find('label').trigger('click');
      await new Promise(r => setTimeout(r, 0));

      expect(wrapper.find('.oxd-select-dropdown').exists()).toBe(true);
      // and the combobox must report the new state, not just render a popup
      if (hasCombobox) {
        expect(
          wrapper.find('[role="combobox"]').attributes('aria-expanded'),
        ).toBe('true');
      }
      wrapper.unmount();
    },
  );

  it('gives the tree select control a unique id', async () => {
    // TreeSelect lacked inheritAttrs: false, so the id fell through onto its
    // wrapper AND was bound onto the control - two elements sharing one id.
    // getElementById then resolved to the wrapper, which has no click handler,
    // so anything addressing the control by id reached the wrong element.
    const wrapper = mount(InputField, {
      props: {label: 'Job Title', type: 'treeselect', options: [], id: 'tree'},
      attachTo: document.body,
      global: {provide: {[formKey as symbol]: mockFormAPI}},
    });

    expect(document.querySelectorAll('#tree')).toHaveLength(1);
    expect(document.getElementById('tree')).toBe(
      wrapper.find('.oxd-select-text').element,
    );
    wrapper.unmount();
  });

  it('does not double-activate a label that has a native for', async () => {
    // A text field keeps `for`, so the browser already activates it. Firing a
    // second synthetic click would toggle twice on anything stateful.
    const wrapper = mount(InputField, {
      props: {label: 'First Name', type: 'input'},
      attachTo: document.body,
      global: {provide: {[formKey as symbol]: mockFormAPI}},
    });
    const input = wrapper.find('input');
    let clicks = 0;
    input.element.addEventListener('click', () => (clicks += 1));

    await wrapper.find('label').trigger('click');
    expect(clicks).toBeLessThanOrEqual(1);
    wrapper.unmount();
  });

  it.each(['select', 'input'])(
    'keeps a consumer aria-labelledby on a %s with no label prop',
    type => {
      // A consumer that renders its own label and names the control by
      // reference passes aria-labelledby as a fallthrough attribute. It
      // arrives via v-bind="$attrs", but the explicit :aria-labelledby binding
      // is declared AFTER that, so a null from here does not fall back to the
      // inherited value - it ERASES it, leaving the control with no accessible
      // name at all. Reported against custom questions on the candidate apply
      // form across Ubuntu, Firefox, Chrome, macOS and iOS.
      const wrapper = mount(InputField, {
        props: {type, options: []},
        attrs: {'aria-labelledby': 'consumer-label'},
        global: {provide: {[formKey as symbol]: mockFormAPI}},
      });
      const control = wrapper.find(
        type === 'select' ? '[role="combobox"]' : 'input',
      );
      expect(control.attributes('aria-labelledby')).toBe('consumer-label');
    },
  );

  it('prefers its own label over an inherited aria-labelledby', () => {
    // When InputField renders the label itself it owns the naming, and its
    // labelId must win - otherwise adding a label to an existing consumer
    // would silently keep pointing at the consumer's element.
    const wrapper = mount(InputField, {
      props: {label: 'Job Title', type: 'select', options: []},
      attrs: {'aria-labelledby': 'consumer-label'},
      global: {provide: {[formKey as symbol]: mockFormAPI}},
    });
    const labelId = wrapper.find('label').attributes('id');

    expect(labelId).toBeTruthy();
    expect(
      wrapper.find('[role="combobox"]').attributes('aria-labelledby'),
    ).toBe(labelId);
  });

  it('names a labelled plain input by its own <label>, not an inherited aria-labelledby', () => {
    // aria-labelledby overrides a native <label for>. Returning the inherited
    // value here replaced "First Name" with whatever the consumer pointed at,
    // although the component renders - and owns - the label. (PR 910 review.)
    const wrapper = mount(InputField, {
      props: {label: 'First Name', id: 'first-name'},
      attrs: {'aria-labelledby': 'consumer-label'},
      global: {provide: {[formKey as symbol]: mockFormAPI}},
    });

    expect(wrapper.find('input').attributes('aria-labelledby')).toBeUndefined();
    expect(wrapper.find('label').attributes('for')).toBe('first-name');
  });

  it('adds no aria-labelledby when there is neither a label nor an inherited one', () => {
    const wrapper = mount(InputField, {
      props: {type: 'input'},
      global: {provide: {[formKey as symbol]: mockFormAPI}},
    });
    expect(wrapper.find('input').attributes('aria-labelledby')).toBeUndefined();
  });
});
