<template>
  <div
    class="orangehrm-container recruitment-container"
    :class="{
      'table-sidebar-open':
        configurations.table.sidebar.visible && state.isSidebarOpen,
    }"
  >
    <oxd-table-sidebar
      v-if="configurations.table.sidebar.header.visible"
      class="oxd-table-sidebar"
      :class="{'with-filters': configurations.table.topFilters.visible}"
      width="230px"
      :side-panel-list="sidePanelList"
      :header-visible="configurations.table.sidebar.header.visible"
      :body-visible="configurations.table.sidebar.body.visible"
      :list-visible="configurations.table.sidebar.list.visible"
      :bubble-visible="configurations.table.sidebar.list.bubble.visible"
      :button="configurations.table.sidebar.header.button"
      :selected-stage-id="state.selectedStageId"
      @sidePanelList:onSelect="selectStage"
      @table-sidebar:onToggle="toggleSidebar"
      :is-sidebar-open="state.isSidebarOpen"
    >
      <template v-slot:sidebarBody>
        <slot name="sidebarBody">
        </slot>
      </template>
      <template v-slot:list>
        <slot name="list"></slot>
      </template>
    </oxd-table-sidebar>
    <div
      class="table-card-list-wrapper"
      :class="{'w-100': !state.isSidebarOpen}"
    >
      <oxd-table-filter
        v-if="configurations.table.topFilters.visible"
        class="candidates-list-table-filter"
        :filter-title="
          `(${totalRecordsCount}) ${
            totalRecordsCount > 1 ? 'Candidates' : 'Candidate'
          } found`
        "
      >
        <template v-slot:toggleOptions>
          <oxd-quick-search
            :class="'candidates-quick-search'"
            :placeholder="'Search'"
            :createOptions="quickSearchCreateOptions"
            @dropdown:modelValue="selectCandidate"
          >
            <template v-slot:iconSlot>
              <oxd-icon-button
                name="oxd-search"
                display-type="label-info"
                class="candidate-search-btn"
              ></oxd-icon-button>
            </template>
            <template v-slot:option="{ data }">
              <oxd-list-profile-pic
                size="small"
                :style="{
                  'margin-right': '0.5rem',
                }"
                :image-src="data.imageSrc ? data.imageSrc : sampleImages['default-user'].value"
              />
              <span>{{ data.candidateName }}</span>
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
        </template>
        <template v-slot:exportOptions>
          <oxd-button
            :size="'medium'"
            display-type="label-info"
            label="CSV"
            icon-name="file-earmark-spreadsheet"
          />
        </template>
      </oxd-table-filter>

      <oxd-card-table
        :selector="state.selector"
        :headers="tableHeaders"
        :items="listItems"
        :selectable="true"
        :clickable="false"
        :isDynamicCell="true"
        :style-class="oxdCardTableStyleClasses"
        v-model:selected="state.checkedItems"
        v-model:order="state.order"
        @update:order="tableSort"
        rowDecorator="oxd-table-decorator-card"
      />

    </div>
    <oxd-drawer
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
    >
      <template v-slot:header>
        <div v-if="configurations.drawer.header.visible" class="header">
          <slot name="drawerHeader">
            <div class="d-flex align-center justify-between">
              <h5>{{configurations.drawer.header.title}}</h5>
              <oxd-icon-button
                v-if="configurations.drawer.header.charmButton.visible"
                :name="configurations.drawer.header.charmButton.icon"
                @click="cancelSearch"
              />
            </div>
          </slot>
        </div>
      </template>
      <template v-slot:body>
        <slot name="drawerBody"></slot>
      </template>
    </oxd-drawer>
  </div>
</template>

<script lang="ts">
import CardTable from '@orangehrm/oxd/core/components/CardTable/CardTable.vue';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';
import TableFilter from '@orangehrm/oxd/core/components/TableFilter/TableFilter.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import QuickSearchInput from '@orangehrm/oxd/core/components/Input/Autocomplete/QuickSearchInput.vue';
import TableSidebar from '@orangehrm/oxd/core/components/TableSidebar/TableSidebar.vue';
import ListProfilePic from './ListProfilePic.vue';
import ProfilePic from "@orangehrm/oxd/core/components/List/ListProfilePic.vue";
import Drawer from "@orangehrm/oxd/core/components/Drawer/Drawer.vue";
import images from './images';

import {defineComponent, reactive, computed} from 'vue';

interface SelectedVacancyI extends SelectUII {
  id: number;
  label: string;
}

interface SelectUII {
  id: number | string;
  label: string;
  _selected?: boolean | undefined;
}

interface StageStylesI {
  backgroundColor: string;
  color: string;
}

interface StageI extends SelectUII {
  count: number;
  selected?: boolean | undefined;
  style?: StageStylesI | undefined;
  displayType?: string;
}

export default defineComponent({
  components: {
    'oxd-card-table': CardTable,
    'oxd-table-sidebar': TableSidebar,
    'oxd-table-filter': TableFilter,
    'oxd-button': Button,
    'oxd-icon-button': IconButton,
    'oxd-quick-search': QuickSearchInput,
    "oxd-list-profile-pic": ProfilePic,
    "oxd-drawer": Drawer,
  },
  props: {
    configurations: {
      type: Object,
      required: true,
    },
    listItems: {
      type: Array,
    },
    totalRecordsCount: {
      type: Number,
      default: 0,
    },
    sidePanelList: {
      type: Array,
      default: () => [],
    },
    quickSearchCreateOptions: {
      type: Function,
      required: true,
    },
  },
  setup(props, { emit }) {
    const sampleImages = images;
    const profilePicRenderer = (_index, _item, _header, row) => {
      const profilePic = {
        component: ListProfilePic,
        props: {
          size: 'small',
          imageSrc: row.profilePic
            ? row.profilePic
            : images['default-user'].value,
        },
      };
      return {
        props: {
          header: {
            cellConfig: {
              ...{profilePic},
            },
          },
        },
      };
    };

    const state = reactive({
      selectedStageId: -1,
      selectedVacancy: {
        id: -1,
        label: 'All Vacancies',
      },
      isSidebarOpen: true,
      checkedItems: [],
      order: {
        candidate: 'ASC',
        email: 'ASC',
        contactNumber: 'ASC',
        dateApplied: 'DESC',
      },
      stages: [],
      vacancies: [
        {
          id: -1,
          label: 'All Vacancies',
        },
        {
          id: 1,
          label: 'Sales Coordinator',
        },
        {
          id: 2,
          label: 'Credit Analyst',
        },
        {
          id: 3,
          label: 'Customer Success Executive',
        },
      ],
      candidateName: "" as string,
      modalState: false as boolean,
    });

    const dropdownStages = computed(() => {
      return [
        {
          id: -1,
          label: 'All Vacancies',
          count: 54,
          displayType: 'text',
          selected: true,
        },
        {
          id: 0,
          label: 'All Candidates',
          count: 39,
          displayType: 'text',
        },
        ...state.stages,
      ];
    });

    const tableHeaders = computed(() => {
      const a = props.configurations.table.headers.map(header => {
        return {
          ...header,
          cellRenderer: header.cellRenderer,
        };
      });
      return a;
    });

    const selectedStage = computed(() => {
      return dropdownStages.value.find(stage => stage.selected);
    });

    const oxdCardTableStyleClasses = computed(() => {
      let styleClasses = 'oxd-classic-table ';
      styleClasses += props.configurations.table.topFilters.visible
        ? 'with-filters'
        : '';
      return styleClasses;
    });

    const selectStage = (item) => {
      emit('sidePanelList:onSelect', item);
    };

    const selectVacancy = (item) => {
      state.selectedVacancy = item;
    };

    const selectCandidate = (value) => {
      emit('quick-search:onSelect', value);
    };

    const tableSort = (value) => {
      emit('update:order', value);
    };

    const showFilterDrawer = (): void => {
      state.modalState = !state.modalState;
    };

    const applySearch = (): void => {
      state.modalState = false;
      emit('drawer-search:apply');
    };

    const cancelSearch = (): void => {
      state.modalState = false;
      emit('drawer-search:reset');
    };

    const closeDrawer = (): void => {
      state.modalState = false;
      emit('drawer-search:cancel');
    };

    const toggleSidebar = (sidebarOpenState: boolean) => {
      emit('table-sidebar:onToggle', sidebarOpenState);
    };

    return {
      state,
      sampleImages,
      dropdownStages,
      selectedStage,
      tableHeaders,
      oxdCardTableStyleClasses,
      selectStage,
      selectVacancy,
      profilePicRenderer,
      selectCandidate,
      showFilterDrawer,
      applySearch,
      cancelSearch,
      closeDrawer,
      toggleSidebar,
      tableSort,
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep(.header-image) {
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
    .candidates-list-table-filter {
      padding-bottom: 0;
      ::v-deep(.oxd-divider) {
        margin-top: 0.25rem;
        margin-bottom: 0;
      }
      ::v-deep(.oxd-table-filter-header-title) {
        .oxd-table-filter-title {
          font-weight: 500 !important;
        }
      }
      ::v-deep(.oxd-table-filter-header) {
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
      ::v-deep(.oxd-autocomplete-text-input) {
        background-color: #fff;
        padding-top: unset;
        padding-bottom: unset;
        height: 36px;
      }
      ::v-deep(.candidate-search-btn) {
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
    ::v-deep(.oxd-icon-button) {
      font-size: 15px;
    }
    ::v-deep(.oxd-table-th) {
      text-align: left;
      padding-top: 0.65rem;
      padding-bottom: 0.65rem;
    }
    ::v-deep(.oxd-table-cell) {
      flex-wrap: nowrap;
    }
  }
}
.w-100 {
  width: 100% !important;
}
</style>
