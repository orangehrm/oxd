import PopOverButton from '@orangehrm/oxd/core/components/PopOverButton/PopOverButton.vue';
import {
  SIZES,
  TYPES,
  SIZE_MEDIUM,
  TYPE_MAIN,
} from '@orangehrm/oxd/core/components/Button/types';
import {
  ICON_SIZES,
  ICON_SIZE_MEDIUM,
} from '@orangehrm/oxd/core/components/Icon/types';
import icons from 'bootstrap-icons/font/bootstrap-icons.json';
import oxdIcons from '@orangehrm/oxd/core/components/Icon/icons';
import PopOverButtonTextOption from './PopOverButtonTextOption.story.vue';
import PopOverButtonTemplateOption from './PopOverButtonTemplateOption.story.vue';
import PopOverButtonLongTextOption from './PopOverButtonLongTextOption.story.vue';

const bootstrapIconsNames = Object.keys(icons);
const oxdIconsNames = Object.keys(oxdIcons);
const iconNames = [...bootstrapIconsNames, ...oxdIconsNames];

export default {
  title: 'Inputs/PopOverButton',
  component: PopOverButton,
  argTypes: {
    options: {
      control: {type: 'array'},
      table: {
        type: {
          summary: 'Array of options to be passed to the drop down content',
        },
      },
    },
    dropdownPosition: {
      control: {type: 'text'},
      table: {
        type: {
          summary:
            'Position of the drop down, whether it should be appeared in top or bottom',
        },
      },
    },
    dropDownStyle: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Custom styles for the dropdown'},
      },
    },
    size: {
      control: {type: 'select', options: SIZES},
      defaultValue: SIZE_MEDIUM,
      table: {
        type: {
          summary: 'Size of the button',
        },
      },
    },
    displayType: {
      control: {type: 'select', options: TYPES},
      defaultValue: TYPE_MAIN,
      table: {
        type: {
          summary: 'Display type of the button',
        },
      },
    },
    style: {
      control: {type: 'object'},
      table: {
        type: {
          summary: 'Styles fo the button',
        },
      },
    },
    disabled: {
      control: {type: 'boolean'},
      table: {
        type: {
          summary: 'Button is desaled or not',
        },
      },
    },
    iconName: {
      control: {type: 'select', options: iconNames},
      table: {
        type: {
          summary: 'Icon name for the button',
        },
      },
    },
    iconSize: {
      control: {type: 'select', options: ICON_SIZES},
      defaultValue: ICON_SIZE_MEDIUM,
      table: {
        type: {
          summary: 'Size of the button icon',
        },
      },
    },
    iconRightName: {
      control: {type: 'select', options: iconNames},
      table: {
        type: {
          summary: 'Button right icon name',
        },
      },
    },
    iconRightSize: {
      control: {type: 'select', options: ICON_SIZES},
      defaultValue: ICON_SIZE_MEDIUM,
      table: {
        type: {
          summary: 'Button right icon size',
        },
      },
    },
    tooltip: {
      control: {type: 'text'},
      table: {
        type: {
          summary: 'Tooltip for the button',
        },
      },
    },
  },
};

export const WithTextOptions = () => PopOverButtonTextOption;

WithTextOptions.parameters = {
  docs: {
    source: {
      code:
        '<template>' +
        '<p>{{ selectedOption }} selected</p>' +
        '<div class="story-container">' +
        '<oxd-pop-over-button' +
        'label="Add Schedule"' +
        'size="medium"' +
        'displayType="secondary"' +
        'iconName="oxd-add"' +
        'iconSize="small"' +
        ':options="addScheduleOptions"' +
        '@click="onSelectOption"' +
        '/>' +
        '</div>' +
        '</trmplate>' +
        'File -> PopOverButtonTextOption.story.vue',
    },
  },
};

export const WithLongTextOptions = () => PopOverButtonLongTextOption;

WithLongTextOptions.parameters = {
  docs: {
    source: {
      code:
        '<template>' +
        '<p>{{ selectedOption }} selected</p>' +
        '<div class="story-container">' +
        '<oxd-pop-over-button' +
        'label="Add Schedule"' +
        'size="medium"' +
        'displayType="secondary"' +
        'iconName="oxd-add"' +
        'iconSize="small"' +
        ':options="addScheduleOptions"' +
        '@click="onSelectOption"' +
        '/>' +
        '</div>' +
        '</trmplate>' +
        'File -> PopOverButtonLongTextOption.story.vue',
    },
  },
};

export const WithTemplateOptions = () => PopOverButtonTemplateOption;

WithTemplateOptions.parameters = {
  docs: {
    source: {
      code:
        '<template>' +
        '<p>{{ selectedOption }} selected</p>' +
        '<div class="story-container">' +
        '<oxd-pop-over-button' +
        'label="Add Schedule"' +
        'size="medium"' +
        'displayType="secondary"' +
        'iconName="oxd-add"' +
        'iconSize="small"' +
        ':options="addScheduleOptions"' +
        '@click="onSelectOption"' +
        '>' +
        '<template v-slot:option="{data}">' +
        '<div class="d-flex justify-between align-center w-100">' +
        '<oxd-chip class="pop-over-chip" :label="data.context" />' +
        '<span v-html="data.label"></span>' +
        '</div>' +
        '</template>' +
        '</oxd-pop-over-button>' +
        ' </div>' +
        '</template>' +
        'File -> PopOverButtonTemplateOption.story.vue',
    },
  },
};
