<script lang="ts">
import {defineComponent, h, PropType} from 'vue';
import {SEGMENT_DEFAULT} from './types';
import useTranslate from '../../../composables/useTranslate';

export interface State {
  focused: boolean;
}

export interface Options {
  id: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: Record<string, any>;
}

export default defineComponent({
  name: 'oxd-segments',
  emits: ['update:modelValue', 'blur', 'focus', 'change'],
  props: {
    id: {
      type: String,
      default: 'segment-id',
    },
    style: {
      type: Object,
    },

    options: {
      type: Array as PropType<any>,
    },
    groupId: {
      type: [String, Number] as PropType<string | number>,
      default: 'segment-group-id',
    },
    modelValue: {
      type: Object as PropType<any>,
      default: () => SEGMENT_DEFAULT,
    },
    disabled: {
      type: Boolean,
    },
  },

  render() {
    const {$t} = useTranslate();
    const inputId = this.id == '' ? 'segment-id' : this.id;
    return h(
      'div',
      {
        id: inputId,
        class: 'oxd-segments-wrapper',
        style: this.style,
      },
      this.options.map((option: any, i: number) => {
        return h(
          'div',
          {
            id: inputId + '_' + i,
            class: ['oxd-segment-wrapper', 'd-flex', 'align-center'],
          },
          [
            h(
              'label',
              {
                for: option.id,
                class: [
                  'oxd-segment-label',
                  {
                    active: this.modelValue?.id === option.id,
                  },
                ],
              },
              $t(option.label),
            ),
            h('input', {
              name: this.groupId,
              id: option.id,
              disabled: this.disabled ? 'true' : option.disabled,
              type: 'radio',
              class: 'oxd-segment-input',
              modelValue: this.modelValue,
              onChange: () => this.$emit('update:modelValue', option),
              onFocus: () => {
                this.$emit('focus', true);
              },
              onBlur: () => {
                this.$emit('blur', true);
              },
              onClick: () => {
                this.$emit('click', true);
              },
            }),
          ],
        );
      }),
    );
  },
});
</script>

<style src="./segments.scss" lang="scss" scoped></style>
