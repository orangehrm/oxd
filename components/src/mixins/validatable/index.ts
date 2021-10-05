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

import {defineComponent} from 'vue';

export const validatableMixin = defineComponent({
  data() {
    return {
      errorBucket: [] as string[],
    };
  },

  props: {
    rules: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate(value?: any) {
      const errorBucket = [];

      for (let index = 0; index < this.rules.length; index++) {
        const rule = this.rules[index];
        const valid = typeof rule === 'function' ? rule(value) : rule;

        if (typeof valid === 'string') {
          errorBucket.push(valid || '');
          // eslint-disable-next-line no-empty
        } else if (valid === true) {
        } else {
          // eslint-disable-next-line no-console
          console.error(
            `Rules should return a string or true, received '${typeof valid}'`,
          );
        }
      }

      this.errorBucket = errorBucket;
    },
  },
});

export default validatableMixin;
