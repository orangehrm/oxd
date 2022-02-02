<template>
  <oxd-form @submitValid="emit('submitValid')" ref="formRef">
    <oxd-grid :cols="formObj.columnsPerRow">
      <oxd-grid-item v-for="(element, index) in formObj.elements" :key="index" :style="columnOverride(element.span)">
        <oxd-form-row>
          <oxd-input-group :label="requiredLabel(element)">
            <oxd-input-field
              :type="element.type"
              v-bind="setAllProps(element)" 
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
import {defineComponent, ref, watch, computed} from 'vue';
import Form from '@orangehrm/oxd/core/components/Form/Form.vue';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow.vue';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup.vue';
import Grid from '@orangehrm/oxd/core/components/Grid/Grid.vue';
import GridItem from '@orangehrm/oxd/core/components/Grid/GridItem.vue';
import InputField from '@orangehrm/oxd/core/components/InputField/InputField.vue';
import AutocompleteInput from "@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteInput.vue";
import SelectInput from "@orangehrm/oxd/core/components/Input/Select/SelectInput.vue";
import DateInput from "@orangehrm/oxd/core/components/Input/DateInput.vue";
import SwitchInput from "@orangehrm/oxd/core/components/Input/SwitchInput.vue";
import Textarea from "@orangehrm/oxd/core/components/Textarea/Textarea.vue";
import FileInput from "@orangehrm/oxd/core/components/Input/FileInput.vue";
import Label from "@orangehrm/oxd/core/components/Label/Label.vue";

export default defineComponent({
  name: 'oxd-form-dynamic',
  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-input-group': InputGroup,
    'oxd-grid': Grid,
    'oxd-grid-item': GridItem,
    'oxd-input-field': InputField,
    'oxd-textarea': Textarea,
    "oxd-autocomplete-input": AutocompleteInput,
    "oxd-select-input": SelectInput,
    "oxd-date-input": DateInput,
    "oxd-switch-input": SwitchInput,
    "oxd-file-input": FileInput,
    "oxd-label": Label,
  },
  props: {
    form: {
      type: Object
    },
    additionalMappings: {
      type: Array
    }
  },
  setup(props, {emit}) {
    const form = ref(JSON.parse(JSON.stringify(props.form)));
    const formObj = computed(() => {
      return form.value;
    });
    const rulesList = [
      {
        "required": v => (!!v && typeof v === 'string' ? v.trim() !== '' : true) || 'Required'
      }
    ]
    const rulesBinder = (rules) => {
      return rules && rules.length > 0 ? rulesList.filter(rule => {
        const ruleNames = Object.keys(rule);
        const ruleName = ruleNames.length > 0 ? ruleNames[0] : '';
        const ruleExists = rules.indexOf(ruleName) > -1;
        return ruleExists;
      }).map(rule => {
        const values = Object.values(rule)
        const ruleFunction = values.length > 0 ? values[0] : undefined
        return ruleFunction
      }) : undefined
    }
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
    const columnOverride = (span: number) => {
      let gridCol
      if (span) {
        gridCol = {
          'grid-column': `${span} / span ${props.form.columnsPerRow}`
        }
      }
      return gridCol;
    }
    const requiredLabel = (element) => {
      return element.label ? `${element.label} ${element.rules?.indexOf('required') > -1 ? '*' : ''}` : null
    }
    watch(formObj.value, (val) => {
      const initialObj = {}
      val.elements.forEach(element => {
        if (element.type === "oxd-file-input") {
          if (element.value?.length > 0) {
            if (element.props.multiselect) {
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
        if (element.getValueType === "object" && element.returnObjectKeyMapping) {
          initialObj[element.key] = Array.isArray(element.value) ? element.value[0] : element.value
          const newObj = {}
          for (const key in initialObj[element.key]) {
            const newKey = element.returnObjectKeyMapping[key]
            newObj[newKey] = initialObj[element.key][key]
          }
          initialObj[element.key] = Object.keys(newObj).length > 0 ? newObj : undefined
        }
      })
      emit('get-form-obj', initialObj)
    })
    const setAdditionalProps = (element) => {
      const obj = props.additionalMappings ? props.additionalMappings.find(additionalProp => additionalProp['bindTo'] === element.key) : undefined
      if (obj) {
        const propsWithKeysToBind = obj['propsWithKeysToBind']
        const additionalPropsMapped = propsWithKeysToBind.map(prop => {
          const propertyKey = prop.key
          const propertyValue = prop.property
          return {
            [propertyKey]: propertyValue
          }
        })
        const additionalPropsObj = Object.assign({}, ...additionalPropsMapped)
        return additionalPropsObj
      }
      return undefined
    }
    const setModelValue = (element) => {
      const additionalProps = setAdditionalProps(element)
      let value = element.value
      if (additionalProps && additionalProps['model-value']) {
        value = setAdditionalProps(element)['model-value']
      }
      return {
        value
      }
    }
    const setAllProps = (element) => {
      const getAdditionalProps = setAdditionalProps(element)
      const getModalValue = setModelValue(element).value
      element.value = getModalValue
      const allProps = {
        ...element.props,
        ...getAdditionalProps,
        ...{
          rules: rulesBinder(element.rules)
        }
      }
      return allProps
    }

    return {
      formObj,
      rulesBinder,
      eventBinder,
      requiredLabel,
      columnOverride,
      setAllProps,
      setModelValue,
      setAdditionalProps,
    }
  },
  computed: {
    isValid() {
      return this.$refs.formRef.isValid
    }
  },
  methods: {
    validate() {
      this.$refs.formRef.validate()
    }
  }
});
</script>

<style src="./form-dynamic.scss" lang="scss" scoped></style>
