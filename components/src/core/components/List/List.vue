<template>
  <div
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
      @sidePanelList:onHeaderBtnClick="sidePanelListOnHeaderBtnClick"
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
        :filter-title="filterTitle"
      >
        <template v-slot:actionOptions>
          <div
            v-for="(action, index) in configurations.table.topFilters.actions"
            :key="index"
          >
            <component
              :is="action.type"
              v-if="state.selectedItemIndexes.length > 0"
              v-bind="action.props"
              v-on="eventBinder(action.events)"
              :class="action.class"
              :style="action.style"
            />
          </div>
        </template>
        <template v-slot:toggleOptions>
          <oxd-quick-search
            :placeholder="'Search'"
            :clear="true"
            :createOptions="quickSearchOptions"
            :modelValue="state.selectedQuickSearch"
            @dropdown:modelValue="quickSearchSelect"
          >
            <template v-slot:iconSlot>
              <oxd-icon-button
                v-if="!state.selectedQuickSearch"
                name="oxd-search"
                display-type="label-info"
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
          <!-- <oxd-icon-button name="gear-fill" /> -->
          <oxd-button
            :size="'medium'"
            display-type="label-info"
            label="CSV"
            icon-name="file-earmark-spreadsheet"
            @click="exportBtn"
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
          :class="oxdCardTableStyleClasses"
          v-model:selected="state.checkedItems"
          v-model:order="order"
          @update:order="tableSort"
          @update:selected="tableSelect"
          rowDecorator="oxd-table-decorator-card"
        />
        <oxd-pagination
          class="list-pagination"
          :length="paginationLength"
          v-model:current="state.currentPage"
          :max="maxPages"
          :pages-list="pagination.pages"
          :current="pagination.limit"
          @previous="previous"
          @next="next"
          @clickPage="clickPage"
          @onPerPageSelect="perPageSelect"
        />
      </div>
    </div>
    <!-- <oxd-drawer
      v-if="configurations.drawer.visible"
      :modal-state="state.modalState"
      :width="configurations.drawer.width"
      :height="configurations.drawer.height"
      :full-height="configurations.drawer.fullHeight"
      :sticky-footer="configurations.drawer.stickyFooter"
      :fixed="configurations.drawer.fixedPosition"
      :position="configurations.drawer.position"
      :ok-button="{
        label: configurations.drawer.footer.okButton.label,
        click: applySearch,
      }"
      :cancel-button="{
        click: closeDrawer,
      }"
      @drawer:click-outside="closeDrawer"
    >
      <template v-slot:header>
        <div v-if="configurations.drawer.header.visible" class="header">
          <slot name="drawerHeader">
            <div class="d-flex align-center justify-between">
              <h5>{{ configurations.drawer.header.title }}</h5>
              <oxd-icon-button
                v-if="configurations.drawer.header.charmButton.visible"
                :name="configurations.drawer.header.charmButton.icon"
                @click="resetSearch"
              />
            </div>
          </slot>
        </div>
      </template>
      <template v-slot:body>
        <slot name="drawerBody"></slot>
      </template>
    </oxd-drawer> -->
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
// import Drawer from '@orangehrm/oxd/core/components/Drawer/Drawer.vue';
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
    // 'oxd-drawer': Drawer,
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
    maxPages: {
      type: Number,
      default: 5,
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
      selectedItemIndexes: [],
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
      props.configurations.table.headers.forEach(header => {
        if (header.initialSortOrder) {
          sortableFieldsObj[header.sortField] = header.initialSortOrder;
        }
      });
      return sortableFieldsObj;
    });

    const isFloat = n => {
      return n === +n && n !== (n | 0);
    };

    const paginationLength = computed((): number => {
      const pagesLength: number =
        props.filteredTotalRecordsCount / props.pagination.limit;
      return isFloat(pagesLength) ? Math.floor(pagesLength) + 1 : pagesLength;
    });

    const filterTitle = computed((): string => {
      let title = '';
      if (state.selectedItemIndexes.length > 0) {
        if (state.selectedItemIndexes.length > 1) {
          title =
            props.configurations.table.topFilters.listRecordCount.multiTerm;
        } else {
          title =
            props.configurations.table.topFilters.listRecordCount.singleTerm;
        }
        title = `(${state.selectedItemIndexes.length}) ${title} selected`;
      } else {
        if (props.filteredTotalRecordsCount > 1) {
          title =
            props.configurations.table.topFilters.listRecordCount.multiTerm;
        } else {
          title =
            props.configurations.table.topFilters.listRecordCount.singleTerm;
        }
        title = `(${props.filteredTotalRecordsCount}) ${title} found`;
      }
      return title;
    });

    const sidePanelListOnHeaderBtnClick = () => {
      emit('sidePanelList:onHeaderBtnClick');
    };

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

    const tableSelect = items => {
      state.selectedItemIndexes = items;
      emit('update:selected', items);
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

    const exportBtn = () => {
      emit('topfilters:onExportBtnClick')
    }

    const eventBinder = (events) => {
      let mappedEvents, mappedEventsObj
      if (events) {
        mappedEvents = events.map(event => {
          return {
            "click": (vals) => {
              debugger
              emit(event.identifier, vals)
            }
          }
        })
        mappedEventsObj = Object.assign({}, ...mappedEvents )
      }
      return mappedEventsObj;
    }

    return {
      state,
      filterTitle,
      sampleImages,
      oxdCardTableStyleClasses,
      order,
      sidePanelListOnHeaderBtnClick,
      sidePanelListOnSelect,
      quickSearchSelect,
      showFilterDrawer,
      applySearch,
      resetSearch,
      closeDrawer,
      toggleSidePanel,
      tableSort,
      tableSelect,
      previous,
      next,
      clickPage,
      perPageSelect,
      paginationLength,
      exportBtn,
      eventBinder,
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
    margin-right: 5px;
  }
}
.oxd-button {
  display: flex;
  align-items: center;
  :deep(.oxd-button-icon) {
    margin-right: 0.5rem;
  }
  &.btn-info {
    :deep(svg) {
      * {
        fill: #17a2b8 !important;
      }
    }
    color: #17a2b8;
    background-color: #327cf31a;
    &:hover {
      color: #17a2b8;
      background-color: rgba(30, 108, 235, 0.15);
      svg {
        * {
          fill: #fff !important;
        }
      }
    }
  }
  &.btn-danger {
    :deep(svg) {
      * {
        fill: #eb0910 !important;
      }
    }
    color: #eb0910;
    background-color: rgba(235, 9, 16, 0.1);
    &:hover {
      color: #eb0910;
      background-color: rgba(235, 9, 16, 0.15);
      svg {
        * {
          fill: #fff !important;
        }
      }
    }
  }
}
</style>
