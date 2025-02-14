import {
  ref,
  computed,
  watchEffect,
  onBeforeUnmount,
  WatchStopHandle,
} from 'vue';
import {nanoid} from 'nanoid';
import {injectStrict} from '../utils/injectable';
import {
  ErrorField,
  FormAPI,
  formKey,
  ModelValue,
  Rules,
  FieldContext,
} from './types';
import {injectValidationHook} from './useValidationHooks';

export default function useField(fieldContext: FieldContext) {
  const form = injectStrict<FormAPI>(formKey);
  const validationHook = injectValidationHook();
  const cid = ref<string>(nanoid());
  const label = ref<string>(fieldContext.fieldLabel);
  const name = ref<string>(fieldContext.modelName);
  const dirty = ref<boolean>(fieldContext.isDirty);
  const touched = ref<boolean>(false);
  const processing = ref<boolean>(false);
  let watchHandler: WatchStopHandle | undefined;

  const getFieldSnapshot = () => ({
    cid: cid.value,
    label: label.value,
    dirty: dirty.value,
    touched: touched.value,
    modelName: name.value,
    modelValue: fieldContext.modelValue.value,
  });

  const validate = (modelValue: ModelValue, rules: Rules) => {
    const validationResult: ErrorField = {
      cid: cid.value,
      errors: [],
    };

    if (fieldContext.isDisabled.value) return Promise.resolve(validationResult);

    processing.value = true;
    const snapshot = getFieldSnapshot();
    validationHook?.onValidationStart?.(snapshot);

    const allValidations = Promise.all(
      rules.value.map(func => {
        return new Promise<boolean>((resolve, reject) => {
          Promise.resolve(func(modelValue.value)).then(valid => {
            if (valid === true) {
              resolve(valid);
            } else if (typeof valid === 'string') {
              reject(valid);
            } else {
              reject(
                new Error(
                  `Rules should return a string or true, received '${typeof valid}'`,
                ),
              );
            }
          });
        });
      }),
    );

    return new Promise<ErrorField>((resolve, reject) => {
      allValidations
        .then(() => {
          validationHook?.onSuccessfulValidation?.(snapshot);
          resolve(validationResult);
        })
        .catch(error => {
          if (typeof error === 'string') {
            validationResult.errors.push(error);
            validationHook?.onValidationError?.(snapshot, [error]);
            resolve(validationResult);
          } else {
            reject(error);
          }
        })
        .finally(() => {
          processing.value = false;
          validationHook?.onValidationComplete?.(snapshot, validationResult);
        });
    });
  };

  const startWatcher = () => {
    watchHandler = watchEffect(
      () => {
        validate(fieldContext.modelValue, fieldContext.rules).then(result => {
          form.addError(result);
        });
      },
      {flush: 'post'},
    );
  };

  const setDirty = (value: boolean) => {
    dirty.value = value;
  };

  const reset = () => {
    dirty.value = false;
    touched.value = false;
    processing.value = false;
    watchHandler && watchHandler(); // stop the validation watcher
    fieldContext.onReset();
  };

  validationHook?.onFieldRegister?.(getFieldSnapshot());

  form.registerField({
    cid,
    label,
    dirty,
    touched,
    processing,
    validate: () => validate(fieldContext.modelValue, fieldContext.rules),
    reset,
    startWatcher,
    setDirty,
  });

  onBeforeUnmount(() => {
    validationHook?.onFieldUnregister?.(getFieldSnapshot());
    form.unregisterField({
      cid,
      label,
      dirty,
      touched,
      processing,
      validate: () => validate(fieldContext.modelValue, fieldContext.rules),
      reset,
      startWatcher,
      setDirty,
    });
  });

  const hasError = computed(() => {
    return form.searchErrors(cid.value).length > 0;
  });

  const message = computed(() => {
    return hasError.value ? form.searchErrors(cid.value)[0].errors[0] : null;
  });

  return {
    form,
    reset,
    validate,
    hasError,
    message,
    dirty,
    startWatcher,
  };
}
