<template>
  <oxd-form-dynamic :form="formConfigs"></oxd-form-dynamic>
</template>

<script>
import {defineComponent, ref} from 'vue';
import FormDynamic from '@orangehrm/oxd/core/components/FormDynamic/FormDynamic';

export default defineComponent({
  name: 'DefaultFormDynamic',
  components: {
    'oxd-form-dynamic': FormDynamic,
  },
  setup() {
    const formConfigs = ref({
      columnsPerRow: 2,
      elements: [
        {
          label: 'Search Text',
          type: "oxd-input",
          props: {
            placeholder: "Search"
          },
          events: [
            {
              type: "input",
              identifier: "set-search-keyword"
            }
          ]
        },
        {
          label: 'Candidates',
          type: "oxd-autocomplete-input",
          props: {
            placeholder: 'Type for hints...',
            multiple: true,
            clear: true,
          }
        },
        {
          label: 'Job Title',
          type: "oxd-select-input",
          props: {
            "hide-dropdown-default-label": true,
            options: []
          }
        },
        {
          label: 'Job Vacancy',
          type: "oxd-select-input",
          props: {
            "hide-dropdown-default-label": true,
            options: []
          }
        },
        {
          label: 'From',
          type: "oxd-date-input",
          props: {
            placeholder: 'dd/mm/yyyy',
          }
        },
        {
          label: 'To',
          type: "oxd-date-input",
          props: {
            placeholder: 'dd/mm/yyyy',
          }
        },
        {
          type: "oxd-switch-input",
          props: {
            "option-label": "Show Archived Candidates"
          }
        },
        {
          type: "oxd-switch-input",
          props: {
            "option-label": "Search Inside Resume"
          }
        },
        {
          type: "oxd-switch-input",
          props: {
            "option-label": "Show Active Candidates"
          }
        },
        {
          type: "oxd-switch-input",
          props: {
            "option-label": "Show Archived Candidates"
          }
        },
      ]
    })
    return {
      formConfigs,
    }
  }
});
</script>
