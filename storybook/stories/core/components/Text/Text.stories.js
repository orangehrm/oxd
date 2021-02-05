import Text from '@orangehrm/oxd/core/components/Text/Text';
import {TAGS} from '@orangehrm/oxd/core/components/Text/types';

export default {
  title: 'Example/Text',
  component: Text,
};

const DUMMY_TEXT = 'Nunito is a well balanced sans serif typeface';

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {'oxd-text': Text},
  template: `<oxd-text v-bind="$props">${DUMMY_TEXT}</oxd-text>`,
});

const argTypes = {
  tag: {
    control: {type: 'select', options: TAGS},
  },
  style: {control: {type: 'object'}},
};

export const Default = Template.bind({});
Default.args = {tag: 'p'};
Default.argTypes = argTypes;

export const Colored = Template.bind({});
Colored.args = {style: {color: 'brown'}};
Colored.argTypes = argTypes;

const TemplateAll = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {'oxd-text': Text},
  template: `<oxd-text tag="h1">${args.label}</oxd-text>
  <oxd-text tag="h2">${args.label}</oxd-text>
  <oxd-text tag="h3">${args.label}</oxd-text>
  <oxd-text tag="h4">${args.label}</oxd-text>
  <oxd-text tag="h5">${args.label}</oxd-text>
  <oxd-text tag="h6">${args.label}</oxd-text>
  <oxd-text>${args.label}</oxd-text>`,
});

export const All = TemplateAll.bind({});
All.args = {
  label: DUMMY_TEXT,
};
