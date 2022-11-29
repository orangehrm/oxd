import ImageCropper from '@orangehrm/oxd/core/components/ImageCropper/ImageCropper';
import {ref} from 'vue';

export default {
  title: 'Inputs/ImageCropper',
  component: ImageCropper,
  argTypes: {
    image: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Image passed to Component'},
      },
    },
    imageFormat: {
      control: {
        type: 'select',
        options: ['image/jpeg', 'image/gif', 'image/png', 'image/avif'],
      },
      table: {
        type: {summary: 'image file type'},
      },
    },
    imageQuality: {
      control: {type: 'text'},
      table: {
        type: {
          summary:
            'Image quality: floating point number between 0 and 1. Defaults to 0.9',
        },
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
    const croppedImage = ref('');
    const imageSize = ref('');
    const croppedImageWidth = ref('');
    const croppedImageHeight = ref('');

    const onImageCropped = (e) => {
      croppedImage.value = e;
      const base64 = e.split(',')[1];
      imageSize.value = (atob(base64).length / 1024).toFixed(2);

      const img = new Image();
      img.onload = function () {
        croppedImageWidth.value = this.width;
        croppedImageHeight.value = this.height;
      };
      img.src = e;
    };

    return {
      args,
      croppedImage,
      onImageCropped,
      imageSize,
      croppedImageWidth,
      croppedImageHeight,
    };
  },
  components: {'oxd-image-crop': ImageCropper},
  template:
    '<div style="width:900px;height:600px;position:absolute"><oxd-image-crop v-bind="args" @change="onImageCropped"/></div>' +
    '<div style="position:absolute;left:950px;top:0;display:flex; flex-direction: column">' +
    '<span style="font-weight:bold;">Cropped Image Result (Not part of component)</span><img :src="croppedImage" alt="crop result" style="" :width="stencilWidth" :height="stencilHeight"/>' +
    '<span>Image Size: {{ imageSize }} kb</span><span>Width: {{ croppedImageWidth }}, Height: {{ croppedImageHeight }}</span></div>',
});

export const Default = Template.bind({});
Default.args = {
  image:
    'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&q=80',
  imageFormat: 'image/jpeg',
  imageQuality: '0.9',
};
