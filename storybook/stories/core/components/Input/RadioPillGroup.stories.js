import { actions } from '@storybook/addon-actions'
import RadioPillGroup from '@orangehrm/oxd/core/components/Input/RadioPills/RadioPillGroup'
import { h, ref } from 'vue'
import SchemaForm from '@orangehrm/oxd/core/components/SchemaForm/SchemaForm';
import useSchemaForm from 'oxd-components/src/composables/useSchemaForm'
import { required } from 'oxd-components/src/validation/rules'

const templateDecorator = () => ({
  template: `
<div><story/></div>
	`,
})

export default {
  title: 'Inputs/RadioPillGroup',
  component: RadioPillGroup,
  argTypes: {
    name: {
      control: { type: 'text' },
      table: {
        type: { summary: 'Name for the radio pill group' },
      },
    },
    options: {
      control: { type: 'array' },
      defaultValue: [],
      table: {
        type: {
          summary:
            'Set choices for the radio pill group. Currently only id, label, style and disabled properties are supported',
        },
      },
    },
    modelValue: {
      control: { type: 'text' },
      defaultValue: [],
      table: {
        type: { summary: 'Set value to the radio pill group' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      table: {
        type: {
          summary:
            'Disable the radio pill group (Individual pills can be disabled via the disabled property in options property)',
        },
      },
    },
    readonly: {
      control: { type: 'boolean' },
      defaultValue: false,
      table: {
        type: {
          summary:
            'Make the radio pill group readonly',
        },
      },
    },
    style: {
      control: { type: 'object' },
      table: {
        type: { summary: 'Set custom style to the radio pill group (Individual pills can be styled via the style property in options property)' },
      },
    },
    id: {
      control: { type: 'text' },
      table: {
        type: {
          summary: 'Set individual radio pill id prefix',
        },
      },
      defaultValue: 'radio-pill-group',
    },
    'update:modelValue': {
      control: { type: 'function' },
      table: {
        type: { summary: 'Emitted event when selected value updates' },
      },
    },
    change: {
      control: { type: 'function' },
      table: {
        type: { summary: 'Native Inherited Event: Emit change event from input' },
      },
    },
    click: {
      action: 'click',
      control: { type: 'function' },
      table: {
        type: { summary: 'Native Inherited Event: Emit click event from input' },
      },
    },
    focus: {
      action: 'focus',
      control: { type: 'function' },
      table: {
        type: { summary: 'Native Inherited Event: Emit focus event from input' },
      },
    },
    blur: {
      control: { type: 'function' },
      table: {
        type: {
          summary: 'Native Inherited Event: Emit blur event from input',
        },
      },
    },
  },
  decorators: [templateDecorator],
}

const options = [
  {
    id: 1,
    label: 'All Days',
  },
  {
    id: 2,
    label: 'Start Day Only',
  },
  {
    id: 3,
    label: 'End Day Only',
  },
  {
    id: 4,
    label: 'Start and End Day',
  },
]

const yesNoOptions = [
  {
    id: 1,
    label: 'Yes',
  },
  {
    id: 2,
    label: 'No',
  },
]

const optionsWithCustomStyle = [
  {
    id: 1,
    label: 'All Days',
  },
  {
    id: 2,
    label: 'Start Day Only',
    style: { 'background-color': 'lightblue' }
  },
  {
    id: 3,
    label: 'End Day Only',
    style: { 'background-color': 'lightgreen' }
  },
  {
    id: 4,
    label: 'Start and End Day',
    style: { 'background-color': 'lightyellow' }
  },
]

const Template = (args) => ({
  setup () {
    const selected = ref(1)
    return { args, selected }
  },
  render () {
    return h('div', {}, [
      h(RadioPillGroup, {
        ...this.args,
        modelValue: this.selected,
        'onUpdate:modelValue': (value) => {
          this.selected = value
        },
      }),
      h('br'),
      h('p', {}, `v-model : ${this.selected}`),
    ])
  },
})

export const Default = Template.bind({})
Default.args = {
  options: options,
  name: 'partialDays',
}

Default.parameters = {
  docs: {
    source: {
      code: `<oxd-radio-pill-group
    name="partialDays"
    :options=${JSON.stringify(options)} 
/>`,
    },
  },
}

export const Disabled = Template.bind({})
Disabled.args = {
  options: options,
  disabled: true,
  name: 'partialDays',
}
Disabled.parameters = {
  docs: {
    source: {
      code: `<oxd-radio-pill-group
    name='partialDays'
    :options=${JSON.stringify(options)} 
    :disabled='true'
/>`,
    },
  },
}

export const ReadOnly = Template.bind({})
ReadOnly.args = {
  options: options,
  readonly: true,
  name: 'readonlyGroup',
}
ReadOnly.parameters = {
  docs: {
    source: {
      code: `<oxd-radio-pill-group
    name='readonlyGroup'
    :options=${JSON.stringify(options)} 
    :readonly='true'
/>`,
    },
  },
}

const customStyle = { 'padding': '1rem', 'border': '1px solid', 'border-radius': '0.65rem' }
export const CustomStyles = Template.bind({})
CustomStyles.args = {
  options: optionsWithCustomStyle,
  style: customStyle,
  name: 'customStyle',
}

CustomStyles.parameters = {
  docs: {
    source: {
      code: `<oxd-radio-pill-group
    name='customStyle'
    :options=${JSON.stringify(optionsWithCustomStyle)}
    :style=${JSON.stringify(customStyle)}
/>`,
    },
  },
}

const EventsTemplate = (args) => ({
  setup () {
    const groupValue = ref(1)
    return {
      args,
      groupValue
    }
  },
  template: `
    <oxd-radio-pill-group
        name="events"
        v-bind="args"
        v-model="groupValue"
        @update:modelValue="updateModelValue"
        @click="click"
        @focus="focus"
        @change="change"
        @blur="blur"/>`,

  components: { 'oxd-radio-pill-group': RadioPillGroup },
  methods: actions({
    focus: 'focus',
    blur: 'blur',
    change: 'change',
    'updateModelValue': 'update:modelValue',
    click: 'click'
  }),
})

export const Events = EventsTemplate.bind({})
Events.args = {
  options: options,
  name: 'events',
}

Events.parameters = {
  docs: {
    source: {
      code: `<oxd-radio-pill-group
  name='events'
  :options=${JSON.stringify(options)}
  @update:modelValue="onUpdateModelValue"
  @click="onClick"
  @focus="onFocus"
  @change="onChange"
  @blur="onBlur"
/>`,
    },
  },
}

const sampleSchema = {
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
            name: 'partial_days',
            label: 'Partial Days',
            type: 'radiopillgroup',
            value: 1,
            props: {
              options: options,
            },
          },
          {
            name: 'adjust_carryforward',
            label: 'Adjust Leave Carryforward?',
            type: 'radiopillgroup',
            validators: new Map([['required', required]]),
            props: {
              options: yesNoOptions,
            },
          },
        ],
      },
    },
    {
      type: 'grid',
      props: {
        cols: 2,
      },
      children: {
        default: [
          {
            name: 'partial_days_disabled',
            label: 'Disabled',
            type: 'radiopillgroup',
            value: 1,
            props: {
              options: options,
              disabled: true,
            },
          }
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



const TemplateSchema = (args) => ({
  components: {'oxd-schema-form': SchemaForm},
  setup() {
    const {schema, model} = useSchemaForm(args.schema);

    const onSubmit = (...args) => {
      console.log(args);
    };
    return {
      model,
      schema,
      onSubmit,
    };
  },
  template: `<oxd-schema-form :schema="schema" v-model:model="model" v-on:submitValid="onSubmit"></oxd-schema-form>`,
});

export const InSchemaForm = TemplateSchema.bind({});
InSchemaForm.args = {
  schema: {...sampleSchema},
};
