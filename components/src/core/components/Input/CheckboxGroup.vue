<script lang="ts">
import {defineComponent, h, PropType} from 'vue';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup.vue';
import useTranslate from '../../../composables/useTranslate';

export interface State {
  focused: boolean;
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
    },
    class: {
      type: String,
      default: 'check-box-column',
    },
    style: {
      type: Object,
    },
    options: {
      type: Array as PropType<any>,
    },
    modelValue: {
      type: Array as PropType<any>,
      default: () => [],
    },
  },
  data(): State {
    return {
      focused: false,
    };
  },
  render() {
    const inputId = this.id == undefined ? 'check-box-group-id' : this.id;
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
        disabled: true,
      },
      [
        this.options.map((option: any, i: number) => {
          return h(CheckboxInput, {
            id: inputId + '_' + option.id,
            value: option.id,
            optionLabel: $t(option.label),
            modelValue: this.modelValue,
            disabled: option.disabled,
            focus: this.focus,
            blur: this.focus,
            onFocus: () => {
              this.focused = true;
              this.$emit('focus', this.focused);
            },
            onBlur: () => {
              this.focused = false;
              this.$emit('blur', this.focused);
            },
            onChange: () => {
              if (this.modelValue.includes(option.id)) {
                for (var val in this.modelValue) {
                  if (this.modelValue[val] == option.id) {
                    delete this.modelValue[val];
                  }
                }
              } else {
                this.modelValue.push(option.id);
              }
              this.$emit(
                'update:modelValue',
                this.modelValue.filter((id: Number) => id).sort(),
              );
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
