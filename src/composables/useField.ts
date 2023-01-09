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

import {nanoid} from 'nanoid';
import {formKey} from './types';
import type {Ref, WatchStopHandle} from 'vue';
import {injectStrict} from '../utils/injectable';
import type {ErrorField, FormAPI, Rule} from './types';
import {ref, watch, computed, onBeforeUnmount} from 'vue';

export default function useField(fieldContext: {
  fieldLabel: string;
  rules: Rule[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue: Ref<any>;
  onReset: () => Promise<void>;
  disabled: Ref<boolean>;
}) {
  const form = injectStrict<FormAPI>(formKey);
  const cid = ref<string>(nanoid());
  const label = ref<string>(fieldContext.fieldLabel);
  const dirty = ref<boolean>(false);
  const touched = ref<boolean>(false);
  const processing = ref<boolean>(false);
  let watchHandler: WatchStopHandle;

  const validate = () => {
    if (fieldContext.disabled.value) {
      return Promise.resolve({cid: cid.value, errors: []});
    }

    async function allValidations() {
      for (const rule of fieldContext.rules) {
        const validationOutput = await rule(fieldContext.modelValue.value);
        if (validationOutput === true) continue;
        return typeof validationOutput === 'string'
          ? validationOutput
          : `Rules should return a string or true, received '${typeof validationOutput}'`;
      }
    }

    return new Promise<ErrorField>((resolve) => {
      processing.value = true;
      allValidations()
        .then((resolved) => {
          resolve({
            cid: cid.value,
            errors: typeof resolved === 'string' ? [resolved] : [],
          });
        })
        .finally(() => {
          processing.value = false;
        });
    });
  };

  const startWatcher = () => {
    watchHandler = watch(fieldContext.modelValue, () => {
      validate().then((result) => {
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
