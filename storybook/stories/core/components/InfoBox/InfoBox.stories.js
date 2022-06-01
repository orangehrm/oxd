import InfoBox from '@orangehrm/oxd/core/components/InfoBox/InfoBox';
import {h, ref} from 'vue';

export default {
  title: 'Example/InfoBox',
  component: InfoBox,
  argTypes: {
    modelValue: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set value to the input. It can be a string or an object with id, label'},
      },
    },
    label: {
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
        type: {summary: 'Set an array of objects which has id, label mandatory and color as optional'},
      },
    },
    rows: {
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
        type: {summary: 'Set boolean value to disable. The default value is false'},
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
    label: 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.'
  }
];

const Template = args => ({
  setup() {
    const selected = ref(null);
    return {args, selected};
  },
  render() {
    return h(
      InfoBox, {
      ...this.args,
      modelValue: this.selected,
      'onUpdate:modelValue': value => {
        if (value.id > -1) {
          this.selected = value;
        } else {
          this.selected = null;
        }
      },
    });
  },
});

export const Default = Template.bind({});
Default.args = {
  label: 'Current Stage of Recruitment',
  options: options,
  rows: 2,
};

const TemplateString = args => ({
  setup() {
    const selected = ref(null);
    return {args, selected};
  },
  render() {
    return h(
      InfoBox, {
      ...this.args,
      modelValue: '2022/02/03',
    });
  },
});

export const StringModalValue = TemplateString.bind({});
StringModalValue.args = {
  label: 'Date of Application',
  rows: 2,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Current Stage of Recruitment',
  options: options,
  rows: 2,
  disabled: true,
};

const TemplateWithoutInitialValue = args => ({
  setup() {
    const selected = ref(null);
    return {args, selected};
  },
  render() {
    return h(
      InfoBox, {
      ...this.args,
    });
  },
});

export const WithoutInitialValue = TemplateWithoutInitialValue.bind({});
WithoutInitialValue.args = {
  label: 'Date of Application',
  rows: 2,
};

Default.parameters = {
  docs: {
    source: {
      code: `
      <info-box
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
        :rows="3"
        :label="'Current Stage of Recruitment'"
      />`,
    },
  },
};

StringModalValue.parameters = {
  docs: {
    source: {
      code: `
      <info-box
        :modelValue="'2022-05-03'"
        :rows="3"
        :label="'Date of Application'"
      />`,
    },
  },
};

Disabled.parameters = {
  docs: {
    source: {
      code: `
      <info-box
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
        :rows="3"
        :label="'Current Stage of Recruitment'"
      />`,
    },
  },
};

Disabled.parameters = {
  docs: {
    source: {
      code: `
      <info-box
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
        :rows="3"
        :label="'Current Stage of Recruitment'"
      />`,
    },
  },
};