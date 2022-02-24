<template>
  <div
    class="oxd-list-container w-100 vh-100 d-flex align-start"
    :class="{
      'table-left-panel-open':
        config.table.leftPanel.visible && state.isLeftPanelOpen,
    }"
  >
    <oxd-table-sidebar
      v-if="config.table.leftPanel.visible"
      class="oxd-table-left-panel"
      :class="{'with-filters': config.table.topBar.visible}"
      width="250px"
      :side-panel-list="sidePanelList"
      :header-visible="config.table.leftPanel.header.visible"
      :body-visible="config.table.leftPanel.body.visible"
      :list-visible="config.table.leftPanel.list.visible"
      :bubble-visible="config.table.leftPanel.list.bubble.visible"
      :button="config.table.leftPanel.header.button"
      :selected-list-item-id="selectedListItem.id"
      @sidePanelList:onSelect="sidePanelListOnSelect"
      @side-panel:onToggle="toggleSidePanel"
      @sidePanelList:onHeaderBtnClick="sidePanelListOnHeaderBtnClick"
      :is-side-panel-open="state.isLeftPanelOpen"
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
      :class="{'w-100': !state.isLeftPanelOpen}"
    >
      <oxd-table-filter
        v-if="config.table.topBar.visible"
        class="list-table-filter"
        :class="state.selectedItemIndexes.length > 0 ? 'items-selected' : ''"
        :filter-title="filterTitle"
      >
        <template v-slot:actionOptions>
          <div
            v-for="(action, index) in config.table.topBar.bulkActions"
            :key="index"
          >
            <component
              :is="action.type"
              v-if="
                state.selectedItemIndexes.length > 0 &&
                  (action.conditional
                    ? action.visible === undefined
                      ? true
                      : action.visible
                    : true)
              "
              v-bind="action.props"
              v-on="eventBinder(action.events)"
              :class="action.class"
              :style="action.style"
            />
          </div>
        </template>
        <template v-slot:toggleOptions>
          <oxd-quick-search
            v-if="config.table.topBar.quickSearch.visible"
            :style="config.table.topBar.quickSearch.style"
            :placeholder="config.table.topBar.quickSearch.placeholder"
            :clear="config.table.topBar.quickSearch.clear"
            :createOptions="quickSearchOptions"
            :modelValue="state.selectedQuickSearch"
            @update:modelValue="quickSearchSelect"
          >
            <template v-slot:iconSlot>
              <oxd-icon-button
                v-if="
                  config.table.topBar.quickSearch.button.visible &&
                    !state.selectedQuickSearch
                "
                v-bind="config.table.topBar.quickSearch.button.props"
                :class="config.table.topBar.quickSearch.button.class"
                :style="config.table.topBar.quickSearch.button.style"
              ></oxd-icon-button>
            </template>
            <template v-slot:option="{data}">
              <oxd-profile-pic size="small" :imageSrc="data.avatar_url" />
              <span class="margin-left">{{ data.label }}</span>
            </template>
          </oxd-quick-search>
          <div class="d-flex align-center">
            <component
              v-for="(action, index) in config.table.topBar.singleActions"
              :key="index"
              :is="action.type"
              v-show="
                action.conditional
                  ? action.visible === undefined
                    ? true
                    : action.visible
                  : true
              "
              v-bind="action.props"
              v-on="eventBinder(action.events)"
              :class="action.class"
              :style="action.style"
            />
          </div>
        </template>
      </oxd-table-filter>

      <div class="oxd-card-table-wrapper">
        <oxd-card-table
          :selector="state.selector"
          :headers="config.table.headers"
          :items="listItems"
          :selectable="true"
          :clickable="false"
          :class="oxdCardTableStyleClasses"
          :loading="isListLoading"
          v-model:selected="state.checkedItems"
          v-model:order="order"
          @update:order="tableSort"
          @update:selected="tableSelect"
          rowDecorator="oxd-table-decorator-card"
        />
        <oxd-pagination
          class="list-pagination d-flex align-center justify-end"
          :length="paginationLength"
          v-model:current="state.currentPage"
          :max="maxPages"
          :pages-list="pagination.pages"
          :per-page="pagination.perPage"
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
import images from '../ProfilePic/images';

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
        limit: 20 as number,
        perPage: {
          id: 1,
          label: '10',
        } as {
          id: number;
          label: string;
        },
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
    isListLoading: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, {emit}) {
    const sampleImages = images;

    const state = reactive({
      currentPage: 1,
      isLeftPanelOpen: true,
      checkedItems: [],
      modalState: false as boolean,
      selectedQuickSearch: null,
      selectedItemIndexes: [],
    });

    const config = computed(() => props.configurations);

    const oxdCardTableStyleClasses = computed(() => {
      let styleClasses = 'oxd-classic-table ';
      styleClasses += config.value.table.topBar.visible ? 'with-filters' : '';
      return styleClasses;
    });

    const order = computed(() => {
      const sortableFieldsObj = {};
      config.value.table.headers.forEach(header => {
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
      let itemCount = state.selectedItemIndexes.length || props.filteredTotalRecordsCount;
      return `
        ${itemCount}
        ${itemCount > 1 || itemCount === 0
          ? config.value.table.topBar.listRecordCount.multiTerm
          : config.value.table.topBar.listRecordCount.singleTerm}
        ${state.selectedItemIndexes.length > 0 ? 'Selected' : 'Found'}
      `
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

    const toggleSidePanel = (leftPanelOpenState: boolean) => {
      state.isLeftPanelOpen = leftPanelOpenState;
      emit('table-left-panel:onToggle', leftPanelOpenState);
    };

    const previous = (e: Event) => {
      emit('pagination:onPrevious', state.currentPage, e);
    };

    const next = (e: Event) => {
      emit('pagination:onNext', state.currentPage, e);
    };

    const clickPage = (page: number, e: Event) => {
      emit('pagination:onSelectPage', page, e);
    };

    const perPageSelect = (page: number) => {
      emit('pagination:onSelectPerPage', page);
    };

    const exportBtn = () => {
      emit('topfilters:onExportBtnClick');
    };

    const eventBinder = events => {
      let mappedEvents, mappedEventsObj;
      if (events) {
        mappedEvents = events.map(event => {
          return {
            [event.type]: vals => {
              emit(event.identifier, vals);
            },
          };
        });
        mappedEventsObj = Object.assign({}, ...mappedEvents);
      }
      return mappedEventsObj;
    };

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
      config,
    };
  },
});
</script>

<style src="./list.scss" lang="scss" scoped></style>
