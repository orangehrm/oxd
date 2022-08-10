import InputField from '@orangehrm/oxd/core/components/InputField/InputField';
import {TYPES} from '@orangehrm/oxd/core/components/InputField/types';
import InputFieldValidation from './InputFieldValidation.story.vue';
import Form from '@orangehrm/oxd/core/components/Form/Form';
import {h, ref} from 'vue';

export default {
  title: 'Inputs/InputFields',
  component: InputField,

  argTypes: {
    hint: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set the hint'},
      },
    },
    hintPlacement: {
      control: {type: 'select', options: ['top', 'bottom']},
      defaultValue: 'top',
      table: {
        type: {summary: 'Set the hint placement'},
      },
    },
  },
};

const argTypes = {
  type: {
    control: {type: 'select', options: TYPES},
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-input-field': InputField, 'oxd-form': Form},
  template: '<oxd-form><oxd-input-field v-bind="args" /></oxd-form>',
});

const DropdownTemplate = (args) => ({
  setup() {
    const selected = ref([]);
    return {args, selected};
  },
  render() {
    return h(
      Form,
      {},
      {
        default: () => {
          return h(InputField, {
            ...this.args,
            modelValue: this.selected,
            'onUpdate:modelValue': (value) => {
              this.selected = [...value];
            },
          });
        },
      },
    );
  },
});

export const Default = Template.bind({});
Default.argTypes = argTypes;
Default.args = {
  label: 'Input Field',
  type: 'input',
};

export const File = Template.bind({});
File.argTypes = argTypes;
File.args = {
  label: 'File Input Field',
  type: 'file',
  buttonLabel: 'Browse',
};

export const FileDownloadBox = Template.bind({});
FileDownloadBox.argTypes = argTypes;
FileDownloadBox.args = {
  label: 'File Input Field',
  type: 'file',
  buttonLabel: 'Browse',
  modelValue: 
    [
      {
          "name": "ShachiniMekala-09_08_2022.pdf",
          "type": "application/pdf",
          "size": 101273,
          "base64": "JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G"
      }
    ] 
};

export const Textarea = Template.bind({});
Textarea.argTypes = argTypes;
Textarea.args = {
  label: 'Textarea Input Field',
  type: 'textarea',
};

export const Dropdown = DropdownTemplate.bind({});
Dropdown.argTypes = argTypes;
Dropdown.args = {
  label: 'Dropdown Input Field',
  type: 'dropdown',
  createOptions: async function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            label: 'All',
          },
          {
            id: 2,
            label: 'HR Admin',
          },
          {
            id: 3,
            label: 'ESS',
          },
        ]);
      }, 5000);
    });
  },
};

export const PasswordInput = Template.bind({});
PasswordInput.argTypes = argTypes;
PasswordInput.args = {
  label: 'Password Input Field',
  type: 'password',
};

export const CheckboxInput = Template.bind({});
CheckboxInput.argTypes = argTypes;
CheckboxInput.args = {
  label: 'Checkbox Input Field',
  optionLabel: 'check this!',
  type: 'checkbox',
};

export const SwitchInput = Template.bind({});
SwitchInput.argTypes = argTypes;
SwitchInput.args = {
  label: 'Switch Input Field',
  optionLabel: 'switch this!',
  type: 'switch',
};

export const RadioInput = Template.bind({});
RadioInput.argTypes = argTypes;
RadioInput.args = {
  label: 'Radio Input Field',
  optionLabel: 'check this!',
  type: 'radio',
};

export const WithIcon = Template.bind({});
WithIcon.argTypes = argTypes;
WithIcon.args = {
  label: 'Textarea Input Field',
  labelIcon: 'card-text',
  type: 'textarea',
};

export const DateInput = Template.bind({});
DateInput.argTypes = argTypes;
DateInput.args = {
  label: 'Date Input Field',
  type: 'date',
};

export const AutocompleteInput = Template.bind({});
AutocompleteInput.argTypes = argTypes;
AutocompleteInput.args = {
  label: 'Autocomplete Input Field',
  type: 'autocomplete',
  modelValue: null,
  createOptions: async function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            label: 'All',
          },
          {
            id: 2,
            label: 'HR Admin',
          },
          {
            id: 3,
            label: 'ESS',
          },
        ]);
      }, 1000);
    });
  },
};

export const SelectInput = Template.bind({});
SelectInput.argTypes = argTypes;
SelectInput.args = {
  label: 'Dropdown Input Field',
  type: 'select',
  modelValue: null,
  options: [
    {
      id: 1,
      label: 'All',
    },
    {
      id: 2,
      label: 'HR Admin',
    },
    {
      id: 3,
      label: 'ESS',
    },
  ],
};

export const MultiselectInput = Template.bind({});
MultiselectInput.argTypes = argTypes;
MultiselectInput.args = {
  label: 'Multiselect Input Field',
  type: 'multiselect',
  modelValue: [],
  options: [
    {
      id: 1,
      label: 'All',
    },
    {
      id: 2,
      label: 'HR Admin',
    },
    {
      id: 3,
      label: 'ESS',
    },
  ],
};

export const TimeInput = Template.bind({});
TimeInput.argTypes = argTypes;
TimeInput.args = {
  label: 'Time Input Field',
  type: 'time',
};

export const WithHint = Template.bind({});
WithHint.argTypes = argTypes;
WithHint.args = {
  label: 'Name as in Passport',
  type: 'input',
  hint: 'Only needed if different from the name in your driving license',
  hintPlacement: 'bottom',
};

export const WithValidation = () => InputFieldValidation;
