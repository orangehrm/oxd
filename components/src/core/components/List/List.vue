<template>
  <div
    v-if="configurations"
    class="orangehrm-container recruitment-container"
    :class="{
      'table-sidebar-open':
        configurations.table.sidebar.visible && state.isSidePanelOpen,
    }"
  >
    <oxd-table-sidebar
      v-if="configurations.table.sidebar.visible"
      class="oxd-table-sidebar"
      :class="{'with-filters': configurations.table.topFilters.visible}"
      width="230px"
      :side-panel-list="sidePanelList"
      :header-visible="configurations.table.sidebar.header.visible"
      :body-visible="configurations.table.sidebar.body.visible"
      :list-visible="configurations.table.sidebar.list.visible"
      :bubble-visible="configurations.table.sidebar.list.bubble.visible"
      :button="configurations.table.sidebar.header.button"
      :selected-list-item-id="selectedListItem.id"
      @sidePanelList:onSelect="sidePanelListOnSelect"
      @side-panel:onToggle="toggleSidePanel"
      :is-side-panel-open="state.isSidePanelOpen"
    >
      <template v-slot:sidePanelBody>
        <slot name="sidePanelBody"></slot>
      </template>
      <template v-slot:footer>
        <slot name="footer"></slot>
      </template>
    </oxd-table-sidebar>
    <div
      class="table-card-list-wrapper"
      :class="{'w-100': !state.isSidePanelOpen}"
    >
      <oxd-table-filter
        v-if="configurations.table.topFilters.visible"
        class="list-table-filter"
        :filter-title="
          `(${filteredTotalRecordsCount}) ${
            filteredTotalRecordsCount > 1
              ? configurations.table.topFilters.listRecordCount.multiTerm
              : configurations.table.topFilters.listRecordCount.singleTerm
          } found`
        "
      >
        <template v-slot:toggleOptions>
          <oxd-quick-search
            v-if="configurations.table.topFilters.quickSearch.visible"
            :placeholder="
              configurations.table.topFilters.quickSearch.searchPlaceholder
            "
            :clear="configurations.table.topFilters.quickSearch.clearButton"
            :createOptions="quickSearchOptions"
            :modelValue="state.selectedQuickSearch"
            @dropdown:modelValue="quickSearchSelect"
          >
            <template v-slot:iconSlot>
              <oxd-icon-button
                v-if="!state.selectedQuickSearch"
                :name="configurations.table.topFilters.quickSearch.buttonIcon"
                :display-type="
                  configurations.table.topFilters.quickSearch.buttonDisplayType
                "
                class="quick-search-btn"
              ></oxd-icon-button>
            </template>
            <template v-slot:option="{data}">
              <oxd-profile-pic size="small" :imageSrc="data.imageSrc" />
              <span class="margin-left">{{ data.label }}</span>
            </template>
          </oxd-quick-search>
          <oxd-icon-button
            v-if="configurations.drawer.visible"
            name="funnel"
            display-type="label-info"
            class="btn-large"
            @click="showFilterDrawer"
          />
          <oxd-icon-button name="gear-fill" />
          <oxd-button
            :size="'medium'"
            display-type="label-info"
            label="CSV"
            icon-name="file-earmark-spreadsheet"
          />
        </template>
      </oxd-table-filter>

      <div class="oxd-card-table-wrapper">
        <oxd-card-table
          :selector="state.selector"
          :headers="configurations.table.headers"
          :items="listItems"
          :selectable="true"
          :clickable="false"
          :isDynamicCell="true"
          :style-class="oxdCardTableStyleClasses"
          v-model:selected="state.checkedItems"
          v-model:order="order"
          @update:order="tableSort"
        />
        <oxd-pagination
          class="list-pagination"
          :length="configurations.table.pagination.maxPageLimit"
          v-model:current="state.currentPage"
          :max="wholeRecordsCount"
          :pages-list="pagination.pages"
          :current="pagination.limit"
          @previous="previous"
          @next="next"
          @clickPage="clickPage"
          @onPerPageSelect="perPageSelect"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CardTable from '@orangehrm/oxd/core/components/CardTable/CardTable.vue';
import TableFilter from '@orangehrm/oxd/core/components/TableFilter/TableFilter.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import QuickSearchInput from '@orangehrm/oxd/core/components/Input/Autocomplete/QuickSearchInput.vue';
import TableSidebar from '@orangehrm/oxd/core/components/TableSidebar/TableSidebar.vue';
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic.vue';
import Pagination from '@orangehrm/oxd/core/components/Pagination/Pagination.vue';
import images from './images';

import {defineComponent, reactive, computed} from 'vue';

export default defineComponent({
  components: {
    'oxd-card-table': CardTable,
    'oxd-table-sidebar': TableSidebar,
    'oxd-table-filter': TableFilter,
    'oxd-button': Button,
    'oxd-icon-button': IconButton,
    'oxd-quick-search': QuickSearchInput,
    'oxd-profile-pic': ProfilePic,
    'oxd-pagination': Pagination,
  },
  props: {
    configurations: {
      type: Object,
      required: true,
    },
    listItems: {
      type: Array,
    },
    filteredTotalRecordsCount: {
      type: Number,
      default: 0,
    },
    wholeRecordsCount: {
      type: Number,
      default: 0,
    },
    sidePanelList: {
      type: Array,
      default: () => [],
    },
    quickSearchOptions: {
      type: Function,
      required: true,
    },
    pagination: {
      type: Object,
      default: () => ({
        limit: 10 as number,
        pages: [10, 20, 50, 100] as number[],
      }),
    },
    selectedListItem: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, {emit}) {
    const sampleImages = images;

    const state = reactive({
      currentPage: 1,
      isSidePanelOpen: true,
      checkedItems: [],
      modalState: false as boolean,
      selectedQuickSearch: null,
    });

    const oxdCardTableStyleClasses = computed(() => {
      let styleClasses = 'oxd-classic-table ';
      styleClasses += props.configurations.table.topFilters.visible
        ? 'with-filters'
        : '';
      return styleClasses;
    });

    const order = computed(() => {
      const sortableFieldsObj = {};
      if (props.configurations) {
        props.configurations.table.headers.forEach(header => {
          if (header.initialSortOrder) {
            sortableFieldsObj[header.sortField] = header.initialSortOrder;
          }
        });
      }
      return sortableFieldsObj;
    });

    const isFloat = n => {
      return n === +n && n !== (n | 0);
    };

    const paginationLength = computed((): number => {
      const pagesLength: number =
        props.wholeRecordsCount / props.pagination.limit;
      return isFloat(pagesLength) ? Math.floor(pagesLength) + 1 : pagesLength;
    });

    const sidePanelListOnSelect = item => {
      emit('sidePanelList:onSelect', item);
    };

    const quickSearchSelect = value => {
      if (value) {
        state.selectedQuickSearch = {
          label: value.candidateName,
        };
        emit('quick-search:onSelect', value);
      } else {
        state.selectedQuickSearch = null;
        emit('quick-search:onClear');
      }
    };

    const tableSort = value => {
      emit('update:order', value);
    };

    const showFilterDrawer = (): void => {
      state.modalState = !state.modalState;
      emit('drawer:show', true);
    };

    const applySearch = (): void => {
      state.modalState = false;
      emit('drawer-search:apply');
    };

    const resetSearch = (): void => {
      state.modalState = false;
      emit('drawer-search:reset');
    };

    const closeDrawer = (): void => {
      state.modalState = false;
      emit('drawer-search:cancel');
    };

    const toggleSidePanel = (sidebarOpenState: boolean) => {
      state.isSidePanelOpen = sidebarOpenState;
      emit('table-sidebar:onToggle', sidebarOpenState);
    };

    const previous = (e: Event) => {
      emit('pagination:onPrevious', e);
    };

    const next = (e: Event) => {
      emit('pagination:onNext', e);
    };

    const clickPage = (page: number, e: Event) => {
      emit('pagination:onSelectPage', page, e);
    };

    const perPageSelect = (page: number) => {
      emit('pagination:onSelectPerPage', page);
    };

    return {
      state,
      sampleImages,
      oxdCardTableStyleClasses,
      order,
      sidePanelListOnSelect,
      quickSearchSelect,
      showFilterDrawer,
      applySearch,
      resetSearch,
      closeDrawer,
      toggleSidePanel,
      tableSort,
      previous,
      next,
      clickPage,
      perPageSelect,
      paginationLength,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.header-image) {
  img {
    width: 2.5rem !important;
  }
}

.recruitment-container {
  margin-top: 2rem;
  background-color: #fff;
  border-radius: 1.2rem;
  display: flex;
  align-items: flex-start;
  .oxd-table-sidebar {
    &.with-filters {
      margin-top: 1.25rem;
    }
  }
  .table-card-list-wrapper {
    width: 100%;
    .list-table-filter {
      padding-bottom: 0;
      :deep(.oxd-divider) {
        margin-top: 0.25rem;
        margin-bottom: 0;
      }
      // TODO: check and match the styles
      // :deep(.oxd-table-filter-header-title) {
      //   .oxd-table-filter-title {
      //     // Use Sub Title in OXD
      //     // font-weight: 500 !important;
      //   }
      // }
      :deep(.oxd-table-filter-header) {
        .oxd-table-filter-header-options {
          align-items: center;
          .oxd-icon-button {
            i {
              font-size: 14px;
            }
          }
          .oxd-button {
            display: flex;
            align-items: center;
            padding: 0.5rem 1rem !important;
            min-width: unset !important;
            font-size: 0.75rem;
            i {
              font-size: 1.0625rem;
              margin-right: 0.25rem;
            }
            &:hover,
            &:focus {
              color: #1e6ceb;
              background-color: rgba(30, 108, 235, 0.15);
            }
          }
        }
      }
      .oxd-autocomplete-search-wrapper {
        width: 300px;
      }
      :deep(.oxd-autocomplete-text-input) {
        background-color: #fff;
        padding-top: unset;
        padding-bottom: unset;
        height: 36px;
      }
      :deep(.quick-search-btn) {
        padding: 0;
        min-width: unset;
        min-height: unset;
        width: 28px;
        height: 28px;
        background-color: rgba(100, 114, 140, 0.1);
        i {
          width: unset;
          height: unset;
          svg {
            width: 12px;
          }
        }
      }
    }
  }
  &.table-sidebar-open {
    .table-card-list-wrapper {
      width: calc(100% - 230px);
    }
  }
  .oxd-classic-table {
    flex-wrap: nowrap;
    :deep(.oxd-icon-button) {
      font-size: 15px;
    }
    :deep(.oxd-table-th) {
      text-align: left;
      padding-top: 0.65rem;
      padding-bottom: 0.65rem;
    }
    :deep(.oxd-table-cell) {
      flex-wrap: nowrap;
    }
  }
}
.w-100 {
  width: 100% !important;
}
.margin-left {
  margin-left: 0.5rem;
}
.list-pagination {
  height: initial;
  line-height: initial;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-shadow: none;
  :deep(i) {
    font-size: initial;
    height: initial;
    line-height: initial;
  }
  :deep(.oxd-select-wrapper) {
    margin-left: 0.5rem;
  }
}
</style>
