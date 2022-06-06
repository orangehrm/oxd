import {
  BOTTOM,
  DROPDOWN_POSITIONS,
} from '@orangehrm/oxd/core/components/Input/types';
import QuickSearchWidget from './QuickSearchInput.story.vue';

export default {
  title: 'Inputs/QuickSearch',
  component: QuickSearchWidget,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
    dropdownPosition: {
      options: DROPDOWN_POSITIONS,
      defaultValue: BOTTOM,
    },
    createOptions: {
      control: {type: 'function'},
      defaultValue: () => [],
    },
  },
};

export const Default = () => QuickSearchWidget;

QuickSearchInput.parameters = {
  docs: {
    source: {
      code:
        '<oxd-quick-search :createOptions="callAPI">\n' +
        ' <template v-slot:iconSlot>\n' +
        '  <oxd-icon-button name="oxd-search"></oxd-icon-button>\n' +
        ' </template>\n' +
        ' <template v-slot:option="{data}">\n' +
        ' <span\n' +
        'class="auto-complete-img"\n' +
        ' style=" display: inline-block;padding-right: 15px;"\n' +
        ' >\n' +
        '<img\n' +
        ':src="data.avatar_url"\n' +
        'style=" border-radius: 50%;height: auto;cursor: pointer;width: 2.5rem;max-height: 2.5rem;"\n' +
        '/>\n' +
        '</span>\n' +
        ' <span> {{ data.label }}</span>\n' +
        ' </template>\n' +
        ' </oxd-quick-search>\n' +
        '//\n' +
        'File -> QuickSearch.story.vue',
    },
  },
};
