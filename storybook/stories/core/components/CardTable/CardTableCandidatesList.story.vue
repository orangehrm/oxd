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
  <div class="orangehrm-container">
    <oxd-table-filter :filter-title="`${totalRecordsCount} ${totalRecordsCount > 1 ? 'Candidates' : 'Candidate' } found`">
      <template v-slot:toggleOptions>
        <oxd-quick-search />
        <oxd-icon-button name="funnel" @click="toggleFilterModal(true)"/>
        <oxd-icon-button name="gear-fill" />
      </template>
      <template v-slot:exportOptions>
        <oxd-button
          size="small"
          display-type="tool"
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
      :style-class="'oxd-classic-table'"
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

export default {
  data() {
    return {
      showFilterModal: false,
      filters: {
        username: '',
        role: [1],
        empName: [],
        status: [2],
      },
      headers: [
        { name: 'candidate', sortField: 'candidate', title: 'Candidate', style: {flex: 1} },
        { name: 'email', sortField: 'email', title: 'Email', style: {flex: 1} },
        { name: 'contactNumber', sortField: 'contactNumber', title: 'Contact Number', style: {flex: 1} },
        { name: 'dateApplied', sortField: 'dateApplied', title: 'Date Applied', style: {flex: 1} },
        {
          name: 'action',
          slot: 'footer',
          title: 'Stage',
          style: {flex: '10%'},
          cellType: 'oxd-table-cell-actions',
          cellRenderer: this.actionCellRenderer,
        },
      ],
      totalRecordsCount: 138,
      items: [
        {
          allowedActions: {
            stageSlot: true
          },
          candidate: 'Trevor Atkins',
          email: 'trevor@o.com',
          contactNumber: '+8552616462',
          dateApplied: 'Thu, 11 Mar 2021',
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true
          },
        },
        {
          candidate: 'Lucy Valdez',
          email: 'lucy@o.com',
          contactNumber: '+8523616462',
          dateApplied: 'Thu, 10 Mar 2021',
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true
          },
        },
        {
          candidate: 'SRIMANSI JOSHE',
          email: 'JOSHE@gmail.com',
          contactNumber: '+6523616462',
          dateApplied: 'Wed, 30 Sep 2020',
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true
          },
        },
        {
          candidate: 'Peter Smith',
          email: 'petersmith@gmail.com',
          contactNumber: '+1 876-345-1505',
          dateApplied: 'Tue, 30 Apr 2019',
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true
          },
        },
        {
          candidate: 'Jo Denton',
          email: 'jodentan@gmail.com',
          contactNumber: '+1 888-452-2314',
          dateApplied: 'Tue, 30 Apr 2019',
          allowedActions: {
            stageSlot: true,
            downloadResumeSlot: true,
            downloadApplicationFormSlot: true,
            compareSlot: true
          },
        },
        {
          candidate: 'Garry White',
          email: 'garrywhite@gmail.com',
          contactNumber: '+1 788-482-1505',
          dateApplied: 'Fri, 26 Apr 2019',
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
      stages: [
        {
          id: 1,
          label: 'Application Received',
        },
        {
          id: 2,
          label: 'Phone Screening',
        },
        {
          id: 3,
          label: '1st In-Person Interview',
        },
        {
          id: 4,
          label: 'Shortlisted',
        },
        {
          id: 5,
          label: 'Panel Interview',
        },
        {
          id: 6,
          label: 'Reference Check',
        },
        {
          id: 7,
          label: '321 Form Onboarding',
        },
        {
          id: 8,
          label: 'Job Offer',
        },
        {
          id: 9,
          label: 'Hired',
        },
        {
          id: 10,
          label: 'Rejected',
        },
      ],
    };
  },

  components: {
    'oxd-card-table': CardTable,
    'oxd-table-filter': TableFilter,
    'oxd-button': Button,
    'oxd-icon-button': IconButton,
    'oxd-card-table': CardTable,
    'oxd-quick-search': QuickSearchInput,
    'oxd-dialog': Dialog,
  },

  methods: {
    actionCellRenderer(index, item, header, row) {
      const stage = {
        component: SelectInput,
        props: {
          options: this.stages,
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
          name: 'download'
        },
      }
      const downloadApplicationForm = {
        component: 'oxd-icon-button',
        props: {
          label: 'Download Application Form',
          displayType: 'label',
          size: 'medium',
          name: 'download'
        },
      }
      const compare = {
        component: 'oxd-icon-button',
        props: {
          label: 'Download Application Form',
          displayType: 'label',
          size: 'medium',
          name: 'person'
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
    toggleFilterModal (isVisible) {
      this.showFilterModal = isVisible
    }
  },
};
</script>

<style lang="scss" scoped>
.orangehrm-container {
  background-color: #fff;
}
</style>