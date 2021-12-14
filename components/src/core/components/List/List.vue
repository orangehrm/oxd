<template>
  <div
    class="orangehrm-container recruitment-container"
    :class="{'table-sidebar-open': state.isSidebarOpen}"
  >
    <oxd-table-sidebar
      class="oxd-table-sidebar"
      width="230px"
      :list="state.stages"
      :button="{
        label: 'Add Candidate',
        style: {
          height: '36px',
        },
      }"
      :selected-stage-id="state.selectedStageId"
      @list:onSelect="selectStage"
      @table-sidebar:onToggle="toggleSidebar"
      :is-sidebar-open="state.isSidebarOpen"
    >
      <template v-slot:sidebarBody>
        <slot name="sidebarBody">
          <oxd-select-input-btn
            :button="{
              label:
                state.selectedVacancy && state.selectedVacancy.label
                  ? state.selectedVacancy.label
                  : state.selectedStage && state.selectedStage.label
                  ? state.selectedStage.label
                  : '',
              iconName: 'eye',
              displayType: 'label',
              doubleLineLabel: true,
            }"
            :hideDropdownLabel="!state.isSidebarOpen"
            :options="state.vacancies"
            :open-dropdown-initially="true"
            @update:modelValue="selectVacancy"
            :modelValue="state.selectedVacancy"
          />
        </slot>
      </template>
    </oxd-table-sidebar>
    <div
      class="table-card-list-wrapper"
      :class="{'w-100': !state.isSidebarOpen}"
    >
      <oxd-table-filter
        class="candidates-list-table-filter"
        :filter-title="
          `(${state.totalRecordsCount}) ${
            state.totalRecordsCount > 1 ? 'Candidates' : 'Candidate'
          } found`
        "
      >
        <template v-slot:toggleOptions>
          <oxd-quick-search />
          <oxd-icon-button name="funnel" @click="toggleFilterModal(true)" />
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
        :headers="state.headers"
        :items="state.items"
        :selectable="true"
        :clickable="false"
        :isDynamicCell="true"
        :style-class="'oxd-classic-table with-filters'"
        v-model:selected="state.checkedItems"
        v-model:order="state.order"
        rowDecorator="oxd-table-decorator-card"
      />

      <oxd-dialog
        v-if="state.showFilterModal"
        @update:show="toggleFilterModal(false)"
        :style="{width: '800px'}"
      >
        <p>
          Filter modal goes here
        </p>
      </oxd-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import CardTable from '@orangehrm/oxd/core/components/CardTable/CardTable.vue';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';
import TableFilter from '@orangehrm/oxd/core/components/TableFilter/TableFilter.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import QuickSearchInput from '@orangehrm/oxd/core/components/Input/Autocomplete/QuickSearchInput.vue';
import Dialog from '@orangehrm/oxd/core/components/Dialog/Dialog.vue';
import TableSidebar from '@orangehrm/oxd/core/components/TableSidebar/TableSidebar.vue';
import ListProfilePic from './ListProfilePic.vue';
import SelectInputButton from '@orangehrm/oxd/core/components/Input/Select/SelectInputButton.vue';

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
    'oxd-dialog': Dialog,
    'oxd-select-input-btn': SelectInputButton,
  },

  setup() {
    const profilePicRenderer = (_index, _item, _header, row) => {
      const profilePic = {
        component: ListProfilePic,
        props: {
          size: 'small',
          imageSrc: require('@orangehrm/oxd/assets/images/user-default-400.png'),
        },
      };
      return {
        props: {
          header: {
            cellConfig: {
              ...(row.profilePic && {profilePic}),
            },
          },
        },
      };
    };

    const actionsRenderer = (_index, _item, _header, row) => {
      const rowObj = JSON.parse(JSON.stringify(row));
      const candidateStages =
        rowObj.candidateStages && rowObj.candidateStages.length > 0
          ? rowObj.candidateStages
          : [];
      const mappedStages = candidateStages.map(candidateState => {
        return {
          ...candidateState,
          id: candidateState.id,
          label: candidateState.eventTitle,
        };
      });
      const selectedStage = {
        ...rowObj.selectedStage,
        label:
          rowObj.selectedStage && rowObj.selectedStage.eventTitle
            ? rowObj.selectedStage.eventTitle
            : '',
      };
      const stage = {
        component: SelectInput,
        props: {
          options: mappedStages,
          modelValue: selectedStage,
          'onUpdate:modelValue': params => {
            console.log(params);
          },
        },
      };
      const downloadResume = {
        component: 'oxd-icon-button',
        props: {
          label: 'Download resume',
          displayType: 'label',
          size: 'medium',
          name: 'oxd-download-doc',
        },
      };
      const downloadApplicationForm = {
        component: 'oxd-icon-button',
        props: {
          label: 'Download Application Form',
          displayType: 'label',
          size: 'medium',
          name: 'oxd-download',
        },
      };
      const compare = {
        component: 'oxd-icon-button',
        props: {
          label: 'Download Application Form',
          displayType: 'label',
          size: 'medium',
          name: 'oxd-users',
        },
      };
      return {
        props: {
          header: {
            cellConfig: {
              ...(row.allowedActions.stageSlot && {stage}),
              ...(row.allowedActions.downloadResumeSlot && {downloadResume}),
              ...(row.allowedActions.downloadApplicationFormSlot && {
                downloadApplicationForm,
              }),
              ...(row.allowedActions.compareSlot && {compare}),
            },
          },
        },
      };
    };

    const state = reactive({
      selectedVacancy: {
        id: -1,
        label: 'All Vacancies',
      },
      selectedStageId: -1,
      showFilterModal: false,
      isSidebarOpen: true,
      headers: [
        {
          name: 'profilepic',
          slot: 'footer',
          title: '',
          style: {width: '44px'},
          cellType: 'oxd-table-cell-actions',
          cellRenderer: profilePicRenderer,
        },
        {
          name: 'candidate',
          sortField: 'candidate',
          title: 'Candidate',
          style: {flex: 1},
        },
        {name: 'email', sortField: 'email', title: 'Email', style: {flex: 1}},
        {
          name: 'contactNumber',
          sortField: 'contactNumber',
          title: 'Contact Number',
          style: {flex: 1},
        },
        {
          name: 'dateApplied',
          sortField: 'dateApplied',
          title: 'Date Applied',
          style: {flex: 1},
        },
        {
          name: 'action',
          slot: 'footer',
          title: 'Stage',
          style: {width: '300px'},
          cellType: 'oxd-table-cell-actions',
          cellRenderer: actionsRenderer,
        },
      ],
      totalRecordsCount: 138,
      items: [
        {
          profilePic: true,
          candidate: 'Venkatanarasimharajuvar Narasimha Rajuvaripet',
          email: 'trevor@o.com',
          contactNumber: '+8552616462',
          dateApplied: 'Thu, 11 Mar 2021',
          selectedStage: {
            eventTitle: 'Application Received',
            id: '1',
            isInterview: false,
            isScoreType: false,
            isTest: false,
            level: '1',
            maxScore: '100',
            threshold: null,
            type: 'Application Received',
            typeId: '1',
          },
          candidateStages: [
            {
              eventTitle: 'Application Received',
              id: '1',
              isInterview: false,
              isScoreType: false,
              isTest: false,
              level: '1',
              maxScore: '100',
              threshold: null,
              type: 'Application Received',
              typeId: '1',
            },
            {
              eventTitle: 'Shortlisted',
              id: '2',
              isInterview: false,
              isScoreType: false,
              isTest: false,
              level: '2',
              maxScore: '100',
              threshold: null,
              type: 'Shortlisted',
              typeId: '9',
            },
          ],
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true,
          },
        },
        {
          profilePic: true,
          candidate: 'Lucy Valdez',
          email: 'lucy@o.com',
          contactNumber: '+8523616462',
          dateApplied: 'Thu, 10 Mar 2021',
          selectedStage: {
            eventTitle: 'Application Received',
            id: '1',
            isInterview: false,
            isScoreType: false,
            isTest: false,
            level: '1',
            maxScore: '100',
            threshold: null,
            type: 'Application Received',
            typeId: '1',
          },
          candidateStages: [
            {
              eventTitle: 'Application Received',
              id: '1',
              isInterview: false,
              isScoreType: false,
              isTest: false,
              level: '1',
              maxScore: '100',
              threshold: null,
              type: 'Application Received',
              typeId: '1',
            },
          ],
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true,
          },
        },
        {
          profilePic: true,
          candidate: 'SRIMANSI JOSHE',
          email: 'JOSHE@gmail.com',
          contactNumber: '+6523616462',
          dateApplied: 'Wed, 30 Sep 2020',
          selectedStage: {
            eventTitle: 'Shortlisted',
            id: '2',
            isInterview: false,
            isScoreType: false,
            isTest: false,
            level: '2',
            maxScore: '100',
            threshold: null,
            type: 'Shortlisted',
            typeId: '9',
          },
          candidateStages: [
            {
              eventTitle: 'Application Received',
              id: '1',
              isInterview: false,
              isScoreType: false,
              isTest: false,
              level: '1',
              maxScore: '100',
              threshold: null,
              type: 'Application Received',
              typeId: '1',
            },
            {
              eventTitle: 'Shortlisted',
              id: '2',
              isInterview: false,
              isScoreType: false,
              isTest: false,
              level: '2',
              maxScore: '100',
              threshold: null,
              type: 'Shortlisted',
              typeId: '9',
            },
          ],
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true,
          },
        },
        {
          profilePic: true,
          candidate: 'Peter Smith',
          email: 'petersmith@gmail.com',
          contactNumber: '+1 876-345-1505',
          dateApplied: 'Tue, 30 Apr 2019',
          selectedStage: {
            eventTitle: 'Shortlisted',
            id: '2',
            isInterview: false,
            isScoreType: false,
            isTest: false,
            level: '2',
            maxScore: '100',
            threshold: null,
            type: 'Shortlisted',
            typeId: '9',
          },
          candidateStages: [
            {
              eventTitle: 'Application Received',
              id: '1',
              isInterview: false,
              isScoreType: false,
              isTest: false,
              level: '1',
              maxScore: '100',
              threshold: null,
              type: 'Application Received',
              typeId: '1',
            },
            {
              eventTitle: 'Shortlisted',
              id: '2',
              isInterview: false,
              isScoreType: false,
              isTest: false,
              level: '2',
              maxScore: '100',
              threshold: null,
              type: 'Shortlisted',
              typeId: '9',
            },
          ],
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true,
          },
        },
        {
          profilePic: true,
          candidate: 'Jo Denton',
          email: 'jodentan@gmail.com',
          contactNumber: '+1 888-452-2314',
          dateApplied: 'Tue, 30 Apr 2019',
          selectedStage: {
            eventTitle: 'Shortlisted',
            id: '2',
            isInterview: false,
            isScoreType: false,
            isTest: false,
            level: '2',
            maxScore: '100',
            threshold: null,
            type: 'Shortlisted',
            typeId: '9',
          },
          candidateStages: [
            {
              eventTitle: 'Application Received',
              id: '1',
              isInterview: false,
              isScoreType: false,
              isTest: false,
              level: '1',
              maxScore: '100',
              threshold: null,
              type: 'Application Received',
              typeId: '1',
            },
            {
              eventTitle: 'Shortlisted',
              id: '2',
              isInterview: false,
              isScoreType: false,
              isTest: false,
              level: '2',
              maxScore: '100',
              threshold: null,
              type: 'Shortlisted',
              typeId: '9',
            },
          ],
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true,
          },
        },
        {
          profilePic: true,
          candidate: 'Garry White',
          email: 'garrywhite@gmail.com',
          contactNumber: '+1 788-482-1505',
          dateApplied: 'Fri, 26 Apr 2019',
          selectedStage: {
            eventTitle: 'Shortlisted',
            id: '2',
            isInterview: false,
            isScoreType: false,
            isTest: false,
            level: '2',
            maxScore: '100',
            threshold: null,
            type: 'Shortlisted',
            typeId: '9',
          },
          candidateStages: [
            {
              eventTitle: 'Application Received',
              id: '1',
              isInterview: false,
              isScoreType: false,
              isTest: false,
              level: '1',
              maxScore: '100',
              threshold: null,
              type: 'Application Received',
              typeId: '1',
            },
            {
              eventTitle: 'Shortlisted',
              id: '2',
              isInterview: false,
              isScoreType: false,
              isTest: false,
              level: '2',
              maxScore: '100',
              threshold: null,
              type: 'Shortlisted',
              typeId: '9',
            },
          ],
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true,
          },
        },
      ],
      checkedItems: [],
      order: {
        candidate: 'ASC',
        email: 'ASC',
        contactNumber: 'ASC',
        dateApplied: 'DESC',
      },
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
      stages: [
        {
          id: -1,
          label: 'All Candidates',
          count: 33,
          displayType: 'label-info',
          style: {
            backgroundColor: '#d1dff6',
            color: '#1f6ffd',
          },
        },
        {
          id: 1,
          label: 'Application Received',
          count: 24,
          displayType: 'label-info',
          style: {
            backgroundColor: '#d1dff6',
            color: '#1f6ffd',
          },
        },
        {
          id: 2,
          label: 'Phone Screening',
          count: 11,
          displayType: 'label-warn',
          style: {
            backgroundColor: '#ebebf0',
            color: '#65738f',
          },
        },
        {
          id: 3,
          label: '1st In-Person Interview',
          count: 3,
          displayType: 'label',
          style: {
            backgroundColor: '#ebebf0',
            color: '#65738f',
          },
        },
        {
          id: 4,
          label: 'Shortlisted',
          count: 0,
          displayType: 'label-warn',
          style: {
            backgroundColor: '#f8ebfd',
            color: '#c57afd',
          },
        },
        {
          id: 5,
          label: 'Panel Interview',
          count: 9,
          displayType: 'label-info',
          style: {
            backgroundColor: '#ebebf0',
            color: '#65738f',
          },
        },
        {
          id: 6,
          label: 'Reference Check',
          count: 1,
          displayType: 'label-warn',
          style: {
            backgroundColor: '#ebebf0',
            color: '#65738f',
          },
        },
        {
          id: 7,
          label: '321 Form Onboarding',
          count: 0,
          displayType: 'label-warn',
          style: {
            backgroundColor: '#ebebf0',
            color: '#65738f',
          },
        },
        {
          id: 8,
          label: 'Job Offer',
          count: 2,
          displayType: 'label-success',
          style: {
            backgroundColor: '#e1f8e0',
            color: '#74cb1e',
          },
        },
        {
          id: 9,
          label: 'Hired',
          count: 2,
          displayType: 'label-warn',
          style: {
            backgroundColor: '#fceee3',
            color: '#ed7d30',
          },
        },
        {
          id: 10,
          label: 'Rejected',
          count: 3,
          displayType: 'label-danger',
          style: {
            backgroundColor: '#f9e3e9',
            color: '#e74432',
          },
        },
      ] as StageI[],
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

    const selectedStage = computed(() => {
      return dropdownStages.value.find(stage => stage.selected);
    });

    const selectStage = (stage: StageI) => {
      console.log(stage);
    };

    const selectVacancy = (modelValue: SelectedVacancyI) => {
      state.selectedVacancy = modelValue;
    };

    const toggleFilterModal = (isVisible: boolean) => {
      state.showFilterModal = isVisible;
    };

    const toggleSidebar = () => {
      state.isSidebarOpen = !state.isSidebarOpen;
    };

    return {
      state,
      dropdownStages,
      selectedStage,
      selectStage,
      selectVacancy,
      toggleFilterModal,
      profilePicRenderer,
      actionsRenderer,
      toggleSidebar,
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
    margin-top: 1.25rem;
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
            &:hover {
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
    padding-top: 0.5rem;
    ::v-deep(.oxd-icon-button) {
      font-size: 15px;
    }
    ::v-deep(.oxd-table-th) {
      text-align: left;
      padding-top: 0.65rem;
      padding-bottom: 0.65rem;
    }
  }
}
.w-100 {
  width: 100% !important;
}
</style>
