<template>
  <div
    class="oxd-list-container w-100 d-table align-start"
    :class="{
      'table-left-panel-open':
        config.table.leftPanel &&
        config.table.leftPanel.visible &&
        state.isLeftPanelOpen,
    }"
  >
    <oxd-table-sidebar
      v-if="config.table.leftPanel && config.table.leftPanel.visible"
      class="oxd-table-left-panel d-table-cell"
      :class="{'with-filters': config.table.topBar.visible}"
      :style="{
        width: '200px',
        'max-width': '200px',
      }"
      :side-panel-list="sidePanelList"
      :header-visible="config.table.leftPanel.header.visible"
      :header-action-button-visible="config.table.addable"
      :body-visible="config.table.leftPanel.body.visible"
      :list-visible="config.table.leftPanel.list.visible"
      :bubble-visible="config.table.leftPanel.list.bubble.visible"
      :button="config.table.leftPanel.header.button"
      :secondary-button="config.table.leftPanel.header.secondaryButton"
      :selected-list-item-id="selectedListItemId"
      @sidePanelList:onSelect="sidePanelListOnSelect"
      @side-panel:onToggle="toggleSidePanel"
      @sidePanelList:onHeaderBtnClick="sidePanelListOnHeaderBtnClick"
      @sidePanelList:onHeaderSecondaryBtnClick="
        sidePanelListOnHeaderSecondaryBtnClick
      "
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
      v-if="config.table.leftPanel && config.table.leftPanel.visible"
      class="oxd-table-left-panel-spacer"
      style="margin-left: 10px;"
    ></div>
    <div
      class="table-card-list-wrapper d-table-cell"
      :class="{'w-100': !state.isLeftPanelOpen}"
    >
      <oxd-table-filter
        v-if="config.table.topBar.visible"
        class="list-table-filter"
        :class="state.selectedItemIndexes.length > 0 ? 'items-selected' : ''"
        :filter-title="filterTitle"
        :items-selected="state.selectedItemIndexes.length > 0"
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
            ref="quickSearch"
            v-if="
              config.table.topBar.quickSearch &&
                config.table.topBar.quickSearch.visible
            "
            :style="config.table.topBar.quickSearch.style"
            :placeholder="config.table.topBar.quickSearch.placeholder"
            :clear="config.table.topBar.quickSearch.clear"
            :createOptions="quickSearchOptions"
            :modelValue="state.selectedQuickSearch"
            @update:modelValue="quickSearchSelect"
            @dropdown:clear="quickSearchOnClear"
            @update:searchTerm="setQuickSearchTerm"
            @select:enter="quickSearchKeywordSearch"
          >
            <template v-slot:iconSlot>
              <oxd-icon-button
                v-if="config.table.topBar.quickSearch.button.visible"
                v-bind="config.table.topBar.quickSearch.button.props"
                :class="config.table.topBar.quickSearch.button.class"
                :style="config.table.topBar.quickSearch.button.style"
                @click="quickSearchKeywordSearch"
              ></oxd-icon-button>
            </template>
            <template v-slot:option="{data, text}">
              <oxd-profile-pic
                v-if="config.table.topBar.quickSearch.withImageSearch"
                size="extra-small"
                :imageSrc="data.avatar_url"
              />
              <div
                v-if="config.table.topBar.quickSearch.withImageSearch"
                class="margin-left"
              >
                <div v-html="text"></div>
              </div>
              <div v-else v-html="text"></div>
            </template>
          </oxd-quick-search>
          <div class="d-flex align-center">
            <slot name="tableFilterAdditionalSingleActions"></slot>
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
          :hideHeaders="config.table.hideHeaders"
          :items="listItems"
          :highlight-rows="listHighlightRows"
          :selectable="config.table.selectable"
          :clickable="false"
          :class="oxdCardTableStyleClasses"
          :loading="isListLoading"
          v-model:selected="state.checkedItems"
          v-model:order="order"
          @update:order="tableSort"
          @update:selected="tableSelect"
          rowDecorator="oxd-table-decorator-card"
        />
        <div
          v-if="filteredTotalRecordsCount === 0 && !isListLoading"
          class="empty-msg-container"
        >
          <div class="empty-msg d-flex flex-wrap justify-center">
            <oxd-icon
              class="empty-msg-pic justify-center w-100"
              :name="emptyMsgValidated.icon"
            />
            <div class="caption">{{ $vt(emptyMsgValidated.message) }}</div>
          </div>
        </div>
        <oxd-pagination
          class="list-pagination d-flex align-center justify-end"
          v-if="pagination && isPaginated"
          :length="paginationLength"
          v-model:current="state.currentPage"
          :max="maxPages"
          :pages-list="pagination.pages"
          :per-page="pagination.limit"
          :total-records-count="filteredTotalRecordsCount"
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
import useTranslate from './../../../composables/useTranslate';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import {defineComponent, reactive, computed, ref, watch, PropType} from 'vue';
import translateMixin from '../../../mixins/translate';
import {EmptyMsg, EmptyMsgEnum} from './types';

export default defineComponent({
  components: {
    'oxd-card-table': CardTable,
    'oxd-table-sidebar': TableSidebar,
    'oxd-table-filter': TableFilter,
    'oxd-button': Button,
    'oxd-icon-button': IconButton,
    'oxd-quick-search': QuickSearchInput,
    'oxd-profile-pic': ProfilePic,
    'oxd-icon': Icon,
    'oxd-pagination': Pagination,
  },
  mixins: [translateMixin],
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
    },
    quickSearchKeyWord: {
      type: String,
      default: null,
    },
    pagination: {
      type: Object,
      default: () => ({
        limit: 20 as number,
        perPage: {
          id: 2,
          label: '20',
        } as {
          id: number;
          label: string;
        },
        pages: [10, 20, 50, 100] as number[],
        currentPage: 1 as number,
      }),
    },
    isPaginated: {
      type: Boolean,
      default: true,
    },
    selectedListItemId: {
      type: Number,
    },
    maxPages: {
      type: Number,
      default: 5,
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
    listHighlightRows: {
      type: Object,
    },
    emptyMsg: {
      type: Object as PropType<EmptyMsg>,
      default: () => EmptyMsgEnum,
    },
  },
  setup(props, {emit}) {
    const sampleImages = images;
    const {$t} = useTranslate();

    const quickSearch = ref(null);
    const state = reactive({
      currentPage: 1,
      isLeftPanelOpen: true,
      checkedItems: [],
      modalState: false as boolean,
      selectedQuickSearch: null,
      quickSearchTerm: null as string | null,
      selectedItemIndexes: [],
      currentSortFields: {},
      quickSearchTriggered: false,
    });

    watch(
      () => props.pagination,
      newVal => {
        state.currentPage = newVal.currentPage;
      },
      {
        immediate: true,
        deep: true,
      },
    );

    watch(
      () => props.quickSearchKeyWord,
      newVal => {
        if (props.quickSearchKeyWord) {
          state.quickSearchTriggered = true;
          state.selectedQuickSearch = {
            label: newVal,
          };
          state.quickSearchTerm = newVal;
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

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
          sortableFieldsObj[header.sortField] = {
            order: state.currentSortFields[header.sortField]
              ? state.currentSortFields[header.sortField]
              : header.initialSortOrder,
            iconAsc: header.sortIcons !== undefined ? header.sortIcons.asc : '',
            iconDesc:
              header.sortIcons !== undefined ? header.sortIcons.desc : '',
          };
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
      const itemCount =
        state.selectedItemIndexes.length || props.filteredTotalRecordsCount;
      return `
        (${itemCount})
        ${
          itemCount > 1 || itemCount === 0
            ? $t(config.value.table.topBar.listRecordCount.multiTerm)
            : $t(config.value.table.topBar.listRecordCount.singleTerm)
        }
        ${state.selectedItemIndexes.length > 0 ? $t('Selected') : $t('Found')}
      `;
    });

    const emptyMsgValidated = computed(
      (): EmptyMsg => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const initialObject: any = EmptyMsgEnum;
        for (const key in props.emptyMsg) {
          let value = props.emptyMsg['message'];
          if (key === 'icon') {
            value = props.emptyMsg['icon'];
          }
          if (value) {
            initialObject[key] = value;
          }
        }
        return initialObject;
      },
    );

    const sidePanelListOnHeaderBtnClick = () => {
      emit('sidePanelList:onHeaderBtnClick');
    };

    const sidePanelListOnHeaderSecondaryBtnClick = () => {
      emit('sidePanelList:onHeaderSecondaryBtnClick');
    };

    const sidePanelListOnSelect = item => {
      state.currentPage = 1;
      emit('sidePanelList:onSelect', item);
    };

    const quickSearchOnClear = () => {
      if (state.quickSearchTriggered) {
        state.quickSearchTerm = null;
        state.selectedQuickSearch = null;
        state.quickSearchTriggered = false;
        emit('quick-search:onClear');
      }
    };

    const quickSearchSelect = value => {
      if (typeof value === 'string') return;
      if (value) {
        state.selectedQuickSearch = {
          label: value.label,
        };
        emit('quick-search:onSelect', value);
        state.quickSearchTriggered = true;
        state.quickSearchTerm = value.label;
      } else {
        quickSearchOnClear();
      }
    };

    const setQuickSearchTerm = (value: string) => {
      state.quickSearchTerm = value;
      emit('quick-search:onSetSearchTerm', value);
    };

    const quickSearchKeywordSearch = () => {
      state.quickSearchTriggered = true;
      state.selectedQuickSearch = {
        label: state.quickSearchTerm,
      };
      emit('quick-search:onSearch', state.quickSearchTerm);
    };

    const tableSort = value => {
      state.currentSortFields = value;
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
      sidePanelListOnHeaderSecondaryBtnClick,
      sidePanelListOnSelect,
      quickSearchSelect,
      quickSearchOnClear,
      quickSearchKeywordSearch,
      setQuickSearchTerm,
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
      quickSearch,
      emptyMsgValidated,
    };
  },
});
</script>

<style src="./list.scss" lang="scss" scoped></style>
