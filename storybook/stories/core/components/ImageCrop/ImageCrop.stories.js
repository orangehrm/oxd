import ImageCropper from '@orangehrm/oxd/core/components/ImageCropper/ImageCropper';

export default {
  title: 'Information/ImageCropper',
  component: ImageCropper,
  argTypes: {
    image: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Image passed to Component'},
      },
    },
    stencilWidth: {
      control: {type: 'text'},
      table: {
        type: {summary: 'px width of stencil'},
      },
    },
    stencilHeight: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'px height of stencil'},
      },
    },
    change: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit  change event with cropped image data'},
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-image-crop': ImageCropper},
  template: '<oxd-image-crop v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  image:
    'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=991&q=80',
};

export const CustomStencil = Template.bind({});
CustomStencil.args = {
  stencilHeight: '500',
  stencilWidth: '500',
  image:
    'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=991&q=80',
};
