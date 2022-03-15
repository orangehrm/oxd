import {ref, Ref, watch, computed, onBeforeUnmount, WatchStopHandle} from 'vue';
import {nanoid} from 'nanoid';
import {injectStrict} from '../utils/injectable';
import {ErrorField, FormAPI, formKey, rule} from './types';

export default function useField(fieldContext: {
  fieldLabel: string;
  rules: rule[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue: Ref<any>;
  onReset: () => Promise<void>;
}) {
  const form = injectStrict<FormAPI>(formKey);
  const cid = ref<string>(nanoid());
  const label = ref<string>(fieldContext.fieldLabel);
  const dirty = ref<boolean>(false);
  const touched = ref<boolean>(false);
  const processing = ref<boolean>(false);
  let watchHandler: WatchStopHandle;

  const validate = () => {
    processing.value = true;
    const allValidations = Promise.all(
      fieldContext.rules.map(func => {
        return new Promise<boolean>((resolve, reject) => {
          Promise.resolve(func(fieldContext.modelValue.value)).then(valid => {
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
          resolve({
            cid: cid.value,
            errors: [],
          });
        })
        .catch(error => {
          if (typeof error === 'string') {
            resolve({
              cid: cid.value,
              errors: [error],
            });
          } else {
            reject(error);
          }
        })
        .finally(() => {
          processing.value = false;
        });
    });
  };

  const startWatcher = () => {
    watchHandler = watch(fieldContext.modelValue, () => {
      validate().then(result => {
        form.addError(result);
      });
    });
  };

  startWatcher();

  const reset = () => {
    dirty.value = false;
    touched.value = false;
    processing.value = false;
    watchHandler(); // stop the validation watcher
    fieldContext.onReset().then(() => startWatcher());
  };

  form.registerField({cid, label, dirty, touched, processing, validate, reset});

  onBeforeUnmount(() => {
    form.unregisterField({
      cid,
      label,
      dirty,
      touched,
      processing,
      validate,
      reset,
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
  };
}
