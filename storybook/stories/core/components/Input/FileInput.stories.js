import FileInput from '@orangehrm/oxd/core/components/Input/FileInput';
import {computed, h, ref} from 'vue';

export default {
  title: 'Inputs/FileInput',
  component: FileInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
    inputFile: {
      control: {type: 'object'},
      table: {
        type: {
          summary:
            'Contains the file that should can be downloaded by the download box',
        },
      },
    },
    downloadBoxClick: {
      control: {type: 'function'},
      table: {
        type: {
          summary:
            'function that should be triggered once the download box clickd',
        },
      },
    },
    initialFileUpdateMode: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Initial update mode of the file'},
      },
    },
    deletable: {
      control: {type: 'boolean'},
      table: {
        type: {
          summary: 'Whether the delete option of the file is avialable or not',
        },
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-file-input': FileInput},
  template: '<oxd-file-input v-bind="args" />',
});

const defaultPic = require('@orangehrm/oxd/assets/images/user-default-400.png');

const SlotTemplate = (args) => ({
  setup() {
    const file = ref('');
    const imgSrc = computed({
      get: () => {
        if (file.value) {
          return `data:image/jpeg;base64,${file.value}`;
        } else {
          return defaultPic;
        }
      },
    });
    return {args, file, imgSrc};
  },
  render() {
    return h(
      FileInput,
      {
        'onUpdate:modelValue': (value) => {
          if (value?.base64) {
            this.file = value.base64;
          }
        },
        buttonLabel: this.args.buttonLabel,
        style: this.args.style,
      },
      {
        default: () => {
          return h('img', {
            src: this.imgSrc,
            width: 130,
            height: 130,
            style: {
              margin: '0 auto',
            },
          });
        },
      },
    );
  },
});

export const Default = Template.bind({});
Default.args = {};

export const Colored = Template.bind({});
Colored.args = {
  style: {backgroundColor: 'aliceblue'},
};

export const Error = Template.bind({});
Error.args = {
  hasError: true,
};

export const Labled = Template.bind({});
Labled.args = {
  buttonLabel: 'Browse',
};

export const SlotDemo = SlotTemplate.bind({});
SlotDemo.args = {
  buttonLabel: 'Browse',
  style: {
    width: '8rem',
    height: '8rem',
    'border-radius': '100%',
    overflow: 'hidden',
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

const sampleInputFile = {
  name: 'sample.pdf',
  type: 'application/pdf',
  size: 101273,
};

export const WithDownloadBox = Template.bind({});
WithDownloadBox.args = {
  inputFile:sampleInputFile ,
  downloadBoxClick: () => {
    window.alert('Downloading the document!');
  },
};

WithDownloadBox.parameters = {
  docs: {
    source: {
      code:
      '<oxd-file-input \n :inputFile=' +
      JSON.stringify(sampleInputFile) +
      '\n :downloadBoxClick: ()=>{ window.alert("Downloading the document!" }'+
      '\n/>',
    },
  },
};

export const DownloadBoxWithoutDeleteOption = Template.bind({});
DownloadBoxWithoutDeleteOption.args = {
  inputFile: sampleInputFile,
  deletable: false,
  downloadBoxClick: () => {
    window.alert('Downloading the document!');
  },
};

DownloadBoxWithoutDeleteOption.parameters = {
  docs: {
    source: {
      code:
        '<oxd-file-input \n :inputFile=' +
        JSON.stringify(sampleInputFile) +
        '\n :deletable=false'+
        '\n :downloadBoxClick: ()=>{ window.alert("Downloading the document!" }'+
        '\n/>',
    },
  },
};

export const DownloadBoxWithInitialUpdateMode = Template.bind({});
DownloadBoxWithInitialUpdateMode.args = {
  inputFile: sampleInputFile,
  initialFileUpdateMode: "delete",
  downloadBoxClick: () => {
    window.alert('Downloading the document!');
  },
};

DownloadBoxWithInitialUpdateMode.parameters = {
  docs: {
    source: {
      code:
        '<oxd-file-input \n :inputFile=' +
        JSON.stringify(sampleInputFile) +
        '\n :initialFileUpdateMode="delete"'+
        '\n :downloadBoxClick: ()=>{ window.alert("Downloading the document!" }'+
        '\n/>',
    },
  },
};

export const WithDownloadBoxDisabled = Template.bind({});
WithDownloadBoxDisabled.args = {
  disabled: true,
  inputFile: sampleInputFile,
  downloadBoxClick: () => {
    window.alert('Downloading the document!');
  },
};

WithDownloadBoxDisabled.parameters = {
  docs: {
    source: {
      code:
        '<oxd-file-input \n :inputFile=' +
        JSON.stringify(sampleInputFile) +
        '\n :disabled=true'+
        '\n :downloadBoxClick: ()=>{ window.alert("Downloading the document!" }'+
        '\n/>',
    },
  },
};

export const WithDownloadBoxReadonly = Template.bind({});
WithDownloadBoxReadonly.args = {
  readonly: true,
  inputFile: sampleInputFile,
  downloadBoxClick: () => {
    window.alert('Downloading the document!');
  },
};

WithDownloadBoxReadonly.parameters = {
  docs: {
    source: {
      code:
        '<oxd-file-input \n :inputFile=' +
        JSON.stringify(sampleInputFile) +
        '\n :readonly=true'+
        '\n :downloadBoxClick: ()=>{ window.alert("Downloading the document!" }'+
        '\n/>',
    },
  },
};
