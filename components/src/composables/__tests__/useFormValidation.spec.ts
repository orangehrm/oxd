import {inject, ref, h} from 'vue';
import {mount} from '@vue/test-utils';
import {formKey, FormAPI} from '../types';
import useFormValidation from '../useFormValidation';

const TestForm = {
  name: 'form',
  setup() {
    const {
      fieldset,
      errorbag,
      reset,
      validate,
      purgeErrors,
    } = useFormValidation();
    return {
      fieldset,
      errorbag,
      reset,
      validate,
      purgeErrors,
    };
  },
  template: `<form><slot></slot></form>`,
};

describe('components/src/composables/useFormValidation', () => {
  it('useFormValidation should provide FormAPI', async () => {
    let formHandler: FormAPI | undefined;
    mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              formHandler = inject<FormAPI>(formKey);
            },
            template: `<input />`,
          }),
      },
    });
    expect(formHandler).toBeTruthy();
  });

  it('useFormValidation should register form field', async () => {
    const wrapper = mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              const formHandler = inject<FormAPI>(formKey);
              formHandler?.registerField({
                cid: ref('001'),
                dirty: ref(false),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(false),
                validate: jest.fn(),
                reset: jest.fn(),
                startWatcher: jest.fn(),
                setDirty: jest.fn(),
              });
            },
            template: `<input />`,
          }),
      },
    });
    expect(wrapper.vm.fieldset.length).toStrictEqual(1);
  });

  it('useFormValidation should unregister form field', async () => {
    const wrapper = mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              const formHandler = inject<FormAPI>(formKey);
              formHandler?.registerField({
                cid: ref('001'),
                dirty: ref(false),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(false),
                validate: jest.fn(),
                reset: jest.fn(),
                startWatcher: jest.fn(),
                setDirty: jest.fn(),
              });
              formHandler?.unregisterField({
                cid: ref('001'),
                dirty: ref(false),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(false),
                validate: jest.fn(),
                reset: jest.fn(),
                startWatcher: jest.fn(),
                setDirty: jest.fn(),
              });
            },
            template: `<input />`,
          }),
      },
    });
    expect(wrapper.vm.fieldset.length).toStrictEqual(0);
  });

  it('useFormValidation should accept error for field', async () => {
    const wrapper = mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              const formHandler = inject<FormAPI>(formKey);
              formHandler?.registerField({
                cid: ref('001'),
                dirty: ref(false),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(false),
                reset: jest.fn(),
                validate: jest.fn(),
                startWatcher: jest.fn(),
                setDirty: jest.fn(),
              });
              formHandler?.addError({
                cid: '001',
                errors: ['Required'],
              });
            },
            template: `<input />`,
          }),
      },
    });
    expect(wrapper.vm.errorbag.length).toStrictEqual(1);
  });

  it('useFormValidation should validate all fields', async () => {
    const wrapper = mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              const formHandler = inject<FormAPI>(formKey);
              formHandler?.registerField({
                cid: ref('001'),
                dirty: ref(true),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(true),
                reset: jest.fn(),
                validate: () =>
                  Promise.resolve({
                    cid: '001',
                    errors: ['Required'],
                  }),
                startWatcher: jest.fn(),
                setDirty: jest.fn(),
              });
              formHandler?.registerField({
                cid: ref('002'),
                dirty: ref(true),
                label: ref('Test 2'),
                processing: ref(false),
                touched: ref(true),
                reset: jest.fn(),
                validate: () =>
                  Promise.resolve({
                    cid: '002',
                    errors: ['Required'],
                  }),
                startWatcher: jest.fn(),
                setDirty: jest.fn(),
              });
            },
            template: `<input />`,
          }),
      },
    });
    await wrapper.vm.validate();
    expect(wrapper.vm.errorbag.length).toStrictEqual(2);
  });

  it('useFormValidation should remove error for field', async () => {
    const wrapper = mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              const formHandler = inject<FormAPI>(formKey);
              formHandler?.registerField({
                cid: ref('001'),
                dirty: ref(false),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(false),
                reset: jest.fn(),
                validate: jest.fn(),
                startWatcher: jest.fn(),
                setDirty: jest.fn(),
              });
              formHandler?.addError({
                cid: '001',
                errors: ['Required'],
              });
              formHandler?.purgeErrors('001');
            },
            template: `<input />`,
          }),
      },
    });
    expect(wrapper.vm.errorbag.length).toStrictEqual(0);
  });

  it('useFormValidation should reset all fields', async () => {
    const mockValidateFunction = jest.fn().mockImplementation(() =>
      Promise.resolve({
        cid: '001',
        errors: ['Required'],
      }),
    );
    const mockRestFunction = jest.fn();
    const wrapper = mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              const formHandler = inject<FormAPI>(formKey);
              formHandler?.registerField({
                cid: ref('001'),
                dirty: ref(true),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(true),
                reset: mockRestFunction,
                validate: mockValidateFunction,
                startWatcher: jest.fn(),
                setDirty: jest.fn(),
              });
              formHandler?.registerField({
                cid: ref('002'),
                dirty: ref(true),
                label: ref('Test 2'),
                processing: ref(false),
                touched: ref(true),
                reset: mockRestFunction,
                validate: mockValidateFunction,
                startWatcher: jest.fn(),
                setDirty: jest.fn(),
              });
            },
            template: `<input />`,
          }),
      },
    });
    await wrapper.vm.validate();
    expect(mockValidateFunction).toHaveBeenCalledTimes(2);
    wrapper.vm.reset();
    expect(mockRestFunction).toHaveBeenCalledTimes(2);
  });

  it('useFormValidation should search errors for field', async () => {
    let formHandler: FormAPI | undefined;
    mount(TestForm, {
      slots: {
        default: () =>
          h({
            name: 'field',
            setup() {
              formHandler = inject<FormAPI>(formKey);
              formHandler?.registerField({
                cid: ref('001'),
                dirty: ref(false),
                label: ref('Test'),
                processing: ref(false),
                touched: ref(false),
                reset: jest.fn(),
                validate: jest.fn(),
                startWatcher: jest.fn(),
                setDirty: jest.fn(),
              });
            },
            template: `<input />`,
          }),
      },
    });

    expect(formHandler?.searchErrors('001').length).toStrictEqual(0);
    formHandler?.addError({
      cid: '001',
      errors: ['Required'],
    });
    expect(formHandler?.searchErrors('001').length).toStrictEqual(1);
  });
});
