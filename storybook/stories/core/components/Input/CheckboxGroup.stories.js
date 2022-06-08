import CheckboxGroupStory from './CheckboxGroup.story.vue';

export default {
  title: 'Inputs/CheckboxGroup',
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-check-box-group-story': CheckboxGroupStory},
  template: '<oxd-check-box-group-story v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  options: [
    {
      id: 1,
      label: 'Job',
    },
    {
      id: 2,
      label: 'Salary',
    },
    {
      id: 3,
      label: 'Other',
      // disabled: true,
    },
  ],
  // class: 'check-box-row',
  // id: 'checkboxgroup_newId',
  // style: {
  //   'margin-top': '10rem',
  // },
};
