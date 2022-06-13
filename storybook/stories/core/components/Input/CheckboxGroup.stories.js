import CheckboxGroupStory from './CheckboxGroup.story.vue';
import CheckboxGroupEvents from './CheckboxGroupEvents.story.vue';

export default {
  title: 'Inputs/CheckboxGroup',
};

const Template = (args) => ({
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
    },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: [
    {
      id: 1,
      label: 'Job',
    },
    {
      id: 2,
      label: 'Salary',
      disabled: true,
    },
    {
      id: 3,
      label: 'Other',
      disabled: true,
    },
  ],
};

export const Events = () => CheckboxGroupEvents;

Events.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-checkbox-group \n' +
        ':options="options"\n' +
        '@focus="onFocus()"\n' +
        '@click="onClick()"\n' +
        'v-model="value""\n' +
        ' @update:modelValue="updatedValue(event)' +
        '/>\n' +
        '</div>\n' +
        '<div style="margin-top: 2rem">\n' +
        '<span v-if="FocusEvent">Focus Event Triggered</span>\n' +
        '<span v-if="BlurEvent">Blur Event Triggered</span>\n' +
        '<span v-if="ChangeEvent">Change Event Triggered</span>\n' +
        '</div>\n' +
        '<div>\n' +
        '<span v-if="value">Value Selected : {{ value }}</span>\n' +
        '</div>\n' +
        '//\n',
    },
  },
};
