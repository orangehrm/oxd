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
          label: 'Select resume',
          type: "file",
          props: {
          },
          span: 1,
          accept: "image/*" // TODO: to be implemented
        },
        {
          label: 'First Name',
          type: "input",
          props: {
          },
          rules: [
            {
              rule: "required",
            },
            {
              rule: "length",
              params: {
                charLength: 30
              }
            }
          ]
        },
        {
          label: 'Middle Name',
          type: "input",
          props: {
          },
          rules: [
            {
              rule: "length",
              params: {
                charLength: 30
              }
            }
          ],
        },
        {
          label: 'Last Name',
          type: "input",
          props: {
          },
          rules: [
            {
              rule: "required",
            },
            {
              rule: "length",
              params: {
                charLength: 30
              }
            }
          ],
        },
        {
          label: 'Email',
          type: "input",
          props: {
          },
          rules: [
            {
              rule: "required",
            },
            {
              rule: "email",
            }
          ],
        },
        {
          label: 'Contact Number',
          type: "input",
          props: {
          },
          rules: [
            {
              rule: "number",
            }
          ]
        },
        {
          label: 'LinkedIn',
          type: "input",
          props: {
          },
          rules: [
            {
              rule: "length",
              params: {
                charLength: 100
              }
            }
          ],
        },
        {
          label: 'Vacancy',
          type: "select",
          props: {
            "hide-dropdown-default-label": true,
            options: []
          }
        },
        {
          label: 'Date of Application',
          type: "date",
          props: {
            placeholder: 'dd/mm/yyyy',
          }
        },
        {
          label: 'Keywords',
          type: "input",
          props: {
            placeholder: 'Enter comma separate keywords...'
          },
          rules: [
            {
              rule: "length",
              params: {
                charLength: 254
              }
            }
          ],
        },
        {
          label: 'Noted',
          type: "textarea",
          props: {
            placeholder: 'Enter any other notes about the candidate'
          },
        },
      ]
    })
    return {
      formConfigs,
    }
  }
});
</script>
