<!--
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
-->

<script lang="ts">
import {computed, defineComponent, h, unref} from 'vue';
import {TYPES, TYPE_BOOTSTRAP} from './types';
import * as SVGs from './map';
import SVGLoader from '@ohrm/oxd/core/components/Icon/SVGLoader.vue';

export default defineComponent({
  name: 'oxd-icon',

  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: TYPE_BOOTSTRAP,
      validator: (value: string) => {
        return TYPES.indexOf(value) !== -1;
      },
    },
  },

  setup(props) {
    const classes = computed(() => {
      return {
        'oxd-icon': true,
        [`bi-${props.name}`]: props.type === TYPE_BOOTSTRAP,
      };
    });

    return () =>
      props.type === TYPE_BOOTSTRAP
        ? h('i', {class: unref(classes)})
        : h(
            SVGLoader,
            {class: unref(classes)},
            {default: () => h(SVGs[props.name])},
          );
  },
});
</script>

<style src="./icon.scss" lang="scss" scoped></style>
