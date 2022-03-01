import Dialog from '@orangehrm/oxd/core/components/Dialog/Dialog';
import DialogClose from './DialogClose.story.vue';
import DialogWithoutCloseStory from './DialogWithoutClose.story.vue';
import DialogPersistentStory from './DialogPersistent.story.vue';
import DialogDeleteConfirmationStory from './DialogDeleteConfirmation.story.vue';
import DialogWithoutTransition from './DialogWithoutTransition.story.vue';
import DialogSizeStory from './DialogSize.story.vue';

export default {
  title: 'Example/Dialog/Dialog',
  component: Dialog,
  args: {
    dialogContainer: 'oxd-dialog-container-default',
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-dialog': Dialog},
  template: `
  <p><b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting,
  remaining essentially unchanged.
  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

  <oxd-dialog v-bind="args">
    <p><b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    It has survived not only five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged.
    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </oxd-dialog>
  `,
});

export const Default = Template.bind({});
Default.args = {
  shadow: true,
  gutters: true,
  style: {maxWidth: '800px'},
};

export const Close = () => DialogClose;
Close.args = {};

export const Size = args => ({
  setup() {
    return {
      args: {
        dialogSizeClass: args.dialogSizeClass,
        withClose: args.withClose,
      },
    };
  },
  components: {DialogSizeStory},
  template: `<DialogSizeStory v-bind="args" />`,
});
Size.args = {
  dialogSizeClass: 'modal-sm',
  withClose: false,
};

export const WithoutTransition = () => DialogWithoutTransition;
WithoutTransition.args = {};

export const DialogWithoutClose = args => ({
  setup() {
    return {
      args: {
        withClose: args.withClose,
      },
    };
  },
  components: {DialogWithoutCloseStory},
  template: `<DialogWithoutCloseStory v-bind="args" />`,
});
DialogWithoutClose.args = {
  withClose: false,
};

export const Persistent = args => ({
  setup() {
    delete args.show;
    return {args};
  },
  components: {DialogPersistentStory},
  template: `<DialogPersistentStory v-bind="args" />`,
});
Persistent.args = {
  withClose: false,
  persistent: true,
};

export const DeleteConfirmation = () => ({
  components: {DialogDeleteConfirmationStory},
  template: `<DialogDeleteConfirmationStory />`,
});
DeleteConfirmation.args = {};
