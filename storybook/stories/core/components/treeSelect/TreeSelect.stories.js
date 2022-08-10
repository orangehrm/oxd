// import MultiSelectInput from '@orangehrm/oxd/core/components/Input/MultiSelect/MultiSelectInput';
// import {h, ref} from 'vue';

// export default {
//   title: 'Inputs/TreeSelect',
//   component: MultiSelectInput,
//   argTypes: {
//     style: {
//       control: {type: 'object'},
//       table: {
//         type: {summary: 'Set custom style to the select'},
//       },
//     },
//     hasError: {
//       control: {type: 'boolean'},
//       table: {
//         type: {summary: 'Set error state to the select'},
//       },
//     },
//     dropdownPosition: {
//       options: ['top', 'bottom'],
//       control: {type: 'select'},
//       defaultValue: 'bottom',
//       table: {
//         type: {summary: 'Set drop down position for select'},
//       },
//     },
//     options: {
//       control: {type: 'array'},
//       defaultValue: [],
//       table: {
//         type: {summary: 'Set options for select'},
//       },
//     },
//     'dropdown:opened': {
//       control: {type: 'array'},
//       defaultValue: [],
//       table: {
//         type: {summary: 'emit event when dropdown opened'},
//       },
//     },
//     'dropdown:closed': {
//       control: {type: 'array'},
//       defaultValue: [],
//       table: {
//         type: {summary: 'emit event when dropdown closed'},
//       },
//     },
//     'dropdown:blur': {
//       control: {type: 'array'},
//       defaultValue: [],
//       table: {
//         type: {summary: 'emit event when dropdown blur'},
//       },
//     },
//     'dropdown:clear': {
//       control: {type: 'array'},
//       defaultValue: [],
//       table: {
//         type: {summary: 'emit event when dropdown clear'},
//       },
//     },
//     'update:modelValue': {
//       control: {type: 'array'},
//       defaultValue: [],
//       table: {
//         type: {summary: 'emit event when select value updates'},
//       },
//     },
//     option: {
//       control: {type: 'object'},
//       defaultValue: [],
//       table: {
//         type: {summary: 'Interal Slot to manage option'},
//       },
//     },
//     afterSelected: {
//       control: {type: 'object'},
//       defaultValue: [],
//       table: {
//         type: {summary: 'Attend a specific text to the end of the select'},
//       },
//     },
//   },
// };

// const options = [
//   {
//     id: 1,
//     label: 'HR Admin',
//   },
//   {
//     id: 2,
//     label: 'ESS User',
//   },
//   {
//     id: 3,
//     label: 'Supervisor',
//   },
//   {
//     id: 4,
//     label: 'Manager',
//   },
//   {
//     id: 5,
//     label: 'Employee',
//   },
//   {
//     id: 6,
//     label: 'Assistant Manager',
//   },
//   {
//     id: 7,
//     label: 'Director',
//   },
//   {
//     id: 8,
//     label: 'Officer',
//   },
//   {
//     id: 9,
//     label: 'Appraiser',
//   },
//   {
//     id: 10,
//     label: 'Senior Executive',
//   },
// ];

// const Template = (args) => ({
//   setup() {
//     const selected = ref(args.modelValue ?? []);
//     return {args, selected};
//   },
//   render() {
//     return h(MultiSelectInput, {
//       ...this.args,
//       modelValue: this.selected,
//       'onUpdate:modelValue': (value) => {
//         this.selected = value;
//       },
//     });
//   },
// });

// export const Default = Template.bind({});
// Default.args = {
//   options: options,
// };

import TreeSelect from './TreeSelect.story.vue';

export default {
  title: 'Inputs/TreeSelect',
  components: {
    TreeSelect,
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {TreeSelect},
  template: `<TreeSelect />`,
});

export const Default = Template.bind({});
