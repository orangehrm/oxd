import TreeSelect from './TreeSelect.story.vue';
import TreeSelectNarrow from './TreeSelectNarrow.story.vue';
import TreeSelectTopOfInput from './TreeSelectTopOfInput.story.vue';
import TreeSelectShowAll from './TreeSelectShowAll.story.vue';

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

const NarrowTemplate = (args) => ({
  setup() {
    return {args};
  },
  components: {TreeSelectNarrow},
  template: `<TreeSelectNarrow/>`,
});

export const Narrow = NarrowTemplate.bind({});

const TopOfInputTemplate = (args) => ({
  setup() {
    return {args};
  },
  components: {TreeSelectTopOfInput},
  template: `<TreeSelectTopOfInput/>`,
});

export const TopOfInput = TopOfInputTemplate.bind({});

const ShowAllTemplate = (args) => ({
  setup() {
    return {args};
  },
  components: {TreeSelectShowAll},
  template: `<TreeSelectShowAll/>`,
});

export const ShowAllWhenAllSelected = ShowAllTemplate.bind({});

ShowAllWhenAllSelected.parameters = {
  docs: {
    source: {
      code: `<oxd-tree-select-input
  :select-parents-on-child-selection="true"
  :count-topmost-parents="true"
  :options="options"
  :disabled="false"
  :readonly="false"
  :placeholder="'Select options'"
  :disable-unchecked-options="false"
  :remove-all-selection="false"
  :all-selected-text="'All'"
  :modelValue="selectedIds"
  @update:modelValue="updateSelectedIdsFun"
/>`,
    },
  },
};