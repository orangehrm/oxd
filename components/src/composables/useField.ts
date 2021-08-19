import {computed, onBeforeUnmount, Ref, ref} from 'vue';
import {nanoid} from 'nanoid';
import {injectStrict} from '../utils/injectable';
import {ErrorField, formKey, rule} from './types';

export default function useField(fieldContext: {
  fieldLabel: string;
  rules: rule[];
  modelValue: Ref<any>;
}) {
  const form = injectStrict(formKey);
  const cid = ref<string>(nanoid());
  const label = ref<string>(fieldContext.fieldLabel);
  const dirty = ref<boolean>(false);
  const touched = ref<boolean>(false);
  const processing = ref<boolean>(false);

  const validate = () => {
    const allValidation = Promise.all(
      fieldContext.rules.map(func => {
        return new Promise<string | boolean>(async (resolve, reject) => {
          try {
            const valid = await func(fieldContext.modelValue.value);
            if (typeof valid === 'string' || typeof valid === 'boolean') {
              resolve(valid);
            } else {
              throw new Error(
                `Rules should return a string or true, received '${typeof valid}'`,
              );
            }
          } catch (error) {
            reject(error);
          }
        });
      }),
    );

    return new Promise<ErrorField>((resolve, reject) => {
      allValidation
        .then(validationErrors => {
          resolve({
            cid: cid.value,
            errors: validationErrors.filter(
              e => typeof e === 'string',
            ) as string[],
          });
        })
        .catch(error => reject(error));
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

  const setProcessingState = (state: boolean) => {
    processing.value = state;
  };

  const getProcessingState = () => {
    return processing.value;
  };

  return {
    form,
    validate,
    hasError,
    message,
    setProcessingState,
    getProcessingState,
  };
}
