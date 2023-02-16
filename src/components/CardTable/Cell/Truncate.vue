<!--
/**
 * OrangeHRM is a comprehensive Human Resource Management (HRM) System that captures
 * all the essential functionalities required for any enterprise.
 * Copyright (C) 2006 OrangeHRM Inc., http://www.orangehrm.com
 *
 * OrangeHRM is free software; you can redistribute it and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * OrangeHRM is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA  02110-1301, USA
 */
 -->

<template>
  <div v-show="item" class="oxd-table-card-cell">
    <div v-if="showHeader" class="header">
      {{ header.title }}
    </div>
    <oxd-text tag="span">
      {{ truncatedText }}
    </oxd-text>
    <oxd-text
      v-if="canCollapse"
      tag="span"
      class="oxd-table-card-cell-show-more"
      @click="toggleCollapse"
    >
      {{
        isCollapsed
          ? t('general.show_more', 'Show more')
          : t('general.show_less', 'Show less')
      }}
    </oxd-text>
  </div>
</template>

<script lang="ts">
import {cellMixin} from '@/mixins/tablecell';
import Text from '@/components/Text/Text.vue';
import usei18n from '@/composables/usei18n';
import {useInjectTableProps} from '@/composables/useCardtable';
import {DEVICE_LG, DEVICE_XL} from '@/composables/useResponsive';
import {ref, computed, onBeforeMount, defineComponent} from 'vue';

export default defineComponent({
  name: 'TruncateCell',

  components: {
    'oxd-text': Text,
  },

  mixins: [cellMixin],

  props: {
    item: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const isCollapsed = ref(false);
    const {screenState} = useInjectTableProps();

    const canCollapse = computed(() => new String(props.item).length >= 50);

    const truncatedText = computed(() => {
      if (canCollapse.value && isCollapsed.value) {
        return `${new String(props.item).substring(0, 50)}...`;
      }
      return props.item;
    });

    const showHeader = computed(
      () =>
        !(
          screenState.screenType === DEVICE_LG ||
          screenState.screenType === DEVICE_XL
        ),
    );

    const toggleCollapse = () => (isCollapsed.value = !isCollapsed.value);

    onBeforeMount(() => {
      isCollapsed.value = canCollapse.value;
    });

    return {
      showHeader,
      screenState,
      isCollapsed,
      canCollapse,
      truncatedText,
      toggleCollapse,
      ...usei18n(),
    };
  },
});
</script>

<style src="./default.scss" lang="scss" scoped></style>
