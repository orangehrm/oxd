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

import {
  DROPDOWN_POSITIONS,
  BOTTOM,
  DROPDOWN_ALIGHMENT,
  RIGHT,
} from '@orangehrm/oxd/core/components/PopOverButton/types';

import icons from 'bootstrap-icons/font/bootstrap-icons.json';
import oxdIcons from '@orangehrm/oxd/core/components/Icon/icons';
import PopOverButtonTextOptionWithInitialValue from './PopOverButtonTextOptionWithInitialValue.story.vue';
import PopOverButtonTemplateOption from './PopOverButtonTemplateOption.story.vue';
import PopOverButtonLongTextOption from './PopOverButtonLongTextOption.story.vue';
import PopOverButtonTextOptionWithCustomLabel from './PopOverButtonTextOptionWithCustomLabel.story.vue';

const bootstrapIconsNames = Object.keys(icons);
const oxdIconsNames = Object.keys(oxdIcons);
const iconNames = [...bootstrapIconsNames, ...oxdIconsNames];

export default {
  title: 'Inputs/PopOverButton',
  component: PopOverButton,
  argTypes: {
    modelValue: {
      control: {type: 'object'},
      table: {
        type: {
          summary: 'Already selected value',
        },
      },
    },
    options: {
      control: {type: 'array'},
      table: {
        type: {
          summary: 'Array of options to be passed to the drop down content',
        },
      },
    },
    dropdownPosition: {
      control: {type: 'select', options: DROPDOWN_POSITIONS},
      defaultValue: BOTTOM,
      table: {
        type: {
          summary:
            'Position of the drop down, whether it should be appeared in top or bottom',
        },
      },
    },
    dropdownAlignment: {
      control: {type: 'select', options: DROPDOWN_ALIGHMENT},
      defaultValue: RIGHT,
      table: {
        type: {
          summary:
            'Alignment of the drop down, whether it is left, right or center',
        },
      },
    },
    customPopOverButtonLabel: {
      control: {type: 'text'},
      table: {
        type: {
          summary: 'Custom label for the button',
        },
      },
    },
    popOverButtonStyle: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Custom styles for the popover button'},
      },
    },
    dropDownStyle: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Custom styles for the dropdown'},
      },
    },
    dropdownArrow: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {summary: 'Whether to insert the pop over arrow or not'},
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
    'update:modelValue': {
      control: {type: 'object'},
      defaultValue: {},
      table: {
        type: {summary: 'emit event when selected value updates'},
      },
    },
    click: {
      control: {type: 'object'},
      defaultValue: {},
      table: {
        type: {
          summary:
            'emit event when click on the value of options dropdown. First parameter is the context and the second parameter is the object',
        },
      },
    },
    option: {
      control: {type: 'object'},
      defaultValue: [],
      table: {
        type: {summary: 'Should be passed as an array object'},
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-pop-over-button': PopOverButton},
  template: '<oxd-pop-over-button v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  customPopOverButtonLabel: 'Add Schedule',
  options: [
    {
      context: 'context_fixed',
      label: 'Fixed Schedule',
    },
    {
      context: 'context_daily',
      label: 'Flexible Schedule (Daily)',
    },
    {
      context: 'context_weekly',
      label: 'Flexible Schedule (Weekly)',
    },
  ],
};

export const WithTextOptionsWithInitialValue = () =>
  PopOverButtonTextOptionWithInitialValue;

WithTextOptionsWithInitialValue.parameters = {
  docs: {
    source: {
      code:
        '<template>' +
        '<p>option - {{ selectedOption }}</p>' +
        '<div class="story-container">' +
        '<oxd-pop-over-button' +
        'label="Add Schedule"' +
        'size="medium"' +
        'displayType="secondary"' +
        ':options="addScheduleOptions"' +
        ':modelValue="selectedOption"' +
        ':dropdownAlignment="center"' +
        '@update:modelValue="onSelectOption"' +
        '/>' +
        '</div>' +
        '</template>' +
        'File -> PopOverButtonTextOptionWithInitialValue.story.vue',
    },
  },
};

export const WithTextOptionWithCustomLabel = () =>
  PopOverButtonTextOptionWithCustomLabel;

WithTextOptionWithCustomLabel.parameters = {
  docs: {
    source: {
      code:
        '<template>' +
        '<p>option - {{ selectedOption }}</p>' +
        '<div class="story-container">' +
        '<oxd-pop-over-button' +
        'size="medium"' +
        'displayType="secondary"' +
        ':options="addScheduleOptions"' +
        ':modelValue="selectedOption"' +
        ':customPopOverButtonLabel="Add Schedule"' +
        ' @update:modelValue="onSelectOption"' +
        '/>' +
        '  </div>' +
        '</template>' +
        'File -> PopOverButtonTextOptionWithInitialValue.story.vue',
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
        'customPopOverButtonLabel="Add"' +
        ':options="addScheduleOptions"' +
        ':modelValue="selectedOption"' +
        '@update:modelValue="onSelectOption"' +
        '/>' +
        '</div>' +
        '</template>' +
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
        'customPopOverButtonLabel="Add"' +
        'size="medium"' +
        'displayType="secondary"' +
        'iconName="oxd-add"' +
        'iconSize="small"' +
        ':options="addScheduleOptions"' +
        ':dropdownAlignment = "RIGHT"' +
        ':modelValue="selectedOption"' +
        '@update:modelValue="onSelectOption"' +
        '>' +
        '<template v-slot:option="{data}">' +
        '<div class="d-flex justify-between align-center w-100">' +
        '<oxd-chip class="pop-over-chip" :label="data.context" />' +
        '<span v-html="data.label"></span>' +
        '</div>' +
        '</template>' +
        ' </oxd-pop-over-button>' +
        '</div>' +
        '</template>' +
        'File -> PopOverButtonTemplateOption.story.vue',
    },
  },
};
