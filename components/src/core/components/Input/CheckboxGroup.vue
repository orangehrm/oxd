<script lang="ts">
import {defineComponent, h} from 'vue';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup.vue';
import useTranslate from '../../../composables/useTranslate';

export interface State {
  focused: boolean;
}

export interface Options {
  id: number;
  label: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: Record<string, any>;
  optionWrapperAdditionalClass?: string;
  optionInfoIcon?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  optionInfoIconStyle?: Record<string, any>;
  optionInfoIconSize?: string;
  optionInfoMessage?: string;
  optionInfoIconPosition?: string;
  labelPosition?: string;
  border?: boolean;
}

export default defineComponent({
  name: 'oxd-checkbox-group',
  components: {
    CheckboxInput,
    InputGroup,
  },

  emits: ['update:modelValue', 'blur', 'focus', 'change'],

  props: {
    id: {
      type: String,
      default: 'check-box-group-id',
    },
    class: {
      type: String,
      default: 'check-box-column',
    },
    style: {
      type: Object,
    },
    disabled: {
      type: Boolean,
    },
    options: {
      type: Array,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },

  render() {
    const inputId = this.id == '' ? 'check-box-group-id' : this.id;
    const inputClass = this.class == '' ? 'check-box-column' : this.class;
    const {$t} = useTranslate();
    return h(
      InputGroup,
      {
        classes: {
          wrapper: inputClass,
        },
        id: inputId,
        style: this.style,
      },
      [
        this.options.map((option: Options, index: number) => {
          return h(CheckboxInput, {
            id: inputId + '_' + option.id,
            value: option.id,
            style: option.style,
            autofocus: this.$attrs.autofocus && index === 0 ? true : false,
            optionLabel: $t(option.label),
            modelValue: this.modelValue,
            disabled: this.disabled ? 'true' : option.disabled,
            optionWrapperAdditionalClass: option.optionWrapperAdditionalClass,
            optionInfoIcon: option.optionInfoIcon,
            optionInfoIconStyle: option.optionInfoIconStyle,
            optionInfoIconSize: option.optionInfoIconSize,
            optionInfoMessage: option.optionInfoMessage,
            optionInfoIconPosition: option.optionInfoIconPosition,
            labelPosition: option.labelPosition,
            border: option.border,
            hasError: this.hasError,

            onFocus: () => {
              this.$emit('focus', true);
            },
            onBlur: () => {
              this.$emit('blur', true);
            },
            onClick: () => {
              this.$emit('click', true);
            },
            onChange: () => {
              let idArray: number[];
              if (this.modelValue.includes(option.id)) {
                idArray = [...this.modelValue].filter(
                  value => value !== option.id,
                );
              } else {
                idArray = [...this.modelValue, option.id];
              }
              this.$emit('update:modelValue', idArray.sort());
              this.$emit('change', true);
            },
          });
        }),
      ],
    );
  },
});
</script>

<style lang="scss" scoped>
:deep(.check-box-row) {
  display: flex;
  gap: 2rem;
}

:deep(.check-box-column) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
