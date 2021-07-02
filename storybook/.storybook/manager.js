import {addons} from '@storybook/addons';
import {create} from '@storybook/theming';

const orangehrmTheme = create({
  base: 'light',
  brandTitle: 'OXD Storybook',
  brandUrl: 'https://www.orangehrm.com',
  brandImage:
    'https://www.orangehrm.com/themes/orangehrm-modern/static/images/logo.png',
});

addons.setConfig({
  theme: orangehrmTheme,
});
