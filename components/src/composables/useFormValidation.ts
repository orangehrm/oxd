/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */

import {provide, reactive, Ref, toRefs, unref} from 'vue';
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

export default function useFormValidation(isLoading: Ref<boolean>) {
  const formState: State = reactive({
    fieldset: [],
    errorbag: [],
  });

  const searchErrors = (id: string) => {
    if (isLoading.value === true) return [];
    return formState.errorbag.filter((item) => {
      return item.cid === id;
    });
  };

  const purgeErrors = (id: string) => {
    formState.errorbag = formState.errorbag.filter((item) => item.cid !== id);
  };

  const addError = (errorField: ErrorField) => {
    purgeErrors(unref(errorField.cid));
    if (errorField.errors.length > 0) formState.errorbag.push(errorField);
  };

  const registerField = (field: FormField) => {
    const i = formState.fieldset.findIndex((item) => {
      return unref(item.cid) === unref(field.cid);
    });
    if (i === -1) {
      formState.fieldset.push(field);
    }
  };

  const unregisterField = (field: FormField) => {
    purgeErrors(unref(field.cid));

    const i = formState.fieldset.findIndex((item) => {
      return unref(item.cid) === unref(field.cid);
    });
    if (i > -1) {
      formState.fieldset.splice(i, 1);
    }
  };

  const validate = () => {
    return Promise.all(formState.fieldset.map((field) => field.validate()))
      .then((results) => {
        results.map((errorField) => {
          addError(errorField);
        });
      })
      .catch((reject) => {
        // eslint-disable-next-line no-console
        console.error(reject);
      });
  };

  const reset = () => {
    formState.fieldset.map((field) => field.reset());
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
