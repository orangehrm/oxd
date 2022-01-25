<template>
  <oxd-form>
    <oxd-grid :cols="formObj.columnsPerRow">
      <oxd-grid-item v-for="(element, index) in formObj.elements" :key="index" :style="columnOverride(element.column)">
        <oxd-form-row>
          <oxd-input-group :label="element.label">
            <component
              :is="element.type"
              v-bind="element.props" 
              v-on="eventBinder(element.events)"
              v-model="element.value"
            />
          </oxd-input-group>
        </oxd-form-row>
      </oxd-grid-item>
    </oxd-grid>
  </oxd-form>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
import Form from '@orangehrm/oxd/core/components/Form/Form.vue';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow.vue';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup.vue';
import Grid from '@orangehrm/oxd/core/components/Grid/Grid.vue';
import GridItem from '@orangehrm/oxd/core/components/Grid/GridItem.vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import AutocompleteInput from "@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteInput.vue";
import SelectInput from "@orangehrm/oxd/core/components/Input/Select/SelectInput.vue";
import DateInput from "@orangehrm/oxd/core/components/Input/DateInput.vue";
import SwitchInput from "@orangehrm/oxd/core/components/Input/SwitchInput.vue";
import Textarea from "@orangehrm/oxd/core/components/Textarea/Textarea.vue";
import FileInput from "@orangehrm/oxd/core/components/Input/FileInput.vue";

export default defineComponent({
  name: 'oxd-form-dynamic',
  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-input-group': InputGroup,
    'oxd-grid': Grid,
    'oxd-grid-item': GridItem,
    'oxd-input': Input,
    'oxd-textarea': Textarea,
    "oxd-autocomplete-input": AutocompleteInput,
    "oxd-select-input": SelectInput,
    "oxd-date-input": DateInput,
    "oxd-switch-input": SwitchInput,
    'oxd-file-input': FileInput,
  },
  props: {
    form: {
      type: Object
    }
  },
  setup(props, {emit}) {
    const formObj = ref(JSON.parse(JSON.stringify(props.form)));
    const eventBinder = events => {
      let mappedEvents, mappedEventsObj;
      if (events) {
        mappedEvents = events.map(event => {
          return {
            [event.type]: vals => {
              emit(event.identifier, vals);
            },
          };
        });
        mappedEventsObj = Object.assign({}, ...mappedEvents);
      }
      return mappedEventsObj;
    };
    const columnOverride = (column: number) => {
      let gridCol
      if (column) {
        gridCol = {
          'grid-column': `${column} / span ${props.form.columnsPerRow}`
        }
      }
      return gridCol;
    }
    watch(formObj.value, (val) => {
      const initialObj = {}
      val.elements.forEach(element => {
        if (element.type === "oxd-file-input") {
          if (element.value?.length > 0) {
            if (element.multiselect) {
              initialObj[element.key] = element.value
            } else {
              initialObj[element.key] = element.value[0]
            }
          }
        } else {
          initialObj[element.key] = element.value
        }
        // map key values to return
        if (element.getValueFrom) {
          if (element.getValueType === "number" && element.getValueFrom) {
            initialObj[element.key] = element.value ? parseInt(element.value[element.getValueFrom]) : undefined
          } else {
            initialObj[element.key] = element.value ? element.value[element.getValueFrom] : undefined
          }
        }
        // map object to return
        if (element.getValueType === "object" && element.getValueObject) {
          initialObj[element.key]
          const newObj = {}
          for (const key in initialObj[element.key]) {
            const newKey = element.getValueObject[key]
            newObj[newKey] = initialObj[element.key][key]
          }
          initialObj[element.key] = Object.keys(newObj).length > 0 ? newObj : undefined
        }
      })
      emit('get-form-obj', initialObj)
    })
    return {
      formObj,
      eventBinder,
      columnOverride,
    }
  }
});
</script>

<style src="./form-dynamic.scss" lang="scss" scoped></style>
