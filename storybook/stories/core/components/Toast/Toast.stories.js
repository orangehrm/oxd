import Toast from '@orangehrm/oxd/core/components/Toast/Toast';
import {TYPES} from '@orangehrm/oxd/core/components/Toast/types';
import ToastAnimation from './ToastAnimation.story.vue';

export default {
  title: 'Information/Toast',
  component: Toast,
  argTypes: {
    type: {
      control: {type: 'select', options: TYPES},
    },
    show: {
      control: {type: 'boolean'},
    },
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-toast': Toast},
  template: `<oxd-toast v-bind="args" />`,
});

export const Default = Template.bind({});
Default.args = {
  show: true,
  type: 'success',
  title: 'Lorem Ipsum',
  message: `Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. Lorem Ipsum has been the industry's standard dummy text ever
  since the 1500s, when an unknown printer took a galley of type and
  scrambled it to make a type specimen book. It has survived not only five
  centuries, but also the leap into electronic typesetting, remaining
  essentially unchanged. It was popularised in the 1960s with the release of
  Letraset sheets containing Lorem Ipsum passages, and more recently with
  desktop publishing software like Aldus PageMaker including versions of
  Lorem Ipsum.`,
};

export const Animation = () => ToastAnimation;
