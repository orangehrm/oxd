<template>
  <div class="container">
    <oxd-table-sidebar
      class="oxd-table-sidebar"
      width="200px"
      :list="stages"
      :button="{
        label: 'Add Candidate',
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
            style: {
              height: '36px'
            }
          }"
          :options="vacancies"
          :open-dropdown-initially="true"
          @update:modelValue="selectVacancy"
          :modelValue="selectedVacancy"
        />
      </template>
    </oxd-table-sidebar>
  </div>
</template>

<script lang="ts">
import TableSidebar from '@orangehrm/oxd/core/components/TableSidebar/TableSidebar';
import SelectInputButton from '@orangehrm/oxd/core/components/Input/Select/SelectInputButton.vue';

export default {
  data() {
    return {
      selectedVacancy: null,
      vacancies: [
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
    'oxd-table-sidebar': TableSidebar,
    'oxd-select-input-btn': SelectInputButton
  },

  computed: {
    selectedStage() {
      return this.stages.find(stage => stage.selected)
    }
  },

  methods: {
    selectVacancy(modelValue) {
      this.selectedVacancy = modelValue
    },
    selectStage(stage) {
      console.log(stage);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
