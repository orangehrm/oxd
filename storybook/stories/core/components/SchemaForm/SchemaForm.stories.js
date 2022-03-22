import SchemaForm from '@orangehrm/oxd/core/components/SchemaForm/SchemaForm';
import useSchemaForm from '../../../../../components/src/composables/useSchemaForm.ts';
import {required} from '../../../../../components/src/validation/rules.ts';
import {h} from 'vue';

export default {
  title: 'Example/SchemaForm',
  component: SchemaForm,
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
Advance.args = {
  schema: {
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
              name: 'date',
              label: 'Date of Application',
              type: 'date',
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
