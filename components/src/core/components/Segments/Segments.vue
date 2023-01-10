<script lang="ts">
import {defineComponent, h, PropType} from 'vue';
import {SEGMENT_DEFAULT} from './types';
import useTranslate from '../../../composables/useTranslate';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

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
      // eslint-disable-next-line
      type: Array as PropType<any>,
    },
    groupId: {
      type: [String, Number] as PropType<string | number>,
      default: 'segment-group-id',
    },
    modelValue: {
      // eslint-disable-next-line
      type: Object as PropType<any>,
      default: () => SEGMENT_DEFAULT,
    },
    disabled: {
      type: Boolean,
    },
  },

  components: {
    'oxd-icon': Icon,
  },

  methods: {
    cycleIndexes(currentValue: Options, array: Options[]) {
      const currentIndex = array.indexOf(currentValue);
      return array[(currentIndex + 1) % array.length];
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
        tabIndex: '0',
        onKeyup: ($event: KeyboardEvent) => {
          if ($event.key === 'Enter') {
            this.$emit(
              'update:modelValue',
              this.cycleIndexes(this.modelValue, this.options),
            );
          }
        },
        style: this.style,
      },
      // eslint-disable-next-line
      this.options.map((option: any, i: number) => {
        // eslint-disable-next-line
        const optionLabel: any = [$t(option.label)];
        if (option.icon) {
          const iconElement = h(Icon, {
            name: option.icon,
            size: option.iconSize,
          });
          optionLabel.unshift(iconElement);
        }
        const optionElemenets = [
          h(
            'label',
            {
              for: option.id,
              class: [
                'oxd-segment-label d-flex align-center',
                {
                  active: this.modelValue?.id === option.id,
                },
              ],
            },
            optionLabel,
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
        ];
        return h(
          'div',
          {
            id: inputId + '_' + i,
            class: ['oxd-segment-wrapper', 'd-flex', 'align-center'],
          },
          optionElemenets,
        );
      }),
    );
  },
});
</script>

<style src="./segments.scss" lang="scss" scoped></style>
