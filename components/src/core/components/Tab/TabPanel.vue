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
import {
  h,
  onActivated,
  onDeactivated,
  onBeforeMount,
  onBeforeUnmount,
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'oxd-tab-panel',
  props: {
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['activate', 'deactivate'],
  setup(props, context) {
    onActivated(() => context.emit('activate'));
    onBeforeMount(() => context.emit('activate'));
    onDeactivated(() => context.emit('deactivate'));
    onBeforeUnmount(() => context.emit('deactivate'));

    return () =>
      h(
        'div',
        {
          id: props.name,
          class: 'oxd-tab-panel',
        },
        context.slots.default?.(),
      );
  },
});
</script>
