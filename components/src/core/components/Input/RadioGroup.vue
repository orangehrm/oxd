<script lang="ts">
import {defineComponent, h} from 'vue';
import RadioInput from '@orangehrm/oxd/core/components/Input/RadioInput.vue';
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
}

export default defineComponent({
  name: 'oxd-radio-group',
  components: {
    RadioInput,
    InputGroup,
  },

  emits: ['update:modelValue', 'blur', 'focus', 'change'],

  props: {
    id: {
      type: String,
      default: 'radio-group-id',
    },
    class: {
      type: String,
      default: 'radio-column',
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
      type: String,
    },
  },

  render() {
    const inputId = this.id == '' ? 'radio-group-id' : this.id;
    const inputClass = this.class == '' ? 'radio-column' : this.class;
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
          return h(RadioInput, {
            id: inputId + '_' + option.id,
            style: option.style,
            autofocus: this.$attrs.autofocus && index === 0 ? true : false,
            optionLabel: $t(option.label),
            value: option.id,
            modelValue: this.modelValue,
            disabled: this.disabled ? 'true' : option.disabled,
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
              this.$emit('update:modelValue', option.id);
            },
          });
        }),
      ],
    );
  },
});
</script>

<style lang="scss" scoped>
:deep(.radio-row) {
  display: flex;
  gap: 2rem;
}

:deep(.radio-column) {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
