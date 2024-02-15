import InfoBox from '@orangehrm/oxd/core/components/InfoBox/InfoBox';
import SchemaForm from '@orangehrm/oxd/core/components/SchemaForm/SchemaForm';
import useSchemaForm from '../../../../../components/src/composables/useSchemaForm.ts';
import {required} from '../../../../../components/src/validation/rules.ts';
import InfoBoxEvents from './InfoBoxEvents.story.vue';
import InfoBoxDetails from './InfoBoxDetails.story.vue';
import {h, ref} from 'vue';

export default {
  title: 'Inputs/InfoBox',
  component: InfoBox,
  argTypes: {
    modelValue: {
      control: {type: 'object'},
      table: {
        type: {
          summary:
            'Set value to the input. It can be a string or an object with id, label',
        },
      },
    },
    infoLabel: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set value to the label'},
      },
    },
    style: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set object as styles'},
      },
    },
    options: {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {
          summary:
            'Set an array of objects which has id, label mandatory and color as optional',
        },
      },
    },
    numOfTitleRows: {
      control: {type: 'number'},
      defaultValue: 1,
      table: {
        type: {summary: 'Set row counts defined row and max lines to truncate'},
      },
    },
    numOfValueRows: {
      control: {type: 'number'},
      defaultValue: 2,
      table: {
        type: {summary: 'Set row counts defined row and max lines to truncate'},
      },
    },
    disabled: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary: 'Set boolean value to disable. The default value is false',
        },
      },
    },
    dropdownPosition: {
      control: {type: 'select', options: ['TOP', 'BOTTOM']},
      defaultValue: 'BOTTOM',
      table: {
        type: {summary: 'Set value to the label'},
      },
    },
    dropdownStyles: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set object as styles'},
      },
    },
    'dropdown:opened': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'emit event when dropdown opened'},
      },
    },
    'dropdown:closed': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'emit event when dropdown closed'},
      },
    },
    'dropdown:blur': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'emit event when dropdown blur'},
      },
    },
    'dropdown:clear': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'emit event when dropdown clear'},
      },
    },
    'update:modelValue': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'emit event when select value updates'},
      },
    },
    option: {
      control: {type: 'object'},
      defaultValue: [],
      table: {
        type: {summary: 'Should be passed as an array object'},
      },
    },
    titleLineHeight: {
      control: {type: 'number'},
      defaultValue: 44,
      table: {
        type: {summary: 'Set a line height and default will be 22'},
      },
    },
    subtitleLineHeight: {
      control: {type: 'number'},
      defaultValue: 38,
      table: {
        type: {summary: 'Set a line height and default will be 19'},
      },
    },
    clickableText: {
      control: {type: 'text'},
      table: {
        type: {
          summary: 'Set clickable text to show the clickable text element.',
        },
      },
    },
  },
};

const options = [
  {
    id: 2,
    label: 'Application Received',
  },
  {
    id: 3,
    label: 'Shortlisted',
  },
  {
    id: 4,
    label: 'In Progress',
  },
  {
    id: 5,
    label: 'Job Offer',
  },
  {
    id: 6,
    label: 'Hired',
    color: '#68a61d',
  },
  {
    id: 7,
    label: 'Rejected',
    color: '#eb0910',
  },
  {
    id: 7,
    label:
      'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.',
  },
  {
    id: 8,
    label:
      'maximumcharacterstestingtestingtestingtestingtestingtestinghiuiyiuyiuyiuyiuyiuyiyyiuyiuyiuyiuyiyiuyy.',
  },
];

const Template = (args) => ({
  setup() {
    const selected = ref(null);
    return {args, selected};
  },
  render() {
    return h(InfoBox, {
      ...this.args,
      modelValue: this.selected,
      'onUpdate:modelValue': (value) => {
        if (value.id > -1) {
          this.selected = value;
        } else {
          this.selected = null;
        }
      },
    });
  },
});

const TemplateString = (args) => ({
  setup() {
    const selected = ref(null);
    return {args, selected};
  },
  render() {
    return h(InfoBox, {
      ...this.args,
      modelValue: '2022/02/03',
    });
  },
});

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
  components: {'oxd-schema-form': SchemaForm},
  template: `<oxd-schema-form :schema="schema" v-model:model="model" v-on:submitValid="onSubmit"></oxd-schema-form>`,
});

const sample = {
  name: 'sampleForm',
  layout: [
    {
      type: 'grid',
      props: {
        cols: 4,
      },
      children: {
        default: [
          {
            name: 'currentstagerequired',
            label: 'Infobox required',
            type: 'infobox',
            validators: new Map([['required', required]]),
            props: {
              infoLabel: 'Current Stage of Recruitment',
              options,
              numOfTitleRows: 1,
            },
          },
          {
            name: 'currentstagedisabled',
            label: 'Infobox disabled',
            type: 'infobox',
            props: {
              disabled: true,
              infoLabel: 'Current Stage of Recruitment',
              options,
              numOfTitleRows: 1,
            },
          },
          {
            name: 'currentstagereadonly',
            label: 'Infobox readonly',
            type: 'infobox',
            props: {
              readonly: true,
              infoLabel: 'Current Stage of Recruitment',
              options,
              numOfTitleRows: 1,
            },
          },
          {
            name: 'currentstagepreselectedwithlongcaption',
            label: 'Pre-Selected with Long Caption',
            type: 'infobox',
            props: {
              infoLabel: 'With a Pre-Selected Value and a Long Caption',
              options,
              numOfTitleRows: 1,
            },
            value: options[6],
          },
          {
            name: 'dateOfApplication',
            label: 'Value as a String',
            type: 'infobox',
            props: {
              infoLabel: 'Date of Application',
              numOfTitleRows: 1,
            },
            value: '2022-05-03',
          },
          {
            name: 'clickableText',
            label: 'Clckable Text',
            type: 'infobox',
            props: {
              infoLabel: 'Clickable',
              options,
              numOfTitleRows: 1,
              numOfValueRows: 2,
              clickableText: 'Add As an Employee',
            },
            value: options[4],
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

export const InfoboxInSchemaForm = TemplateSchema.bind({});
InfoboxInSchemaForm.args = {
  schema: {...sample},
};

export const Default = Template.bind({});
Default.args = {
  infoLabel: 'Current Stage of Recruitment',
  options: options,
  numOfTitleRows: 1,
  numOfValueRows: 2,
};

export const StringModalValue = TemplateString.bind({});
StringModalValue.args = {
  infoLabel: 'Date of Application',
  numOfTitleRows: 1,
  numOfValueRows: 2,
};

export const Disabled = Template.bind({});
Disabled.args = {
  infoLabel: 'Current Stage of Recruitment',
  options: options,
  numOfTitleRows: 1,
  numOfValueRows: 2,
  disabled: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
  infoLabel: 'Current Stage of Recruitment',
  options: options,
  numOfTitleRows: 1,
  numOfValueRows: 2,
  readonly: true,
};

export const NoOptions = Template.bind({});
NoOptions.args = {
  infoLabel: 'Current Stage of Recruitment',
  numOfTitleRows: 1,
  numOfValueRows: 2,
};

export const Error = Template.bind({});
Error.args = {
  infoLabel: 'Current Stage of Recruitment',
  options: options,
  numOfTitleRows: 1,
  numOfValueRows: 2,
  hasError: true,
};

const TemplateWithoutInitialValue = (args) => ({
  setup() {
    const selected = ref(null);
    return {args, selected};
  },
  render() {
    return h(InfoBox, {
      ...this.args,
    });
  },
});

export const WithoutInitialValue = TemplateWithoutInitialValue.bind({});
WithoutInitialValue.args = {
  infoLabel: 'Date of Application',
  numOfTitleRows: 1,
  numOfValueRows: 2,
};

export const Events = () => InfoBoxEvents;

const detailedOptions = [
  {
    id: 1,
    label: 'Entitlements',
    subHeader: '4 Days (2 available)',
    description: 'Valid from 2020-10-10 to 2021-10-10',
  },
  {
    id: 2,
    label: 'Entitlements',
    subHeader: '14 Days (12 available)',
    description: 'Valid from 2021-07-10 to 2021-10-10',
  },
  {
    id: 3,
    label: 'Entitlements',
    subHeader: '15 Days (21 available)',
    description: 'Valid from 2023-07-10 to 2023-10-10',
  },
];

export const Detailed = () => InfoBoxDetails;

Detailed.args = {
  options: detailedOptions,
};

Default.parameters = {
  docs: {
    source: {
      code: `
      <oxd-infobox
        :modelValue="
          {
            id: 3,
            label: 'Shortlisted',
          }
        "
        :options="[
          {
            id: 2,
            label: 'Application Received',
          },
          {
            id: 3,
            label: 'Shortlisted',
          },
          {
            id: 4,
            label: 'In Progress',
          },
        ]"
        :numOfTitleRows="2"
        :numOfValueRows="3"
        :infoLabel="'Current Stage of Recruitment'"
        :titleLineHeight="44"
        :subtitleLineHeight="38"
      />`,
    },
  },
};

Detailed.parameters = {
  docs: {
    source: {
      code: `
      <oxd-infobox
    :options="entitlementsOptions"
    @update:modelValue="updateInfoBoxModelValue"
    :modelValue="infoBoxModelValue"
  >
    <template #default>
      <div class="label-tile-content">
        <div class="oxd-info-drop-down-content">
          <span class="oxd-info-drop-down-main-label">
            {{ infoBoxModelValue.label }}
          </span>
          {{ infoBoxModelValue.subHeader }}
        </div>
        <div class="oxd-info-drop-down-description">
          {{ infoBoxModelValue.description }}
        </div>
      </div>
    </template>
    <template #option="slotProps">
      <div class="label-tile-content">
        <div
          class="oxd-info-drop-down-content oxd-info-drop-down-content-option-item"
        >
          <span class="oxd-info-drop-down-main-label">{{
            slotProps.data.label
          }}</span
          >{{ slotProps.data.subHeader }}
        </div>
        <div class="oxd-info-drop-down-description">
          {{ slotProps.data.description }}
        </div>
      </div>
    </template>
  </oxd-infobox>
      `,
    },
  },
};

StringModalValue.parameters = {
  docs: {
    source: {
      code: `
      <oxd-infobox
        :modelValue="'2022-05-03'"
        :numOfTitleRows="2"
        :numOfValueRows="3"
        :infoLabel="'Date of Application'"
      />`,
    },
  },
};

Disabled.parameters = {
  docs: {
    source: {
      code: `
      <oxd-infobox
        :disabled="true"
        :modelValue="
          {
            id: 3,
            label: 'Shortlisted',
          }
        "
        :options="[
          {
            id: 2,
            label: 'Application Received',
          },
          {
            id: 3,
            label: 'Shortlisted',
          },
          {
            id: 4,
            label: 'In Progress',
          },
        ]"
        :numOfTitleRows="2"
        :numOfValueRows="3"
        :infoLabel="'Current Stage of Recruitment'"
      />`,
    },
  },
};

Readonly.parameters = {
  docs: {
    source: {
      code: `
      <oxd-infobox
        :readonly="true"
        :modelValue="
          {
            id: 3,
            label: 'Shortlisted',
          }
        "
        :options="[
          {
            id: 2,
            label: 'Application Received',
          },
          {
            id: 3,
            label: 'Shortlisted',
          },
          {
            id: 4,
            label: 'In Progress',
          },
        ]"
        :numOfTitleRows="2"
        :numOfValueRows="3"
        :infoLabel="'Current Stage of Recruitment'"
      />`,
    },
  },
};

NoOptions.parameters = {
  docs: {
    source: {
      code: `
      <oxd-infobox
        :modelValue="
          {
            id: 3,
            label: 'Shortlisted',
          }
        "
        :numOfTitleRows="2"
        :numOfValueRows="3"
        :infoLabel="'Current Stage of Recruitment'"
      />`,
    },
  },
};

Error.parameters = {
  docs: {
    source: {
      code: `
      <oxd-infobox
        :hasError="true"
        :modelValue="
          {
            id: 3,
            label: 'Shortlisted',
          }
        "
        :options="[
          {
            id: 2,
            label: 'Application Received',
          },
          {
            id: 3,
            label: 'Shortlisted',
          },
          {
            id: 4,
            label: 'In Progress',
          },
        ]"
        :numOfTitleRows="2"
        :numOfValueRows="3"
        :infoLabel="'Current Stage of Recruitment'"
      />`,
    },
  },
};

WithoutInitialValue.parameters = {
  docs: {
    source: {
      code: `
      <oxd-infobox
        :hasError="true"
        :options="[
          {
            id: 2,
            label: 'Application Received',
          },
          {
            id: 3,
            label: 'Shortlisted',
          },
          {
            id: 4,
            label: 'In Progress',
          },
        ]"
        :numOfTitleRows="2"
        :numOfValueRows="3"
        :infoLabel="'Current Stage of Recruitment'"
      />`,
    },
  },
};

Events.parameters = {
  docs: {
    source: {
      code: `
      <oxd-infobox
      :infoLabel="'Current Stage of Recruitment'"
      :options="options"
      @input="onInput()"
      @focus="onFocus()"
      @click="onClick()"
      @keyup="onKeyUp()"
      @dropdown:opened="onDropDownOpen()"
      @dropdown:closed="onDropDownClosed()"
      @dropdown:blur="onDropDownBlur()"
      @dropdown:clear="onDropDownClear()"
      v-model="value"
      @update:modelValue="updatedValue(event)"
    />`,
    },
  },
};
