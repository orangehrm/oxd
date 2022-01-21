<template>
  <oxd-form>
    <oxd-grid :cols="form.columnsPerRow">
      <oxd-grid-item v-for="(element, index) in form.elements" :key="index" :style="columnOverride(element.column)">
        <oxd-form-row>
          <oxd-input-group :label="element.label">
            <component
              :is="element.type"
              v-bind="element.props" 
              v-on="eventBinder(element.events)"
            />
          </oxd-input-group>
        </oxd-form-row>
      </oxd-grid-item>
    </oxd-grid>
  </oxd-form>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
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
    const columnOverride = (column) => {
      let gridCol
      if (column) {
        gridCol = {
          'grid-column': `${column} / span ${props.form.columnsPerRow}`
        }
      }
      return gridCol;
    }
    return {
      eventBinder,
      columnOverride,
    }
  }
});
</script>

<style src="./form-dynamic.scss" lang="scss" scoped></style>
