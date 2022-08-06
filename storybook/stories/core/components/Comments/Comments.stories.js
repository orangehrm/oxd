import Comments from './Comments.story.vue';
import {h} from 'vue';
import {nanoid} from 'nanoid';
import {required} from '../../../../../components/src/validation/rules.ts';
import useSchemaForm from '../../../../../components/src/composables/useSchemaForm.ts';
import SchemaForm from '@orangehrm/oxd/core/components/SchemaForm/SchemaForm';

export default {
  title: 'Inputs/Comments',
  component: Comments,
  argTypes: {
    allowToEdit: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary:
            'Set boolean value to enable edit. The default value is false',
        },
      },
    },
    allowToDelete: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary:
            'Set boolean value to enable edit. The default value is false',
        },
      },
    },
    scrollMaxHeight: {
      control: {type: 'number'},
      defaultValue: 0,
      table: {
        type: {
          summary:
            'Set number to enable scroll and max height. The default value is 0',
        },
      },
    },
  },
};

const commentGroups = [
  {
    id: 'group-1',
    label: 'Offer notes',
    comments: [
      {
        groupId: 'group-1',
        id: nanoid(6),
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,',
        user: {
          id: nanoid(4),
          firstname: 'Peter',
          middlename: 'Sidius',
          lastname: 'Weiss',
        },
        time: '2021/08/24',
      },
      {
        groupId: 'group-1',
        id: nanoid(6),
        labelHint: '(Added note on CV)',
        content:
          'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.',
        user: {
          id: nanoid(4),
          firstname: 'Adrew',
          middlename: null,
          lastname: 'Peters',
        },
        time: '2021/09/04',
      },
    ],
  },
  {
    id: 'group-2',
    label: 'Test notes',
    comments: [
      {
        groupId: 'group-2',
        id: nanoid(6),
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,',
        user: {
          id: nanoid(4),
          firstname: 'Andrew',
          middlename: null,
          lastname: 'Simeon',
        },
        time: '2021/08/24',
      },
      {
        groupId: 'group-2',
        id: nanoid(6),
        content: 'Good job',
        user: {
          id: nanoid(4),
          firstname: 'Deby',
          middlename: null,
          lastname: 'Alexbery',
        },
        time: '2021/09/04',
      },
    ],
  },
  {
    id: 'group-3',
    label: 'Interview',
    comments: [
      {
        groupId: 'group-3',
        id: nanoid(6),
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        user: {
          id: nanoid(4),
          firstname: 'Deby',
          middlename: null,
          lastname: 'Alexbery',
        },
        time: '2021/08/24',
      },
      {
        groupId: 'group-3',
        id: nanoid(6),
        content:
          'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.',
        user: {
          id: nanoid(4),
          firstname: 'Andrew',
          middlename: null,
          lastname: 'Simeon',
        },
        time: '2021/09/04',
      },
    ],
  },
];

const Template = (args) => ({
  setup() {
    return {args};
  },
  render() {
    return h(Comments, {
      ...this.args,
      style: {
        'max-width': '600px',
      },
    });
  },
});

export const Default = Template.bind({});

Default.args = {
  commentGroups,
  allowToEdit: true,
  allowToDelete: true,
  enableAvatar: true,
  scrollMaxHeight: 300,
};

export const ReadOnly = Template.bind({});

ReadOnly.args = {
  commentGroups,
  allowToEdit: false,
  allowToDelete: false,
  enableAvatar: true,
  scrollMaxHeight: 350,
  readOnly: true,
};

export const EmptyComments = Template.bind({});

EmptyComments.args = {
  allowToEdit: true,
  allowToDelete: true,
  enableAvatar: true,
  scrollMaxHeight: 300,
};

const TemplateSchema = (args) => ({
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
        cols: 1,
      },
      children: {
        default: [
          {
            name: 'currentstagerequired',
            label: 'Comments required',
            type: 'comments',
            validators: new Map([['required', required]]),
            props: {
              commentGroups,
              allowToEdit: false,
              allowToDelete: false,
              enableAvatar: true,
              scrollMaxHeight: 250,
            },
            listeners: {
              onAddComment: (note) => {
                alert('addComment triggered');
              },
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
            label: 'Save',
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

export const CommentsSchemaForm = TemplateSchema.bind({});
CommentsSchemaForm.args = {
  schema: {...sample},
};
