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
}

export default defineComponent({
  name: 'oxd-checkbox-group',
  components: {
    CheckboxInput,
    InputGroup,
  },
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
  },
  data(): State {
    return {
      focused: false,
    };
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
        this.options.map((option: Options) => {
          return h(CheckboxInput, {
            id: inputId + '_' + option.id,
            value: option.id,
            optionLabel: $t(option.label),
            modelValue: this.modelValue,
            disabled: this.disabled ? 'true' : option.disabled,
            onFocus: () => {
              this.focused = true;
              this.$emit('focus', this.focused);
            },
            onBlur: () => {
              this.focused = false;
              this.$emit('blur', this.focused);
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
