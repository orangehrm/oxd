<template>
  <nav role="navigation" aria-label="Pagination Navigation">
    <ul class="oxd-pagination__ul">
      <oxd-pagination-page-item
        previous
        @click="onClickPrevious"
        v-if="showPrevious"
      />
      <oxd-pagination-page-item
        v-for="page in pageItems"
        :key="page"
        :page="page"
        :selected="page === currentPage"
        @click="onClickPage(page, $event)"
      />
      <oxd-pagination-page-item next @click="onClickNext" v-if="showNext" />
      <oxd-select-input
        class="pagination-dropdown"
        :options="perPages"
        @update:modelValue="selectPerPage"
        :model-value="perPageData"
        :hide-dropdown-default-label="true"
      />
    </ul>
  </nav>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import PageItem from '@orangehrm/oxd/core/components/Pagination/PageItem.vue';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';
import {pageableMixin} from '../../../mixins/pageable';

export default defineComponent({
  name: 'oxd-pagination',

  components: {
    'oxd-pagination-page-item': PageItem,
    'oxd-select-input': SelectInput,
  },

  mixins: [pageableMixin],

  emits: ['previous', 'next', 'update:current', 'clickPage'],

  data() {
    return {
      pagePointer: this.current,
      perPageData: {
        id: 1,
        label: '10',
      },
    };
  },

  props: {
    length: {
      type: Number,
      required: true,
      validator: (val: number) => Number.isInteger(val),
    },
    max: {
      type: Number,
      default: 5,
      validator: (val: number) => Number.isInteger(val),
    },
    current: {
      type: Number,
      default: 1,
      validator: (val: number) => Number.isInteger(val),
    },
    pagesList: {
      type: Array,
      default: () => ['10', '20', '50', '100'],
    },
    perPage: {
      type: Object as PropType<{
        id: number;
        label: string;
      }>,
      default: () => ({
        id: 1,
        label: '10',
      }),
    },
  },

  computed: {
    perPages() {
      return this.pagesList.map((page, index) => {
        return {
          id: ++index,
          label: page,
        };
      });
    },
    currentPage: {
      get(): number {
        if (this.current < 1 || this.current > this.length) {
          // eslint-disable-next-line no-console
          console.error('Invalid `current` prop');
        }
        return this.pagePointer;
      },
      set(newValue: number) {
        if (newValue < 1 || newValue > this.length) {
          // eslint-disable-next-line no-console
          console.error('Invalid assignment to `currentPage`');
        } else {
          this.pagePointer = newValue;
        }
      },
    },
    showPrevious(): boolean {
      return this.currentPage !== 1;
    },
    showNext(): boolean {
      return this.currentPage !== this.length;
    },
    pageItems(): Array<number> {
      if (this.currentPage < 1 || this.currentPage > this.length) {
        // eslint-disable-next-line no-console
        console.error('Invalid `current` prop');
      }

      const maxLength = this.max;
      const currentPage = this.currentPage;
      if (this.length <= maxLength) {
        return this.range(1, this.length);
      }

      const even = maxLength % 2 === 0 ? 1 : 0;
      const middle = Math.floor(maxLength / 2);
      let start = currentPage - middle;
      let end = currentPage + middle - even;

      if (start < 0) {
        start = 0;
      }
      if (end > this.length) {
        end = this.length;
      }
      if (currentPage <= middle) {
        end = maxLength;
      }
      if (currentPage > this.length - middle) {
        start = this.length - maxLength + 1;
      }

      return this.range(start, end);
    },
  },

  methods: {
    onClickPrevious(e: Event) {
      this.currentPage--;
      this.$emit('update:current', this.currentPage);
      this.$emit('previous', e);
    },
    onClickPage(page: number, e: Event) {
      this.currentPage = page;
      this.$emit('update:current', this.currentPage);
      this.$emit('clickPage', {
        page,
        native: e,
      });
    },
    onClickNext(e: Event) {
      this.currentPage++;
      this.$emit('update:current', this.currentPage);
      this.$emit('next', e);
    },
    range(from: number, to: number): Array<number> {
      const range = [];
      from = from > 0 ? from : 1;
      if (from > to) {
        // eslint-disable-next-line no-console
        console.error('`from` is bigger than `to`');
      }
      for (let i = from; i <= to; i++) {
        range.push(i);
      }
      return range;
    },
    selectPerPage(val) {
      this.perPageData = val;
      this.$emit('onPerPageSelect', val);
    },
  },

  mounted() {
    this.perPageData = this.perPage;
  },
});
</script>

<style src="./pagination.scss" lang="scss" scoped></style>

<style lang="scss" scoped>
:deep(.pagination-dropdown .oxd-select-text-input) {
  min-width: 59px;
}
</style>
