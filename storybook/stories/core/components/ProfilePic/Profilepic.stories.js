import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic';

export default {
  title: 'Example/ProfilePic',
  component: ProfilePic,
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-profile-pic': ProfilePic},
  template: '<oxd-profile-pic v-bind="args" />',
});

export const Image = Template.bind({});
const defaultPic = require('@orangehrm/oxd/assets/images/user-default-400.png');
Image.args = {
  imageUrl: defaultPic,
};
