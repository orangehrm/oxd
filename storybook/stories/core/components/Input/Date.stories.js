import {h, ref} from 'vue';
import {ru} from 'date-fns/locale';
import DateInput from '@orangehrm/oxd/core/components/Input/DateInput';

export default {
  title: 'Example/DateInput',
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
