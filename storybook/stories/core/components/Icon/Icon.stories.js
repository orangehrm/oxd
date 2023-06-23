import Icon from '@orangehrm/oxd/core/components/Icon/Icon';
import icons from 'bootstrap-icons/font/bootstrap-icons.json';
import {
  ICON_SIZES,
  ICON_SIZE_MEDIUM,
} from '@orangehrm/oxd/core/components/Icon/types';

import oxdIcons from '@orangehrm/oxd/core/components/Icon/icons'
import { ref } from 'vue'

const bootstrapIconsNames = Object.keys(icons)
const oxdIconsNames = Object.keys(oxdIcons)
const iconNames = [...bootstrapIconsNames, ...oxdIconsNames]

export default {
  title: 'Information/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: {type: 'select', options: iconNames},
    },
    size: {
      control: {type: 'select', options: ICON_SIZES},
      defaultValue: ICON_SIZE_MEDIUM,
    },
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-icon': Icon},
  template: '<oxd-icon v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  name: 'trash',
};

export const OhrmIcon = Template.bind({});
OhrmIcon.args = {
  name: 'oxd-archive',
};

const IconGalleryTemplate = () => ({
  setup() {
    return {oxdIconsNames};
  },
  components: {'oxd-icon': Icon},
  template: `<div class="icon-gallery">
    <div>Red icons are the ones supporting fill:currentColor;</div>
    <table>
      <thead>
      <tr><th>Icon Name</th><th>Icon</th></tr>
      </thead>
      <tbody>
      <tr v-for="(name) in oxdIconsNames">
        <td>{{ name }}</td><td><oxd-icon :name="name" size="extra-large" style="color:red;"></oxd-icon></td>
      </tr>
      </tbody>
    </table>
  </div>`,
});


export const IconGallery = IconGalleryTemplate.bind({});
