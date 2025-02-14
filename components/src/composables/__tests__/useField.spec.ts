import {formKey} from '../types';
import useField from '../useField';
import {defineComponent, toRef, ref} from 'vue';
import {flushPromises, shallowMount} from '@vue/test-utils';

const mockRestFunction = jest.fn();
const purgeErrors = jest.fn();
const registerField = jest.fn();
const unregisterField = jest.fn();
const addError = jest.fn();
const searchErrors = jest.fn().mockImplementation(() => []);

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockReturnValue('RQo9uIESilqxkE9scKup7'),
}));

const TestField = defineComponent({
  name: 'Field',
  // eslint-disable-next-line vue/require-prop-types
  props: ['disabled', 'modelValue'],
  setup(props) {
    const disabled = toRef(props, 'disabled');
    const modelValue = toRef(props, 'modelValue');

    const {form, validate, reset, startWatcher} = useField({
      isDirty: false,
      fieldLabel: 'test',
      modelName: 'test',
      isDisabled: disabled,
      modelValue: modelValue,
      onReset: mockRestFunction,
      rules: ref([(v: string) => (!!v && v.trim() !== '') || 'Required']),
    });
    return {
      form,
      reset,
      validate,
      startWatcher,
    };
  },
  template: `<div></div>`,
});

const mountConfigs = {
  global: {
    provide: {
      [formKey as symbol]: {
        addError,
        purgeErrors,
        searchErrors,
        registerField,
        unregisterField,
      },
    },
  },
};

beforeEach(() => {
  addError.mockClear();
  purgeErrors.mockClear();
  searchErrors.mockClear();
  registerField.mockClear();
  unregisterField.mockClear();
  mockRestFunction.mockClear();
});

describe('components/src/composables/useField', () => {
  it('useField should inject FormAPI', async () => {
    const wrapper = shallowMount(TestField, {...mountConfigs});
    expect(wrapper.vm.form).toBeTruthy();
  });

  it('useField should register the field', async () => {
    shallowMount(TestField, {...mountConfigs});
    expect(registerField).toHaveBeenCalledTimes(1);
  });

  it('useField should unregister the field', async () => {
    shallowMount(TestField, {...mountConfigs}).unmount();
    expect(unregisterField).toHaveBeenCalledTimes(1);
  });

  it('useField should validate field', async () => {
    const wrapper = shallowMount(TestField, {
      ...mountConfigs,
      props: {
        modelValue: null,
      },
    });
    wrapper.vm.startWatcher();
    await wrapper.setProps({modelValue: ''});
    await flushPromises();
    expect(addError).toHaveBeenCalledWith({
      cid: 'RQo9uIESilqxkE9scKup7',
      errors: ['Required'],
    });
  });

  it('useField should not validate disabled field', async () => {
    const wrapper = shallowMount(TestField, {
      ...mountConfigs,
      props: {
        disabled: true,
        modelValue: null,
      },
    });
    wrapper.vm.startWatcher();
    await wrapper.setProps({modelValue: ''});
    await flushPromises();
    expect(addError).toHaveBeenCalledWith({
      cid: 'RQo9uIESilqxkE9scKup7',
      errors: [],
    });
  });
});
