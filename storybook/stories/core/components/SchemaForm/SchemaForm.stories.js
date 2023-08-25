import SchemaForm from '@orangehrm/oxd/core/components/SchemaForm/SchemaForm';
import useSchemaForm from '../../../../../components/src/composables/useSchemaForm.ts';
import {
  required,
  shouldNotExceedCharLength,
} from '../../../../../components/src/validation/rules.ts';
import {h, ref} from 'vue';

export default {
  title: 'Example/SchemaForm',
  component: SchemaForm,
};

const openFacebookTab = function () {
  window.open('https://www.facebook.com/OrangeHRM/', '_blank');
};

const Template = (args) => ({
  components: {'oxd-schema-form': SchemaForm},
  setup() {
    const {schema, model} = useSchemaForm(args.schema);
    const onSubmit = (...args) => {
      console.log(args);
    };
    return {
      model,
      schema,
      onSubmit,
    };
  },
  components: {'oxd-schema-form': SchemaForm},
  template: `<oxd-schema-form :schema="schema" v-model:model="model" v-on:submitValid="onSubmit"></oxd-schema-form>`,
});

const sample = {
  name: 'sampleForm',
  layout: [
    {
      type: 'grid',
      props: {
        cols: 2,
      },
      children: {
        default: [
          {
            name: 'firstName',
            label: 'First Name',
            type: 'input',
            validators: new Map([['required', required]]),
          },
        ],
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'action',
      style: {
        'margin-top': '0.5rem',
      },
      children: {
        default: [
          {
            name: 'submit',
            label: 'Submit',
            type: 'button',
            props: {
              type: 'submit',
              displayType: 'secondary',
            },
          },
        ],
      },
    },
  ],
};

export const Default = Template.bind({});
Default.args = {
  schema: {...sample},
};

const CrossValidationTemplate = (args) => ({
  components: {'oxd-schema-form': SchemaForm},
  setup() {
    const {schema, model} = useSchemaForm(args.schema);
    const onSubmit = (...args) => {
      console.log(args);
    };
    return {
      model,
      schema,
      onSubmit,
    };
  },
  components: {'oxd-schema-form': SchemaForm},
  template: `<oxd-schema-form :schema="schema" v-model:model="model" v-on:submitValid="onSubmit"></oxd-schema-form>`,
});

const crossValidationSample = {
  name: 'crossValidationForm',
  layout: [
    {
      type: 'grid',
      props: {
        cols: 2,
      },
      children: {
        default: [
          {
            name: 'vacancy',
            label: 'Vacancy',
            type: 'select',
            props: {
              options: [
                {id: 1, label: 'Vaccancy One'},
                {id: 2, label: 'Vaccancy Two'},
              ],
            },
            validators: new Map([['required', required]]),
          },
          {
            name: 'firstName',
            label: 'First Name',
            type: 'input',
            // eslint-disable-next-line @typescript-eslint/ban-types
            hook: (field, modelvalue) => {
              const model = modelvalue;
              const defaultValidtors = new Map();
              if (model?.vacancy?.id === 1) {
                defaultValidtors.set('required', required);
              }
              field.validators = defaultValidtors;
              return {
                ...field,
              };
            },
          },
        ],
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'action',
      style: {
        'margin-top': '0.5rem',
      },
      children: {
        default: [
          {
            name: 'submit',
            label: 'Submit',
            type: 'button',
            props: {
              type: 'submit',
              displayType: 'secondary',
            },
          },
        ],
      },
    },
  ],
};

const crossValidationInitialCheckSample = {
  name: 'crossValidationForm',
  layout: [
    {
      type: 'grid',
      props: {
        cols: 2,
      },
      children: {
        default: [
          {
            name: 'vacancy',
            label: 'Vacancy',
            type: 'select',
            props: {
              options: [
                {id: 1, label: 'Vaccancy One'},
                {id: 2, label: 'Vaccancy Two'},
              ],
            },
            validators: new Map([['required', required]]),
          },
          {
            name: 'firstName',
            label: 'First Name',
            type: 'input',
            props: {
              dirty: true,
            },
            // eslint-disable-next-line @typescript-eslint/ban-types
            hook: (field, modelvalue) => {
              const model = modelvalue;
              const defaultValidtors = new Map();
              if (model?.vacancy?.id === 1) {
                defaultValidtors.set('required', required);
              }
              field.validators = defaultValidtors;
              return {
                ...field,
              };
            },
          },
        ],
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'action',
      style: {
        'margin-top': '0.5rem',
      },
      children: {
        default: [
          {
            name: 'submit',
            label: 'Submit',
            type: 'button',
            props: {
              type: 'submit',
              displayType: 'secondary',
            },
          },
        ],
      },
    },
  ],
};

export const CrossValidation = CrossValidationTemplate.bind({});
CrossValidation.args = {
  schema: {...crossValidationSample},
  modelValue: [],
};

export const CrossInitialCheckValidation = CrossValidationTemplate.bind({});
CrossInitialCheckValidation.args = {
  schema: {...crossValidationInitialCheckSample},
  modelValue: [],
};

export const PromiseBased = Template.bind({});
PromiseBased.args = {
  schema: new Promise((resolve) => {
    setTimeout(() => {
      resolve({...sample});
    }, 5000);
  }),
};

export const FunctionBased = Template.bind({});
const getSchemaWithUser = async function (username) {
  // fake throttle request
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return new Promise((resolve) => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((user) => {
        const _schema = {
          name: 'functionBasedForm',
          layout: [
            {
              type: 'custom',
              component: h('div', [
                h('img', {
                  src: `https://github-readme-stats.vercel.app/api?username=${user.login}&show_icons=true&theme=radical`,
                  style: {
                    width: '100%',
                    padding: '0 0.25rem',
                    'box-sizing': 'border-box',
                  },
                }),
              ]),
            },
            {
              type: 'grid',
              props: {
                cols: 2,
              },
              children: {
                default: [
                  {
                    name: 'name',
                    label: 'Name',
                    type: 'input',
                    value: user.name,
                  },
                  {
                    name: 'url',
                    label: 'Website',
                    type: 'input',
                    value: user.blog,
                  },
                ],
              },
            },
          ],
        };
        resolve(_schema);
      });
  });
};
FunctionBased.args = {
  schema: getSchemaWithUser('yyx990803'),
};

export const Advance = Template.bind({});
const weight = ref(2);
Advance.args = {
  schema: {
    name: 'AdvanceForm',
    layout: [
      {
        type: 'grid',
        props: {
          cols: 1,
        },
        children: {
          default: [
            {
              name: 'resume',
              label: 'Select resume',
              type: 'file',
              class: ['--span-column-2'],
            },
          ],
        },
      },
      {
        type: 'grid',
        props: {
          cols: 2,
        },
        children: {
          default: [
            {
              name: 'firstName',
              label: 'First Name',
              type: 'input',
              validators: new Map([['required', required]]),
              value: 'test',
            },
            {
              name: 'middleName',
              label: 'Middle Name',
              type: 'input',
            },
            {
              name: 'lastName',
              label: 'Last Name',
              type: 'input',
              validators: new Map([['required', required]]),
            },
            {
              name: 'email',
              label: 'Email',
              type: 'input',
              visible: true,
              style: {
                color: 'red',
              },
              validators: new Map([['required', required]]),
            },
            {
              name: 'facebook',
              label: 'Facebook',
              type: 'input',
              visible: true,
              props: {
                imageIcon: require('@orangehrm/oxd/assets/images/facebook_logo_icon.svg'),
                imageIconClick: openFacebookTab,
                isIconClickable: true,
              },
            },
            {
              name: 'contactNumber',
              label: 'Contact Number',
              type: 'input',
              listners: {
                onChange: ($event) => console.log($event),
              },
            },
            {
              name: 'vacancy',
              label: 'Vacancy',
              type: 'select',
              props: {
                options: [
                  {id: 1, label: 'Vaccancy One'},
                  {id: 2, label: 'Vaccancy Two'},
                ],
              },
              validators: new Map([['required', required]]),
            },
            {
              name: 'user',
              label: 'Users',
              type: 'multiselect',
              value: [],
              props: {
                options: [
                  {id: 1, label: 'HR'},
                  {id: 2, label: 'Admin'},
                ],
              },
            },
            {
              name: 'autofocusUser',
              label: 'Search Users',
              type: 'autocomplete',
              value: [],
              props: {
                placeholder: 'test',
                autofocus: true,
                createOptions: function (serachParam) {
                  const filter = new RegExp(serachParam, 'i');
                  return [
                    {id: 1, label: 'HR'},
                    {id: 2, label: 'Admin'},
                  ].filter((item) => item.label.match(filter));
                },
              },
              validators: new Map([['required', required]]),
            },
            {
              name: 'date',
              label: 'Date of Application',
              type: 'date',
            },
            {
              name: 'weight',
              label: 'Weightage',
              type: 'number',
              visible: true,
              value: weight.value,
              style: {
                'max-width': '100px',
              },
              props: {
                min: -4,
                max: 5
              },
              listeners: {
                'onUpdate:modelValue': (value) => {
                  weight.value = value;
                },
              }
            },
            {
              name: 'certificate',
              label: 'Certificates',
              type: 'file',
              props: {
                buttonLabel: 'Browse',
                downloadBoxClick: () => {
                  const downloadLink = document.createElement('a');
                  downloadLink.href =
                    'data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';
                  downloadLink.download = 'sample.pdf';
                  downloadLink.click();
                },
                inputFile: {
                  name: 'sample.pdf',
                  type: 'application/pdf',
                  size: 101273,
                  base64:
                    'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G',
                },
              },
              listeners: {
                onSelectedOption: (option) => {
                  console.log(option);
                },
              },
            },
          ],
        },
      },
      {
        type: 'grid',
        props: {
          cols: 1,
        },
        children: {
          default: [
            {
              name: 'tinymce',
              label: 'HTML Editor',
              type: 'tinymce',
              id: 'schema-form-tinymce',
              class: ['--span-column-2'],
              validators: new Map([
                ['required', required],
                ['shouldNotExceedCharLength', shouldNotExceedCharLength(100)],
              ]),
              props: {
                hint: 'File Size Should Be Less Than 5MB',
                hintPlacement: 'bottom',
              },
            },
          ],
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'action',
        style: {
          'margin-top': '0.5rem',
        },
        children: {
          default: [
            {
              name: 'reset',
              label: 'Reset',
              type: 'button',
              props: {
                type: 'reset',
                displayType: 'ghost',
              },
            },
            {
              name: 'submit',
              label: 'Submit',
              type: 'button',
              style: {
                'margin-left': '0.5rem',
              },
              props: {
                type: 'submit',
                displayType: 'secondary',
              },
            },
          ],
        },
      },
    ],
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  schema: {
    name: 'DisabledForm',
    disabled: true,
    layout: [
      {
        type: 'grid',
        props: {
          cols: 1,
        },
        children: {
          default: [
            {
              name: 'resume',
              label: 'Select resume',
              type: 'file',
              class: ['--span-column-2'],
            },
          ],
        },
      },
      {
        type: 'grid',
        props: {
          cols: 2,
        },
        children: {
          default: [
            {
              name: 'firstName',
              label: 'First Name',
              type: 'input',
              validators: new Map([['required', required]]),
              value: 'test',
            },
            {
              name: 'middleName',
              label: 'Middle Name',
              type: 'input',
            },
            {
              name: 'lastName',
              label: 'Last Name',
              type: 'input',
              validators: new Map([['required', required]]),
            },
            {
              name: 'email',
              label: 'Email',
              type: 'input',
              visible: true,
              style: {
                color: 'red',
              },
              validators: new Map([['required', required]]),
            },
            {
              name: 'facebook',
              label: 'Facebook',
              type: 'input',
              visible: true,
              props: {
                imageIcon: require('@orangehrm/oxd/assets/images/facebook_logo_icon.svg'),
              },
            },
            {
              name: 'contactNumber',
              label: 'Contact Number',
              type: 'input',
              listners: {
                onChange: ($event) => console.log($event),
              },
            },
            {
              name: 'vacancy',
              label: 'Vacancy',
              type: 'select',
              props: {
                options: [
                  {id: 1, label: 'Vaccancy One'},
                  {id: 2, label: 'Vaccancy Two'},
                ],
              },
              validators: new Map([['required', required]]),
            },
            {
              name: 'user',
              label: 'Users',
              type: 'multiselect',
              value: [],
              props: {
                options: [
                  {id: 1, label: 'HR'},
                  {id: 2, label: 'Admin'},
                ],
              },
            },
            {
              name: 'autofocusUser',
              label: 'Search Users',
              type: 'autocomplete',
              value: [],
              props: {
                placeholder: 'test',
                autofocus: true,
                createOptions: function (serachParam) {
                  const filter = new RegExp(serachParam, 'i');
                  return [
                    {id: 1, label: 'HR'},
                    {id: 2, label: 'Admin'},
                  ].filter((item) => item.label.match(filter));
                },
              },
              validators: new Map([['required', required]]),
            },
            {
              name: 'date',
              label: 'Date of Application',
              type: 'date',
            },
            {
              name: 'comment',
              label: 'Comment',
              type: 'textarea',
            },
            {
              name: 'certificate',
              label: 'Certificates',
              type: 'file',
              props: {
                buttonLabel: 'Browse',
                downloadBoxClick: () => {
                  const downloadLink = document.createElement('a');
                  downloadLink.href =
                    'data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';
                  downloadLink.download = 'sample.pdf';
                  downloadLink.click();
                },
                inputFile: {
                  name: 'sample.pdf',
                  type: 'application/pdf',
                  size: 101273,
                  base64:
                    'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G',
                },
              },
              listeners: {
                onSelectedOption: (option) => {
                  console.log(option);
                },
              },
            },
          ],
        },
      },
      {
        type: 'grid',
        props: {
          cols: 1,
        },
        children: {
          default: [
            {
              name: 'tinymce',
              label: 'HTML Editor',
              type: 'tinymce',
              class: ['--span-column-2'],
              validators: new Map([['required', required]]),
              props: {
                hint: 'File Size Should Be Less Than 5MB',
              },
            },
          ],
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'action',
        style: {
          'margin-top': '0.5rem',
        },
        children: {
          default: [
            {
              name: 'reset',
              label: 'Reset',
              type: 'button',
              props: {
                type: 'reset',
                displayType: 'ghost',
              },
            },
            {
              name: 'submit',
              label: 'Submit',
              type: 'button',
              style: {
                'margin-left': '0.5rem',
              },
              props: {
                type: 'submit',
                displayType: 'secondary',
              },
            },
          ],
        },
      },
    ],
  },
};
