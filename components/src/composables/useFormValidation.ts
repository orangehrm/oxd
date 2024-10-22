import {provide, reactive, toRefs, unref} from 'vue';
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
    purgeErrors(unref(errorField.cid));
    if (errorField.errors.length > 0) formState.errorbag.push(errorField);
  };

  const registerField = (field: FormField) => {
    const i = formState.fieldset.findIndex(item => {
      return unref(item.cid) === unref(field.cid);
    });
    if (i === -1) {
      formState.fieldset.push(field);
    }
  };

  const unregisterField = (field: FormField) => {
    purgeErrors(unref(field.cid));

    const i = formState.fieldset.findIndex(item => {
      return unref(item.cid) === unref(field.cid);
    });
    if (i > -1) {
      formState.fieldset.splice(i, 1);
    }
  };

  const validate = () => {
    return Promise.all(
      formState.fieldset.map(field => {
        if (!field.dirty.value) {
          field.setDirty(true);
          field.startWatcher();
        }
        return field.validate();
      }),
    )
      .then(results => {
        formState.errorbag = [];
        results.map(errorField => {
          addError(errorField);
        });
      })
      .catch(reject => {
        // eslint-disable-next-line no-console
        console.error(reject);
      });
  };

  const reset = () => {
    formState.fieldset.map(field => field.reset());
    formState.errorbag = [];
  };

  provide(formKey, {
    addError,
    purgeErrors,
    searchErrors,
    registerField,
    unregisterField,
  } as FormAPI);

  return {
    ...toRefs(formState),
    reset,
    validate,
    purgeErrors,
  };
}
