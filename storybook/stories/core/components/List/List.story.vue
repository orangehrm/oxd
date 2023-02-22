<template>
  <div class="container">
    <oxd-list
      :configurations="configurations"
      :list-items="state.items"
      :list-highlightRows="listHighlightRows"
      :whole-records-count="110"
      :filtered-total-records-count="100"
      :side-panel-list="state.stages"
      :quick-search-options="candidateQuickSearch"
      :pagination="state.pagination"
      :selected-list-item="state.vacancies"
      :emptyMsg="{
        message: 'Sorry, No Emails Found!',
        icon: 'oxd-no-emails',
      }"
      @table-left-panel:onToggle="toggleLeftPanel"
      @topfilters:onExportBtnClick="exportCSV"
      @sidePanelList:onHeaderBtnClick="showAddCandidatesModal"
      @sidePanelList:onSelect="selectStage"
      @quick-search:onSelect="candidateQuickSearchSelect"
      @quick-search:onClear="candidateQuickSearchClear"
      @quick-search:onSearch="candidateQuickSearchKeywordSearch"
      @drawer:show="drawerShow"
      @drawer-search:apply="applyDrawerSearch"
      @drawer-search:reset="resetDrawerSearch"
      @drawer-search:cancel="cancelDrawerSearch"
      @update:order="tableSort"
      @pagination:onPrevious="selectPreviousPage"
      @pagination:onNext="selectNextPaginate"
      @pagination:onSelectPage="selectExactPage"
      @pagination:onSelectPerPage="selectPerPage"
    >
      <template v-slot:sidePanelBody>
        <oxd-select-input-btn
          :button="{
            label: selectedVacancyLabel,
            labelMini: configurations.table.leftPanel.body.button.labelMini,
            iconName: configurations.table.leftPanel.body.button.iconName,
            iconSize: configurations.table.leftPanel.body.button.iconSize,
            iconStyle: configurations.table.leftPanel.body.button.iconStyle,
            style: configurations.table.leftPanel.body.button.style,
            displayType: configurations.table.leftPanel.body.button.displayType,
            doubleLineLabel:
              configurations.table.leftPanel.body.button.doubleLineLabel,
          }"
          :hideDropdownLabel="!state.isLeftPanelOpen"
          :tooltip="
            !state.isLeftPanelOpen
              ? state.selectedVacancy.id > -1
                ? state.selectedVacancy.label
                : configurations.table.leftPanel.body.button.label
              : null
          "
          flow="right"
          :options="state.vacancies"
          :open-dropdown-initially="true"
          :dropdown-styles="configurations.table.leftPanel.body.dropdown.style"
          @update:modelValue="selectVacancy"
          :modelValue="state.selectedVacancy"
        />
      </template>
    </oxd-list>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, computed, ref} from 'vue';
import List from '@orangehrm/oxd/core/components/List/List.vue';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';
import SelectInputButton from '@orangehrm/oxd/core/components/Input/Select/SelectInputButton.vue';
import list from './list-with-sidebar';
import basicList from './basic-list-schema';
import candidateAvatars from './candidate-avatars.json';
import map from 'lodash/map';

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

const initialFilters: IAppliedFilter = {
  candidateEventStage: null,
  vacancyId: null,
  candidateIdList: [],
  subUnitId: null,
  jobTitleId: null,
  locationId: null,
  orderField: null,
  orderBy: null,
  nameTxt: null,
  appliedDateFrom: '2021-02-21',
  appliedDateTo: '2022-02-21',
};

export default defineComponent({
  components: {
    'oxd-list': List,
    'oxd-select-input-btn': SelectInputButton,
  },

  props: {
    listHighlightRows: {
      type: Object,
    },
    emptyMsg: {
      type: Object,
    },
  },

  setup() {
    const appliedFilters = ref(JSON.parse(JSON.stringify(initialFilters)));

    const configurations = computed(() => {
      list.table.headers = map(list.table.headers, (item) => {
        return {
          ...item,
          cellRenderer: eval(item.cellRenderer),
        };
      });
      return list;
    });

    const selectedVacancyLabel = computed(() => {
      let label = '';
      if (state.selectedVacancy) {
        label = state.selectedVacancy.label;
      }
      return label;
    });

    const actionsRenderer = (_index, _item, _header, row) => {
      const rowObj = JSON.parse(JSON.stringify(row));
      const candidateStages =
        rowObj.candidateStages && rowObj.candidateStages.length > 0
          ? rowObj.candidateStages
          : [];
      const mappedStages = candidateStages.map((candidateState) => {
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
          'onUpdate:modelValue': (params) => {
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
          tooltip: 'Download Resume',
        },
      };
      const downloadApplicationForm = {
        component: 'oxd-icon-button',
        props: {
          label: 'Download Application Form',
          displayType: 'label',
          size: 'medium',
          name: 'oxd-download',
          tooltip: 'Download Application Form',
        },
      };
      const compare = {
        component: 'oxd-icon-button',
        props: {
          label: 'Download Application Form',
          displayType: 'label',
          size: 'medium',
          name: 'oxd-users',
          tooltip: 'Compare With Other Candidates',
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
      isLeftPanelOpen: true,
      headers: list,
      totalRecordsCount: 138,
      items: [
        {
          profilePic: candidateAvatars.avatars[0],
          url1: 'google.com',
          url2: 'yahoo.com',
          candidate: 'Venkatanarasimharajuvar Narasimha Rajuvaripet',
          email: 'trevor@o.com',
          contactNumber: '+8552616462',
          dateOfApplication: '2021-03-11',
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
          profilePic: candidateAvatars.avatars[1],
          url1: 'google.com',
          url2: 'yahoo.com',
          candidate: 'Lucy Valdez',
          email: 'lucy@o.com',
          contactNumber: '+8523616462',
          dateOfApplication: '2021-03-10',
          selectedStage: {
            eventTitle: "Interview, CEO's interview, One on one interview",
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
          profilePic: candidateAvatars.avatars[2],
          url1: 'google.com',
          url2: 'yahoo.com',
          candidate: 'Lucy Valdez',
          email: 'lucy@o.com',
          contactNumber: '+8523616462',
          dateOfApplication: '2021-03-10',
          selectedStage: {
            eventTitle: "Interview, CEO's interview, One on one interview",
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
          profilePic: candidateAvatars.avatars[3],
          candidate: 'SRIMANSI JOSHE',
          email: 'JOSHE@gmail.com',
          contactNumber: '+6523616462',
          dateOfApplication: '2020-09-30',
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
          profilePic: null,
          candidate: 'Peter Smith',
          email: 'petersmith@gmail.com',
          contactNumber: '+1 876-345-1505',
          dateOfApplication: '2019-04-30',
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
          profilePic: candidateAvatars.avatars[4],
          candidate: 'Jo Denton',
          email: 'jodentan@gmail.com',
          contactNumber: '+1 888-452-2314',
          dateOfApplication: '2019-04-30',
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
          profilePic: candidateAvatars.avatars[5],
          candidate: 'Garry White',
          email: 'garrywhite@gmail.com',
          contactNumber: '+1 788-482-1505',
          dateOfApplication: '2019-04-26',
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
      highlightRows: {
        rowIndexes: [0, 2],
        type: 'success',
      },
      order: {
        candidate: 'ASC',
        email: 'ASC',
        contactNumber: 'ASC',
        dateOfApplication: 'DESC',
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
      pagination: {
        perPage: {
          id: 2,
          label: '20',
        },
        limit: 20,
        pages: [10, 20, 50, 100],
      } as {
        perPage: {
          id: number;
          label: string;
        };
        limit: number;
        pages: number[];
      },
      modalState: false,
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
      return dropdownStages.value.find((stage) => stage.selected);
    });
    const showAddCandidatesModal = () => {
      console.log('show add candidates modal');
    };
    const selectStage = (stage: StageI) => {
      console.log(stage);
    };
    const candidateQuickSearchSelect = (candidate: ICandidate): void => {
      appliedFilters.value.candidateIdList = [candidate.candidateId];
    };
    const candidateQuickSearchClear = () => {
      delete appliedFilters.value.candidateIdList;
    };
    const candidateQuickSearchKeywordSearch = (value) => {
      console.log('Keyword search');
    };
    const selectVacancy = (modelValue: SelectedVacancyI) => {
      state.selectedVacancy = modelValue;
    };
    const toggleFilterModal = (isVisible: boolean) => {
      state.showFilterModal = isVisible;
    };
    const applyDrawerSearch = (): void => {
      state.modalState = false;
    };
    const resetDrawerSearch = (): void => {
      appliedFilters.value = initialFilters;
      appliedQueries.value = initialQueries;
      state.selectedVacancy = {
        id: -1,
        label: 'All Vacancy',
      };
      state.modalState = false;
    };
    const cancelDrawerSearch = (): void => {
      state.modalState = false;
    };
    const tableSort = (obj: {[key: string]: string}) => {
      for (const key in obj) {
        const value = obj[key];
        if (value !== 'DEFAULT') {
          const orderFieldKey =
            key === 'dateOfApplication' ? 'dateOfApplication' : key;
          const orderField = orderFieldKey.replace(
            /[A-Z]/g,
            (letter) => `_${letter.toLowerCase()}`,
          );
          const query = [`orderField=${orderField}`, `orderBy=${value}`];
          let includes;
        }
      }
    };
    const toggleLeftPanel = () => {
      state.isLeftPanelOpen = !state.isLeftPanelOpen;
    };
    const closeModal = () => {
      state.modalState = false;
    };
    const drawerShow = (event: Event) => {
      state.modalState = !state.modalState;
      alert(`Drawer state: ${state.modalState}`);
    };
    const exportCSV = () => {
      alert('Exported');
    };

    const candidateQuickSearch = (name: string) => {
      return new Promise((resolve) => {
        if (name.trim()) {
          fetch(`https://api.github.com/search/users?q=${name}`)
            .then((response) => response.json())
            .then((json) => {
              const {items} = json;
              resolve(
                items.map((item) => {
                  return {
                    id: item.id,
                    label: item.login,
                    avatar_url: item.avatar_url,
                  };
                }),
              );
            });
        } else {
          resolve([]);
        }
      });
    };
    const selectPreviousPage = (currentPage: number) => {
      console.log(currentPage);
    };
    const selectNextPaginate = (currentPage: number) => {
      console.log(currentPage);
    };
    const selectExactPage = (page: {native: Event; page: number}) => {
      console.log(page.page);
    };
    const selectPerPage = (page: {
      id: number;
      label: number | number;
      _selected: boolean;
    }) => {
      state.pagination.perPage = page;
      console.log(page.label);
    };

    return {
      state,
      configurations,
      selectStage,
      candidateQuickSearchSelect,
      candidateQuickSearchClear,
      candidateQuickSearchKeywordSearch,
      selectedStage,
      selectVacancy,
      dropdownStages,
      toggleFilterModal,
      actionsRenderer,
      toggleLeftPanel,
      showAddCandidatesModal,
      candidateQuickSearch,
      closeModal,
      drawerShow,
      exportCSV,
      applyDrawerSearch,
      resetDrawerSearch,
      cancelDrawerSearch,
      tableSort,
      selectPreviousPage,
      selectNextPaginate,
      selectExactPage,
      selectPerPage,
      selectedVacancyLabel,
    };
  },
});
</script>
