<template>
  <div class="container">
    <oxd-list>
      <template v-slot:sidebarBody>
      </template>
    </oxd-list>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, computed} from 'vue';
import List from '@orangehrm/oxd/core/components/List/List';
import ListProfilePic from '@orangehrm/oxd/core/components/List/ListProfilePic';

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
    'oxd-list': List
  },

  props: {},

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
</style>
