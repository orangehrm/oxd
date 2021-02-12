import CardTableStory from './CardTable.story.vue';

export default {
  title: 'Example/CardTable',
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {CardTableStory},
  template: '<CardTableStory v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
  selectable: true,
};
