import TinyMce from '@orangehrm/oxd/core/components/TinyMce/TinyMce';

export default {
  title: 'Inputs/TinyMce',
  component: TinyMce,
  argTypes: {
    'update:modelValue': {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit value on adding a input'},
      },
    },
    attachmentSize: {
      control: {type: 'number'},
      table: {
        type: {summary: 'Set attachment file size in bytes.'},
      },
      defaultValue: '',
    },
    allowedFileTypes: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set allowed file types as an array.'},
      },
      defaultValue: [
        'image/gif',
        'image/jpeg',
        'image/jpg',
        'image/pjpeg',
        'image/png',
        'image/x-png',
      ],
    },
    hasError: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set error state.'},
      },
      defaultValue: false,
    },
    disabled: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set disabled state.'},
      },
      defaultValue: false,
    },
    configurations: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Configure the TinyMce editor'},
      },
      defaultValue: {
        height: 500,
        selector: '.tinymce',
        theme: 'modern',
        plugins:
          'advlist,anchor,autolink,autoresize,colorpicker,emoticons,hr,image,link,nonbreaking,\n\
          pagebreak,paste,preview,print,searchreplace,table,textcolor,wordcount,contextmenu,lists',
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
        toolbar1:
          'toggleToolbar | fontselect fontsizeselect | bold italic | bullist numlist outdent indent ',
        toolbar2:
          'undo redo | link image image-upload | alignleft aligncenter alignright alignjustify | forecolor backcolor ',
        image_advtab: true,
        browser_spellcheck: true,
        paste_as_text: true,
        paste_data_images: true,
        autoresize_max_height: 500,
        contextmenu_never_use_native: true,
        content_css: false,
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-tinymce': TinyMce},
  template: '<oxd-tinymce v-bind="args" />',
});

export const Default = Template.bind({});

const modelValue = `<p><span style="background-color: rgb(255, 255, 0);" data-mce-style="background-color: #ffff00;">In computing, <strong>WYSIWYG</strong> (/ˈwɪziwɪɡ/ WIZ-ee-wig), an <a href="https://en.wikipedia.org/wiki/Acronym" data-mce-href="https://en.wikipedia.org/wiki/Acronym">acronym</a>&nbsp;for <strong>What You See Is What You Get</strong>,[1] is a system in which <a href="https://en.wikipedia.org/wiki/Editing" data-mce-href="https://en.wikipedia.org/wiki/Editing">editing</a>&nbsp;software allows content to be edited in a form that resembles its appearance when printed or displayed as a finished product,[2] such as a printed document, web page, or slide presentation.</span> WYSIWYG implies a user interface that allows the user to view something very similar to the end result while the document is being created.[3] In general, WYSIWYG implies the ability to directly manipulate the layout of a document without having to type or remember names of layout commands.</p>`;

Default.args = {
  modelValue: modelValue,
};

Default.parameters = {
  docs: {
    source: {
      code: '<oxd-tinymce :v-model="modelValue" />',
    },
  },
};

export const Disabled = Template.bind({});

Disabled.args = {
  modelValue: modelValue,
  disabled: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code: '<oxd-tinymce :v-model="modelValue" :disabled="true" />',
    },
  },
};

export const Error = Template.bind({});

Error.args = {
  hasError: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code: '<oxd-tinymce :v-model="modelValue" :hasError="true" />',
    },
  },
};
