import {h, ref} from 'vue';
import {ru} from 'date-fns/locale';
import {getDaysInMonth} from 'date-fns';
import DateInput from '@orangehrm/oxd/core/components/Input/DateInput';
import buildLocale from '@orangehrm/oxd/utils/locale.ts';
import {convertPHPDateFormat} from '@orangehrm/oxd/utils/date.ts';
import DateInputEvents from './DateInputEvents.story.vue';

export default {
  title: 'Inputs/DateInput',
  component: DateInput,
  argTypes: {
    style: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set custom style to the select'},
      },
    },
    hasError: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set error state to the select'},
      },
    },
    min: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set minimum date can be selected'},
      },
    },
    max: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set maximum date can be selected'},
      },
    },
    ioformat: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set date value format to be saved'},
      },
    },
    displayFormat: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set date display format'},
      },
    },
    locale: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set localization for date'},
      },
    },
    firstDayOfWeek: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set first day to show as start date in calendar'},
      },
    },
    dayFormat: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set first day to show as start date in calendar'},
      },
    },
    monthFormat: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set first day to show as start date in calendar'},
      },
    },
    dayAttributes: {
      control: {type: 'array'},
      table: {
        type: {summary: 'Set day specific attributes in Calendar'},
      },
    },
    events: {
      control: {type: 'array'},
      table: {
        type: {summary: 'Set events on Calendar'},
      },
    },
    years: {
      control: {type: 'array'},
      table: {
        type: {summary: 'Set years for date calendar option for date'},
      },
    },
    months: {
      control: {type: 'array'},
      table: {
        type: {summary: 'Set months for date calendar option for date'},
      },
    },
    days: {
      control: {type: 'array'},
      table: {
        type: {summary: 'Set days for date calendar option for date'},
      },
    },
    blur: {
      control: {type: 'array'},
      table: {
        type: {summary: 'emit event when dateInput blur'},
      },
    },
    'dateselect:opened': {
      control: {type: 'array'},
      table: {
        type: {summary: 'emit event when dateInput opened'},
      },
    },
    'dateselect:closed': {
      control: {type: 'array'},
      table: {
        type: {summary: 'emit event when dateInput closed'},
      },
    },
    'update:modelValue': {
      control: {type: 'array'},
      table: {
        type: {summary: 'emit event when dateInput value updates'},
      },
    },
    selectMonth: {
      control: {type: 'array'},
      table: {
        type: {summary: 'emit event when select a month'},
      },
    },
    selectYear: {
      control: {type: 'array'},
      table: {
        type: {summary: 'emit event when select a year'},
      },
    },
    topOfInput: {
      control: {type: 'object'},
      defaultValue: [],
      table: {
        type: {summary: 'A slot which renders an inline label above the input'},
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    const selected = ref('2022-07-01');
    return {args, selected};
  },
  render() {
    return h('div', {}, [
      h(DateInput, {
        ...this.args,
        modelValue: this.selected,
        'onUpdate:modelValue': (value) => {
          this.selected = value;
        },
      }),
      h('br'),
      h(
        'p',
        {},
        `Display Format : ${args?.displayFormat} | In/Out Format : ${args?.ioformat}`,
      ),
      h('p', {}, `v-model : ${this.selected}`),
    ]);
  },
});

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  docs: {
    source: {
      code: '<oxd-date-input/>',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code: '<oxd-date-input :disabled="true"/>',
    },
  },
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readonly: true,
};

ReadOnly.parameters = {
  docs: {
    source: {
      code: '<oxd-date-input :readonly="true"/>',
    },
  },
};

export const DateFormatting = Template.bind({});
DateFormatting.args = {
  firstDayOfWeek: 0,
  monthFormat: 'wide',
  dayFormat: 'narrow',
  displayFormat: 'MM/dd/yyyy',
  ioformat: 'yyyy-MM-dd',
  locale: ru,
};

DateFormatting.parameters = {
  docs: {
    source: {
      code: '<oxd-date-input :firstDayOfWeek="0" :monthFormat="wide":dayFormat="narrow" :displayFormat="MM/dd/yyyy" :ioformat="yyyy-MM-dd" :locale="ru"/>',
    },
  },
};

export const DateLocalization = Template.bind({});
DateLocalization.args = {
  firstDayOfWeek: 0,
  monthFormat: 'wide',
  dayFormat: 'narrow',
  displayFormat: convertPHPDateFormat('l, d-M-Y'),
  ioformat: 'yyyy-MM-dd',
  locale: buildLocale({
    months: {
      wide: [
        'ජනවාරි',
        'පෙබරවාරි',
        'මාර්තු',
        'අප්‍රේල්',
        'මැයි',
        'ජූනි',
        'ජූලි',
        'අගෝස්තු',
        'සැප්තැම්බර්',
        'ඔක්තෝබර්',
        'නොවැම්බර්',
        'දෙසැම්බර්',
      ],
      abbreviated: [
        'ජන',
        'පෙබ',
        'මාර්තු',
        'අප්‍රේල්',
        'මැයි',
        'ජූනි',
        'ජූලි',
        'අගෝ',
        'සැප්',
        'ඔක්',
        'නොවැ',
        'දෙසැ',
      ],
    },
    days: {
      narrow: ['ඉ', 'ස', 'අ', 'බ', 'බ්‍ර', 'සි', 'සෙ'],
      wide: [
        'ඉරිදා',
        'සඳුදා',
        'අඟහරුවාදා',
        'බදාදා',
        'බ්‍රහස්පතින්දා',
        'සිකුරාදා',
        'සෙනසුරාදා',
      ],
    },
  }),
};

DateLocalization.parameters = {
  docs: {
    source: {
      code: '<oxd-date-input :firstDayOfWeek="1" :monthFormat="wide":dayFormat="narrow" :displayFormat="convertPHPDateFormat(l, d-M-Y)" :ioformat="yyyy-MM-dd" :locale="buildLocale()"/>',
    },
  },
};

export const Min = Template.bind({});
Min.args = {
  min: new Date(),
};

Min.parameters = {
  docs: {
    source: {
      code: '<oxd-date-input :min="new Date()"/>',
    },
  },
};

export const Max = Template.bind({});
Max.args = {
  max: new Date('2022-07-10'),
};

Max.parameters = {
  docs: {
    source: {
      code: `<oxd-date-input :max="new Date('2022-07-30')"/>`,
    },
  },
};

export const Weekends = Template.bind({});
Weekends.args = {
  dayAttributes: [
    {
      index: 0,
      class: '--non-working-day',
      style: {},
    },
    {
      index: 6,
      class: '--non-working-day',
      style: {},
    },
  ],
};

Weekends.parameters = {
  docs: {
    source: {
      code: `<oxd-date-input :dayAttributes=" [
        {
          index: 0,
          class: '--non-working-day',
          style: {},
        },
        {
          index: 6,
          class: '--non-working-day',
          style: {},
        },
      ]"/>`,
    },
  },
};

export const Events = () => DateInputEvents;

Events.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-date-input \n' +
        '@focus="onFocus()"\n' +
        '@click="onClick()"\n' +
        ' @dateselect:opened="onDateOpen()"\n' +
        '@dateselect:closed="onDateClosed()"\n' +
        '@blur="onDropDownBlur()"\n' +
        '@dropdown:clear="onDropDownClear()"\n' +
        'v-model="value""\n' +
        ' @update:modelValue="updatedValue(event)' +
        '@selectMonth="onSelectMonth()"\n' +
        '@selectYear="onSelectYear()"\n' +
        '/>\n' +
        '</div>\n' +
        '<div style="margin-top: 2rem">\n' +
        '<span v-if="FocusEvent">Focus Event Triggered</span>\n' +
        '<span v-if="ClickEvent">Click Event Triggered</span>\n' +
        ' <span v-if="DateOpen">Date opened Event Triggered</span>\n' +
        '<span v-if="DateClosed">Date close Event Triggered</span>\n' +
        '<span v-if="DropDownBlur">DropDownBlur Event Triggered</span>\n' +
        '<span v-if="SelectMonth">Select Month Event Triggered</span>\n' +
        '<span v-if="SelectYear">Select Year Event Triggered</span>\n' +
        '</div>\n' +
        '<div>\n' +
        '<span v-if="value">Value Selected : {{ value }}</span>\n' +
        '</div>\n' +
        '//\n' +
        'File -> DateInputEvents.story.vue',
    },
  },
};


// Helper function to get dates for current month (same as Calendar.stories.js)
const datesOfMonth = () => {
  const today = new Date();
  return new Array(getDaysInMonth(today)).fill('').map((...[, index]) => {
    return new Date(today.getFullYear(), today.getMonth(), ++index);
  });
};

export const BlackoutEvents = (args) => ({
  setup() {
    const selected = ref(new Date());
    return {args, selected};
  },
  render() {
    return h('div', {}, [
      h(DateInput, {
        ...this.args,
        modelValue: this.selected,
        'onUpdate:modelValue': (value) => {
          this.selected = value;
        },
      }),
      h('br'),
      h('p', {}, `v-model : ${this.selected}`),
    ]);
  },
});

BlackoutEvents.args = {
  events: datesOfMonth().map(date => {
    const day = date.getDate();
    
    // Strict blackout dates (Complete Holidays/Closures)
    if (day === 8) {
      return {
        date,
        type: 'strict-blackout',
        class: '--strict-blackout',
        tooltip: 'System Maintenance\nNo bookings allowed',
        tooltipPosition: 'top'
      };
    }
    
    if (day === 15) {
      return {
        date,
        type: 'strict-blackout',
        class: '--strict-blackout',
        tooltip: 'Public Holiday - Office Closed',
        tooltipPosition: 'top'
      };
    }
    
    // Warning blackout dates (Limited Service Days)
    if (day === 14) {
      return {
        date,
        type: 'warning-blackout',
        class: '--warning-blackout',
        tooltip: 'Limited Availability\nSome services may be affected',
        tooltipPosition: 'bottom'
      };
    }
    
    if (day === 16) {
      return {
        date,
        type: 'warning-blackout',
        class: '--warning-blackout',
        tooltip: 'Limited Availability\nSome services may be affected',
        tooltipPosition: 'bottom'
      };
    }
    
    if (day === 20) {
      return {
        date,
        type: 'warning-blackout',
        class: '--warning-blackout',
        tooltip: 'Training Day - Slower Response Time',
        tooltipPosition: 'bottom'
      };
    }

    if (day === 26) {
      return {
        date,
        type: 'strict-blackout',
        class: '--strict-blackout-disabled',
        tooltip: 'Christmas Day - Office Closed',
      };
    }
    
    
    // Regular dates
    return {date};
  })
};

BlackoutEvents.parameters = {
  docs: {
    source: {
      code: `<oxd-date-input 
  :events="datesOfMonth().map(date => {
    const day = date.getDate();
    
    // Strict blackout dates (Complete Holidays/Closures)
    if (day === 8) {
      return {
        date,
        type: 'strict-blackout',
        class: '--strict-blackout',
        tooltip: 'System Maintenance\\nNo bookings allowed',
        tooltipPosition: 'top'
      };
    }
    
    if (day === 15) {
      return {
        date,
        type: 'strict-blackout',
        class: '--strict-blackout',
        tooltip: 'Public Holiday - Office Closed',
        tooltipPosition: 'top'
      };
    }
    
    // Warning blackout dates (Limited Service Days)
    if (day === 14) {
      return {
        date,
        type: 'warning-blackout',
        class: '--warning-blackout',
        tooltip: 'Limited Availability\\nSome services may be affected',
        tooltipPosition: 'bottom'
      };
    }
    
    if (day === 16) {
      return {
        date,
        type: 'warning-blackout',
        class: '--warning-blackout',
        tooltip: 'Limited Availability\\nSome services may be affected',
        tooltipPosition: 'bottom'
      };
    }
    
    if (day === 20) {
      return {
        date,
        type: 'warning-blackout',
        class: '--warning-blackout',
        tooltip: 'Training Day - Slower Response Time',
        tooltipPosition: 'bottom'
      };
    }
    if (day === 26) {
      return {
        date,
        type: 'strict-blackout',
        class: '--strict-blackout-disabled',
        tooltip: 'Christmas Day - Office Closed',
      };
    }
    
    // Regular dates
    return {date};
  })"
/>`,
    },
  },
};

export const WithInlineLabel = (args) => ({
  setup() {
    const selected = ref('2022-07-01');
    return {args, selected};
  },
  render() {
    return h('div', {}, [
      h(DateInput, {
        ...this.args,
        modelValue: this.selected,
        'onUpdate:modelValue': (value) => {
          this.selected = value;
        },
      }, {
        topOfInput: () => h('span', {style: 'font-size: 12px; color: #666;'}, 'Date of Birth'),
      }),
      h('br'),
      h('p', {}, `v-model : ${this.selected}`),
    ]);
  },
});

WithInlineLabel.args = {};

WithInlineLabel.parameters = {
  docs: {
    source: {
      code:
        '<oxd-date-input>\n' +
        '  <template v-slot:topOfInput>\n' +
        '    <span>Date of Birth</span>\n' +
        '  </template>\n' +
        '</oxd-date-input>',
    },
  },
};
