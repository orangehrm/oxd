import Comments from './Comments.story.vue';
import {h} from 'vue';
import {nanoid} from 'nanoid';
import {required} from '../../../../../components/src/validation/rules.ts';
import useSchemaForm from '../../../../../components/src/composables/useSchemaForm.ts';
import SchemaForm from '@orangehrm/oxd/core/components/SchemaForm/SchemaForm';
import CommentsEvents from './CommentsEvents.story.vue';
import {
  END,
  SMOOTH,
} from '../../../../../components/src/core/components/Comments/types';

export default {
  title: 'Inputs/Comments',
  component: Comments,
  argTypes: {
    readOnly: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary: 'Set boolean value true to make read only',
        },
      },
    },
    disabled: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary: 'Set boolean value true to make disable',
        },
      },
    },
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
    scrollSettings: {
      control: {type: 'object'},
      defaultValue: {
        mode: SMOOTH,
        scrollTo: END,
      },
      table: {
        type: {
          summary:
            'Set mode to scroll smoother "smooth" or "auto" and scrollTo to "start, center or end". The default values are mode = smooth and scrollTo = end',
        },
      },
    },
    commentBoxLabel: {
      control: {type: 'text'},
      defaultValue: 'Add Comment',
      table: {
        type: {
          summary: 'Set value to show textarea label',
        },
      },
    },
    commentBoxPlaceholder: {
      control: {type: 'text'},
      defaultValue: 'Write your comment...',
      table: {
        type: {
          summary: 'Set value to show textarea placeholder',
        },
      },
    },
    unsavedAddCommentErrorMsg: {
      control: {type: 'text'},
      defaultValue: 'Comment should be either added or removed',
      table: {
        type: {
          summary:
            'Set comment validation message to show when triggered save without adding or removing the comment',
        },
      },
    },
    requiredEditCommentErrorMsg: {
      control: {type: 'text'},
      defaultValue: 'Required',
      table: {
        type: {
          summary:
            'Set comment validation message to show when triggered cleared the comment',
        },
      },
    },
    unsavedEditCommentErrorMsg: {
      control: {type: 'text'},
      defaultValue: 'Note should be either updated or removed',
      table: {
        type: {
          summary:
            'Set comment validation message to show when triggered save without adding or removing the comment',
        },
      },
    },
    commentDeleteConfirmationMsg: {
      control: {type: 'text'},
      defaultValue:
        'The current comment will be permanently deleted. Are you sure you want to continue?',
      table: {
        type: {
          summary:
            'Set comment delete confirmation message to show before delete the comment',
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
        edited: true,
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
  unsavedAddCommentErrorMsg: 'Comment should be either updated or removed',
  commentDeleteConfirmationMsg:
    'The current comment will be permanently deleted. Are you sure you want to continue?',
};

export const ScrollSettings = Template.bind({});

ScrollSettings.args = {
  commentGroups,
  allowToEdit: true,
  allowToDelete: true,
  enableAvatar: true,
  scrollMaxHeight: 300,
  scrollSettings: {
    mode: SMOOTH,
    scrollTo: END,
  },
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

export const Disabled = Template.bind({});

Disabled.args = {
  commentGroups,
  allowToEdit: false,
  allowToDelete: false,
  enableAvatar: true,
  scrollMaxHeight: 350,
  disabled: true,
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

export const Events = () => CommentsEvents;

// show code begins
Default.parameters = {
  docs: {
    source: {
      code: `
      <oxd-comments
        :enableAvatar="true"
        :scrollMaxHeight="200"
        :commentGroups="commentGroups"
        :commentDeleteConfirmationMsg=""The current comment will be permanently deleted. Are you sure you want to continue?"
        @onAddComment="addComment"
        @onUpdateComment="updateComment"
        @onDeleteComment="deleteComment"
      />`,
    },
  },
};

ReadOnly.parameters = {
  docs: {
    source: {
      code: `
      <oxd-comments
        :readOnly="true"
        :enableAvatar="true"
        :scrollMaxHeight="200"
        :commentGroups="commentGroups"
        :commentDeleteConfirmationMsg=""The current comment will be permanently deleted. Are you sure you want to continue?"
        @onAddComment="addComment"
        @onUpdateComment="updateComment"
        @onDeleteComment="deleteComment"
      />`,
    },
  },
};

Disabled.parameters = {
  docs: {
    source: {
      code: `
      <oxd-comments
        :disabled="true"
        :enableAvatar="true"
        :scrollMaxHeight="200"
        :commentGroups="commentGroups"
        :commentDeleteConfirmationMsg=""The current comment will be permanently deleted. Are you sure you want to continue?"
        @onAddComment="addComment"
        @onUpdateComment="updateComment"
        @onDeleteComment="deleteComment"
      />`,
    },
  },
};

EmptyComments.parameters = {
  docs: {
    source: {
      code: `
      <oxd-comments
        :enableAvatar="true"
        :scrollMaxHeight="200"
        :stage="stage"
        :commentDeleteConfirmationMsg=""The current comment will be permanently deleted. Are you sure you want to continue?"
        @onAddComment="addComment"
        @onUpdateComment="updateComment"
        @onDeleteComment="deleteComment"
      />`,
    },
  },
};

CommentsSchemaForm.parameters = {
  docs: {
    source: {
      code: `
      {
        name: "notes",
        label: $t("Notes"),
        type: "comments",
        class: "mb-0--oxd-input-group",
        props: {
          enableAvatar: true,
          scrollMaxHeight: 250,
          candidate: candidate,
          commentGroups: commentGroups,
          commentDeleteConfirmationMsg: $t(
            "The current comment will be permanently deleted. Are you sure you want to continue?"
          ),
        },
        validators: new Map([
          [
            "shouldBeAddedOrRemoved",
            (value: string) => {
              if (!submitted.value) return true;
              return shouldBeAddedOrRemoved(value);
            },
          ],
          ["shouldNotExceedCharLength", shouldNotExceedCharLength(65535)],
        ]),
        listeners: {
          onAddComment: (note: string, successCallback: any) => {
            submitted.value = false;
            this.emit("note:add", note, successCallback);
          },
          onUpdateComment: (noteObj: any, note: string) => {
            this.emit("note:update", noteObj, note);
          },
          onDeleteComment: (note: any) => {
            this.emit("note:delete", note);
          },
        },
      },`,
    },
  },
};
// show code ends
