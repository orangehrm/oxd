import {
  Rules,
  formKey,
  FormAPI,
  ErrorField,
  ModelValue,
  FieldState,
  FieldContext,
  FieldProperties,
  CustomSnapshotFn,
} from './types';
import {nanoid} from 'nanoid';
import {isEqual} from 'lodash-es';
import {injectStrict} from '../utils/injectable';
import {injectValidationHook} from './useValidationHooks';
import {ref, watch, computed, onBeforeUnmount, WatchStopHandle} from 'vue';

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

  const getFieldSnapshot = () => {
    const state: FieldState = {
      cid: cid.value,
      label: label.value,
      dirty: dirty.value,
      touched: touched.value,
      modelName: name.value,
      modelValue: fieldContext.modelValue.value,
      processing: processing.value,
    };

    if (typeof fieldContext.getSnapshot === 'function') {
      return (fieldContext.getSnapshot as CustomSnapshotFn)(state);
    }

    return {
      cid: state.cid,
      label: state.label,
      dirty: state.dirty,
      touched: state.touched,
      modelName: state.modelName,
      modelValue: state.modelValue,
    } as FieldProperties;
  };

  const validate = (
    modelValue: ModelValue,
    rules: Rules,
    modelUpdated?: boolean,
  ) => {
    const validationResult: ErrorField = {
      cid: cid.value,
      errors: [],
    };

    if (fieldContext.isDisabled.value) return Promise.resolve(validationResult);

    processing.value = true;
    const snapshot = getFieldSnapshot();
    if (modelUpdated) validationHook?.onValidationStart?.(snapshot);

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
          if (modelUpdated) validationHook?.onSuccessfulValidation?.(snapshot);
          resolve(validationResult);
        })
        .catch(error => {
          if (typeof error === 'string') {
            validationResult.errors.push(error);
            if (modelUpdated)
              validationHook?.onValidationError?.(snapshot, [error]);
            resolve(validationResult);
          } else {
            reject(error);
          }
        })
        .finally(() => {
          processing.value = false;
          if (modelUpdated)
            validationHook?.onValidationComplete?.(snapshot, validationResult);
        });
    });
  };

  const startWatcher = () => {
    watchHandler = watch(
      [fieldContext.modelValue, fieldContext.rules],
      ([newModelValue], [oldModelValue]) => {
        const isModelUpdated = !isEqual(newModelValue, oldModelValue);
        validate(
          fieldContext.modelValue,
          fieldContext.rules,
          isModelUpdated,
        ).then(result => {
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
