<template>
  <li>
    <button type="button" :class="classes" :aria-label="ariaLabel">
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
import translateMixin from '../../../mixins/translate';

export default defineComponent({
  name: 'oxd-pagination-page-item',

  components: {
    'oxd-icon': Icon,
  },

  mixins: [pageableMixin, translateMixin],

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
    marked: {
      type: Boolean,
      default: false,
    },
    markedLabel: {
      type: String,
      default: 'Marked',
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-pagination-page-item': true,
        'oxd-pagination-page-item--page': !(this.previous || this.next),
        'oxd-pagination-page-item--page-selected': this.selected,
        'oxd-pagination-page-item--previous-next': this.previous || this.next,
        'oxd-pagination-page-item--marked': this.marked,
      };
    },
    ariaLabel(): string | undefined {
      return this.marked
        ? `${this.page}, ${this.$vt(this.markedLabel)}`
        : undefined;
    },
  },
});
</script>

<style src="./page-item.scss" lang="scss" scoped></style>
