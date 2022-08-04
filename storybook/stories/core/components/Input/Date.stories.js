import {h, ref} from 'vue';
import {ru} from 'date-fns/locale';
import DateInput from '@orangehrm/oxd/core/components/Input/DateInput';
import buildLocale from '@orangehrm/oxd/utils/locale.ts';
import {convertPHPDateFormat} from '@orangehrm/oxd/utils/date.ts';

export default {
  title: 'Inputs/DateInput',
  component: DateInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = args => ({
  setup() {
    const selected = ref('2021-07-01');
    return {args, selected};
  },
  render() {
    return h('div', {}, [
      h(DateInput, {
        ...this.args,
        modelValue: this.selected,
        'onUpdate:modelValue': value => {
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

export const DateFormatting = Template.bind({});
DateFormatting.args = {
  firstDayOfWeek: 0,
  monthFormat: 'wide',
  dayFormat: 'narrow',
  displayFormat: 'MM/dd/yyyy',
  ioformat: 'yyyy-MM-dd',
  locale: ru,
};

export const DateLocalization = Template.bind({});
DateLocalization.args = {
  firstDayOfWeek: 1,
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
