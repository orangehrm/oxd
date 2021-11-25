<!--
/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */
-->

<template>
  <div class="orangehrm-container recruitment-container">
    <oxd-table-sidebar
      class="oxd-table-sidebar"
      width="200px"
      :list="stages"
      :button="{
        label: 'Add candidates',
        style: {
          height: '36px'
        }
      }"
      @list:onSelect="selectStage"
    >
      <template v-slot:body>
        <oxd-select-input-btn
          :button="{
            label: selectedVacancy && selectedVacancy.label ? selectedVacancy.label : selectedStage && selectedStage.label ? selectedStage.label : '',
            iconName: 'eye',
            displayType: 'label',
            doubleLineLabel: true,
          }"
          :options="vacancies"
          :open-dropdown-initially="true"
          @update:modelValue="selectVacancy"
          :modelValue="selectedVacancy"
        />
      </template>
    </oxd-table-sidebar>
    <div class="table-card-list-wrapper">
      <oxd-table-filter
        class="candidates-list-table-filter"
        :filter-title="`(${totalRecordsCount}) ${totalRecordsCount > 1
          ? 'Candidates'
          : 'Candidate' } found`"
        :hide-filter-slot="true"
      >
        <template v-slot:toggleOptions>
          <oxd-quick-search />
          <oxd-icon-button name="funnel" @click="toggleFilterModal(true)"/>
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
        :selector="selector"
        :headers="headers"
        :items="items"
        :selectable="true"
        :clickable="false"
        :isDynamicCell="true"
        :style-class="'oxd-classic-table with-filters'"
        v-model:selected="checkedItems"
        v-model:order="order"
        rowDecorator="oxd-table-decorator-card"
      />

      <oxd-dialog v-if="showFilterModal" @update:show="toggleFilterModal(false)" :style="{width: '800px'}">
        <p>
          Filter modal goes here
        </p>
      </oxd-dialog>
    </div>
  </div>
</template>

<script>
import CardTable from '@orangehrm/oxd/core/components/CardTable/CardTable';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput';
import TableFilter from '@orangehrm/oxd/core/components/TableFilter/TableFilter';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon';
import Button from '@orangehrm/oxd/core/components/Button/Button';
import QuickSearchInput from '@orangehrm/oxd/core/components/Input/Autocomplete/QuickSearchInput';
import Dialog from '@orangehrm/oxd/core/components/Dialog/Dialog';
import TableSidebar from '@orangehrm/oxd/core/components/TableSidebar/TableSidebar';
import ProfilePic from './../ProfilePic/CustomTemplate';
import SelectInputButton from '@orangehrm/oxd/core/components/Input/Select/SelectInputButton.vue';

export default {
  data() {
    return {
      selectedVacancy: {
        id: -1,
        label: "All Vacancies",
      },
      showFilterModal: false,
      headers: [
        {
          name: 'profilepic',
          slot: 'footer',
          title: '',
          style: {width: '44px'},
          cellType: 'oxd-table-cell-actions',
          cellRenderer: this.profilePicRenderer,
        },
        { name: 'candidate', sortField: 'candidate', title: 'Candidate', style: {flex: 1}, },
        { name: 'email', sortField: 'email', title: 'Email', style: {flex: 1} },
        { name: 'contactNumber', sortField: 'contactNumber', title: 'Contact Number', style: {flex: 1} },
        { name: 'dateApplied', sortField: 'dateApplied', title: 'Date Applied', style: {flex: 1} },
        {
          name: 'action',
          slot: 'footer',
          title: 'Stage',
          style: { width: "300px" },
          cellType: 'oxd-table-cell-actions',
          cellRenderer: this.actionsRenderer,
        },
      ],
      totalRecordsCount: 138,
      items: [
        {
          profilePic: true,
          candidate: 'Trevor Atkins',
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
            typeId: '1'
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
              typeId: '1'
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
              typeId: '9'
            }
          ],
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true
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
            typeId: '1'
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
              typeId: '1'
            }
          ],
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true
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
            typeId: '9'
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
              typeId: '1'
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
              typeId: '9'
            }
          ],
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true
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
            typeId: '9'
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
              typeId: '1'
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
              typeId: '9'
            }
          ],
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true
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
            typeId: '9'
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
              typeId: '1'
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
              typeId: '9'
            }
          ],
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true
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
            typeId: '9'
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
              typeId: '1'
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
              typeId: '9'
            }
          ],
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true
          },
        },
      ],
      checkedItems: [],
      order: {
        'candidate': 'ASC',
        'email': 'ASC',
        'contactNumber': 'ASC',
        'dateApplied': 'DESC',
      },
      vacancies: [
        {
          id: -1,
          label: "All Vacancies",
        },
        {
          id: 1,
          label: 'Sales Coordinator'
        },
        {
          id: 2,
          label: 'Credit Analyst'
        },
        {
          id: 3,
          label: 'Customer Success Executive'
        }
      ],
      stages: [
        {
          id: 1,
          label: 'Application Received',
          count: 24,
          displayType: 'label-info',
          style: {
            backgroundColor: '#d1dff6',
            color: '#1f6ffd'
          }
        },
        {
          id: 2,
          label: 'Phone Screening',
          count: 11,
          displayType: 'label-warn',
          style: {
            backgroundColor: '#ebebf0',
            color: '#65738f'
          }
        },
        {
          id: 3,
          label: '1st In-Person Interview',
          count: 3,
          displayType: 'label',
          style: {
            backgroundColor: '#ebebf0',
            color: '#65738f'
          }
        },
        {
          id: 4,
          label: 'Shortlisted',
          count: 0,
          displayType: 'label-warn',
          style: {
            backgroundColor: '#f8ebfd',
            color: '#c57afd'
          }
        },
        {
          id: 5,
          label: 'Panel Interview',
          count: 9,
          displayType: 'label-info',
          style: {
            backgroundColor: '#ebebf0',
            color: '#65738f'
          }
        },
        {
          id: 6,
          label: 'Reference Check',
          count: 1,
          displayType: 'label-warn',
          style: {
            backgroundColor: '#ebebf0',
            color: '#65738f'
          }
        },
        {
          id: 7,
          label: '321 Form Onboarding',
          count: 0,
          displayType: 'label-warn',
          style: {
            backgroundColor: '#ebebf0',
            color: '#65738f'
          }
        },
        {
          id: 8,
          label: 'Job Offer',
          count: 2,
          displayType: 'label-success',
          style: {
            backgroundColor: '#e1f8e0',
            color: '#74cb1e'
          }
        },
        {
          id: 9,
          label: 'Hired',
          count: 2,
          displayType: 'label-warn',
          style: {
            backgroundColor: '#fceee3',
            color: '#ed7d30'
          }
        },
        {
          id: 10,
          label: 'Rejected',
          count: 3,
          displayType: 'label-danger',
          style: {
            backgroundColor: '#f9e3e9',
            color: '#e74432'
          }
        },
      ]
    };
  },

  components: {
    'oxd-card-table': CardTable,
    'oxd-table-sidebar': TableSidebar,
    'oxd-table-filter': TableFilter,
    'oxd-button': Button,
    'oxd-icon-button': IconButton,
    'oxd-card-table': CardTable,
    'oxd-quick-search': QuickSearchInput,
    'oxd-dialog': Dialog,
    'oxd-profile-pix': ProfilePic,
    'oxd-select-input-btn': SelectInputButton
  },

  computed: {
    dropdownStages() {
      return [
        {
          id: -1,
          label: 'All Vacancies',
          count: 54,
          displayType: 'text',
          selected: true
        },
        {
          id: 0,
          label: 'All Candidates',
          count: 39,
          displayType: 'text'
        },
        ...this.stages
      ]
    },
    selectedStage() {
      return this.dropdownStages.find(stage => stage.selected)
    }
  },
  methods: {
    selectStage(stage) {
      console.log(stage);
    },
    selectVacancy(modelValue) {
      this.selectedVacancy = modelValue
    },
    toggleFilterModal (isVisible) {
      this.showFilterModal = isVisible
    },
    profilePicRenderer(_index, _item, header, row) {
      const profilePic = {
        component: ProfilePic
      }
      return {
        props: {
          header: {
            cellConfig: {
              ...(row.profilePic && {profilePic}),
            },
          },
        },
      };
    },
    actionsRenderer(_index, _item, header, row) {
      const rowObj = JSON.parse(JSON.stringify(row))
      const candidateStages = rowObj.candidateStages && rowObj.candidateStages.length > 0 ? rowObj.candidateStages : []
      const mappedStages = candidateStages.map(candidateState => {
        return {
          ...candidateState,
          id: candidateState.id,
          label: candidateState.eventTitle
        }
      })
      const selectedStage = {
        ...rowObj.selectedStage,
        label: rowObj.selectedStage && rowObj.selectedStage.eventTitle ? rowObj.selectedStage.eventTitle : ''
      }
      const stage = {
        component: SelectInput,
        props: {
          options: mappedStages,
          modelValue: selectedStage,
          'onUpdate:modelValue': (params) => {
            console.log(params);
          },
        },
      }
      const downloadResume = {
        component: 'oxd-icon-button',
        props: {
          label: 'Download resume',
          displayType: 'label',
          size: 'medium',
          name: 'oxd-download-doc'
        },
      }
      const downloadApplicationForm = {
        component: 'oxd-icon-button',
        props: {
          label: 'Download Application Form',
          displayType: 'label',
          size: 'medium',
          name: 'oxd-download'
        },
      }
      const compare = {
        component: 'oxd-icon-button',
        props: {
          label: 'Download Application Form',
          displayType: 'label',
          size: 'medium',
          name: 'oxd-users'
        },
      }
      return {
        props: {
          header: {
            cellConfig: {
              ...(row.allowedActions.stageSlot && {stage}),
              ...(row.allowedActions.downloadResumeSlot && {downloadResume}),
              ...(row.allowedActions.downloadApplicationFormSlot && {downloadApplicationForm}),
              ...(row.allowedActions.compareSlot && {compare}),
            },
          },
        },
      };
    },
  },
};
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
    width: calc(100% - 200px);
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
</style>