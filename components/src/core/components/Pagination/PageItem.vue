<template>
  <li>
    <button type="button" :class="classes">
      <oxd-icon v-if="previous" name="chevron-left" />
      <oxd-icon v-else-if="next" name="chevron-right" />
      <template v-else>{{ page }}</template>
    </button>
  </li>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import {pageableMixin} from '../../../mixins/pageable';

export default defineComponent({
  name: 'oxd-pagination-page-item',

  components: {
    'oxd-icon': Icon,
  },

  mixins: [pageableMixin],

  props: {
    previous: {
      type: Boolean,
    },
    next: {
      type: Boolean,
    },
    selected: {
      type: Boolean,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-pagination-page-item': true,
        'oxd-pagination-page-item--page': !(this.previous || this.next),
        'oxd-pagination-page-item--page-selected': this.selected,
        'oxd-pagination-page-item--previous-next': this.previous || this.next,
      };
    },
  },
});
</script>

<style src="./page-item.scss" lang="scss" scoped></style>
