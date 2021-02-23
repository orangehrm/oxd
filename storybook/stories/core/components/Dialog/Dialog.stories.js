import Dialog from '@orangehrm/oxd/core/components/Dialog/Dialog';
import DialogClose from './DialogClose.story.vue';
import DialogWithoutCloseStory from './DialogWithoutClose.story.vue';
import DialogPersistentStory from './DialogPersistent.story.vue';
import DialogDeleteConfirmationStory from './DialogDeleteConfirmation.story.vue';

export default {
  title: 'Example/Dialog/Dialog',
  component: Dialog,
};

const argTypes = {
  shadow: {control: {type: 'boolean'}},
  gutters: {control: {type: 'boolean'}},
  withClose: {control: {type: 'boolean'}},
  persistent: {control: {type: 'boolean'}},
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {'oxd-dialog': Dialog},
  template: `
  <p><b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting,
  remaining essentially unchanged.
  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

  <oxd-dialog v-bind="$props">
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
  show: true,
  shadow: true,
  gutters: true,
  style: {maxWidth: '800px'},
};

export const Close = () => DialogClose;
Close.args = {};

export const DialogWithoutClose = () => DialogWithoutCloseStory;
DialogWithoutClose.args = {
  withClose: false,
};
DialogWithoutClose.argTypes = argTypes;

export const Persistent = () => DialogPersistentStory;
Persistent.args = {
  withClose: false,
  persistent: true,
};
Persistent.argTypes = argTypes;

export const DeleteConfirmation = () => DialogDeleteConfirmationStory;
DeleteConfirmation.args = {};
