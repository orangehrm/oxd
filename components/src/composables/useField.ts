import {computed, onBeforeUnmount, Ref, ref} from 'vue';
import {nanoid} from 'nanoid';
import {injectStrict} from '../utils/injectable';
import {ErrorField, formKey, rule} from './types';

export default function useField(fieldContext: {
  fieldLabel: string;
  rules: rule[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue: Ref<any>;
}) {
  const form = injectStrict(formKey);
  const cid = ref<string>(nanoid());
  const label = ref<string>(fieldContext.fieldLabel);
  const dirty = ref<boolean>(false);
  const touched = ref<boolean>(false);
  const processing = ref<boolean>(false);

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

  form.registerField({cid, label, dirty, touched, processing, validate});

  onBeforeUnmount(() => {
    form.unregisterField({cid, label, dirty, touched, processing, validate});
  });

  const hasError = computed(() => {
    return form.searchErrors(cid.value).length > 0;
  });

  const message = computed(() => {
    return hasError.value ? form.searchErrors(cid.value)[0].errors[0] : null;
  });

  return {
    form,
    validate,
    hasError,
    message,
  };
}
