import TreeSelect from './TreeSelect.story.vue';
import TreeSelectNarrow from './TreeSelectNarrow.story.vue';
import TreeSelectTopOfInput from './TreeSelectTopOfInput.story.vue';

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
