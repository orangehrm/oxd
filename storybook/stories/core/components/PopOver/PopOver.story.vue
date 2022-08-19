<template>
  <oxd-pop-over
  >
    <template #button>
      <oxd-icon-button class="popover-icon" name="funnel" />
    </template>
    <template #default>
      <oxd-schema-form :schema="schema" v-model:model="model" v-on:submitValid="onSubmit" />
    </template>

  </oxd-pop-over>
</template>

<script lang="ts">
import PopOver from 'oxd-components/src/core/components/PopOver/PopOver.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon';
import {defineComponent, ref} from 'vue';
import {required} from "oxd-components/src/validation/rules";
import SchemaForm from '@orangehrm/oxd/core/components/SchemaForm/SchemaForm';
import useSchemaForm from "oxd-components/src/composables/useSchemaForm";



export default defineComponent({
  components: {
    'oxd-pop-over': PopOver,
    'oxd-icon-button': IconButton,
    'oxd-schema-form': SchemaForm,
  },

  setup: function () {
    const sample = {
      name: 'sampleForm',
      layout: [
        {
          type: 'grid',
          props: {
            cols: 2,
          },
          children: {
            default: [
              {
                name: 'firstName',
                label: 'First Name',
                type: 'input',
                validators: new Map([['required', required]]),
              },
              {
                name: 'lastName',
                label: 'Last Name',
                type: 'input',
                validators: new Map([['required', required]]),
              },
            ],
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'action',
          style: {
            'margin-top': '0.5rem',
          },
          children: {
            default: [
              {
                name: 'submit',
                label: 'Submit',
                type: 'button',
                props: {
                  type: 'submit',
                  displayType: 'secondary',
                },
              },
            ],
          },
        },
      ],
    };

    const {schema, model} = useSchemaForm(sample);
    const onSubmit = () => {
      console.log("submitted");
    };

    return {
      model,
      schema,
      onSubmit,
    };
  },
});
</script>
