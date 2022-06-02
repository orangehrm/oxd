import Overlay from '@orangehrm/oxd/core/components/Dialog/Overlay';

export default {
  title: 'PopUps/Dialog/Overlay',
  component: Overlay,
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-overlay': Overlay},
  template: `
  <p><b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting,
  remaining essentially unchanged.
  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  <oxd-overlay v-bind="args"><div :style="{padding:'10px',backgroundColor:'white'}">Hello World!!</div></oxd-overlay>
  `,
});

export const Default = Template.bind({});
Default.args = {
  show: true,
  centered: true,
};
