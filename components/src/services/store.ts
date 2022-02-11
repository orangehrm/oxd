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

import {ref} from 'vue';

export type Config<T extends string | number | symbol, K> = Record<T, K>;

export type Formats = 'displayFormat' | 'outputFormat';

export interface ConfigStore {
  date?: Config<Formats, string>;
  time?: Config<Formats, string>;
  colors?: Config<string, string>;
  language: Config<string, string>;
}

export type ConfigKey = keyof ConfigStore;
export type ConfigValue = {
  [key in keyof ConfigStore]: ConfigStore[key];
};

export type ConfigSetter = (config: ConfigStore) => ConfigValue;

/**
 * define any globally required config parameter
 */
export const store = ref<ConfigStore>({
  language: {},
});

export const getConfig = (key: ConfigKey) => {
  return store.value[key];
};

export const setConfig = (value: ConfigValue | ConfigSetter) => {
  const resolvedConfig =
    typeof value === 'function' ? value(store.value) : value;
  store.value = JSON.parse(JSON.stringify(resolvedConfig));
};

export const mergeConfig = (value: ConfigValue | ConfigSetter) => {
  const resolvedConfig =
    typeof value === 'function' ? value(store.value) : value;
  const clonedConfig = JSON.parse(JSON.stringify(store.value));

  for (const config in resolvedConfig) {
    const values = resolvedConfig[config as ConfigKey];
    for (const key in values) {
      clonedConfig[config][key] = values[key as keyof typeof values];
    }
  }
  store.value = {...clonedConfig};
};
