import Text from '@orangehrm/oxd/core/components/Text/Text';
import {
  TAGS,
  TYPE_SUBTITLE_1,
  TYPE_SUBTITLE_2,
  TYPE_CARD_TITLE,
} from '@orangehrm/oxd/core/components/Text/types';

export default {
  title: 'Information/Text',
  component: Text,
};

const DUMMY_TEXT = 'Nunito is a well balanced sans serif typeface';

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-text': Text},
  template: `<oxd-text v-bind="args">${DUMMY_TEXT}</oxd-text>`,
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

export const CardTitle = Template.bind({});
CardTitle.args = {type: TYPE_CARD_TITLE};

export const Subtitle1 = Template.bind({});
Subtitle1.args = {type: TYPE_SUBTITLE_1};

export const Subtitle2 = Template.bind({});
Subtitle2.args = {type: TYPE_SUBTITLE_2};
