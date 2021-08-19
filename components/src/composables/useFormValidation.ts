import {provide, reactive, toRefs} from 'vue';
import {
  ErrorBag,
  ErrorField,
  Fieldset,
  FormAPI,
  FormField,
  formKey,
} from './types';

interface State {
  fieldset: Fieldset;
  errorbag: ErrorBag;
}

export default function useFormValidation() {
  const formState: State = reactive({
    fieldset: [],
    errorbag: [],
  });

  const searchErrors = (id: string) => {
    return formState.errorbag.filter(item => {
      return item.cid === id;
    });
  };

  const purgeErrors = (id: string) => {
    formState.errorbag = formState.errorbag.filter(item => item.cid !== id);
  };

  const addError = (errorField: ErrorField) => {
    purgeErrors(errorField.cid);
    if (errorField.errors.length > 0) formState.errorbag.push(errorField);
  };

  const registerField = (field: FormField) => {
    const i = formState.fieldset.findIndex(item => {
      return item.cid === field.cid;
    });
    if (i === -1) {
      formState.fieldset.push(field);
    }
  };

  const unregisterField = (field: FormField) => {
    purgeErrors(field.cid.value);
    const i = formState.fieldset.findIndex(item => {
      return item.cid === field.cid;
    });
    if (i > -1) {
      formState.fieldset.splice(i, 1);
    }
  };

  const validate = () => {
    return new Promise<void>(() => {
      Promise.all(formState.fieldset.map(field => field.validate()))
        .then(results => {
          results.map(errorField => {
            addError(errorField);
          });
        })
        .catch(reject => {
          console.error(reject);
        });
    });
  };

  provide(formKey, {
    validate,
    addError,
    purgeErrors,
    searchErrors,
    registerField,
    unregisterField,
  } as FormAPI);

  return {
    ...toRefs(formState),
    validate,
    purgeErrors,
  };
}
