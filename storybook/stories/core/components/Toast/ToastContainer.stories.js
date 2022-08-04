import ToastContainer from '@orangehrm/oxd/core/components/Toast/Container';
import {
  POSITIONS,
  POSITION_BOTTOM,
} from '@orangehrm/oxd/core/components/Toast/types';
import ToastContainerCustomAnimationStory from './ToastContainerCustomAnimation.story.vue';
import ToastContainerCustomWrapperStory from './ToastContainerCustomWrapper.story.vue';

export default {
  title: 'Information/Toast/Container',
  component: ToastContainer,
  argTypes: {
    position: {
      control: {type: 'select', options: POSITIONS},
      defaultValue: POSITION_BOTTOM,
    },
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  data() {
    return {
      toasts: [
        {
          type: 'success',
          title: 'Success',
          message: 'Success message',
          show: true,
        },
        {
          type: 'warn',
          title: 'Warn',
          message: 'Success message',
          show: true,
        },
        {
          type: 'default',
          title: 'Default',
          message: 'Success message',
          show: true,
        },
        {
          type: 'error',
          title: 'Error',
          message: 'Success message',
          show: true,
        },
        {
          type: 'info',
          title: 'Info',
          message: 'Success message',
          show: true,
        },
      ],
    };
  },
  components: {'oxd-toast-container': ToastContainer},
  template: `<oxd-toast-container v-model:toasts="toasts" :position="args.position" />`,
});

export const Default = Template.bind({});

export const CustomAnimation = () => ToastContainerCustomAnimationStory;

export const CustomWrapper = () => ToastContainerCustomWrapperStory;
