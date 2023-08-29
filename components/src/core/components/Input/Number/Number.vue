<script lang="ts">
import {computed, defineComponent, h, PropType, ref, watch} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Button/Icon.vue';
import {nanoid} from 'nanoid';

export default defineComponent({
  name: 'oxd-number-input',
  emits: ['update:modelValue', 'blur', 'focus'],
  props: {
    id: {
      type: String as PropType<string>,
      default: `oxd-number-input-${nanoid(4)}`,
    },
    style: {
      type: Object,
      default: () => ({
        'min-width': '100px',
      }),
    },
    modelValue: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number as PropType<number>,
      default: 0,
    },
    max: {
      type: Number as PropType<number>,
      default: 999,
    },
  },
  setup(props, {emit}) {
    const focused = ref(false);
    const number = ref<number | string | undefined>(props.modelValue);
    const outerClasses = computed((): object => {
      return {
        'oxd-number-input-wrapper d-flex justify-between align-center': true,
        'input-outer': true,
        'input-outer--active': !focused.value,
        'input-outer--focus': focused.value,
        'input-outer--error': props.hasError,
      };
    });
    const getValidatedValue = (value: string) => {
      if (props.min < 0) {
        const matchingNumber = value.match(/[-]?\d*/);
        return matchingNumber ? matchingNumber[0] : '';
      }
      const matchingNumber = value.match(/\d+/);
      return matchingNumber ? matchingNumber[0] : '';
    };

    const getModifiedValue = (value: number) => {
      let modifiedValue = value;
      if (props.min > value) {
        modifiedValue = props.min;
      }
      if (props.max < value) {
        modifiedValue = props.max;
      }
      return modifiedValue;
    };
    watch(
      () => props.modelValue,
      value => {
        number.value = value;
      },
    );
    return () =>
      h(
        'div',
        {
          class: outerClasses.value,
          style: props.style,
        },
        [
          h(Icon, {
            name: 'oxd-minus',
            size: 'xx-small',
            class: 'number-min-btn',
            disabled: props.disabled || props.readonly,
            onClick: () => {
              if (
                !(
                  number.value === undefined ||
                  number.value === null ||
                  number.value === ''
                )
              ) {
                number.value = Number(number.value);
                if (!Number.isNaN(number.value)) {
                  number.value = getModifiedValue(number.value - 1);
                }
              } else {
                number.value = props.min;
              }
              emit('update:modelValue', number.value);
            },
          }),
          h('input', {
            id: props.id,
            disabled: props.disabled,
            readonly: props.readonly,
            class: 'oxd-number-input',
            value: number.value,
            onFocus: ($event: Event) => {
              focused.value = true;
              emit('focus', $event);
            },
            onBlur: ($event: Event) => {
              focused.value = false;
              emit('blur', $event);
            },
            onInput: ($event: Event) => {
              const value: string = getValidatedValue(
                ($event.target as HTMLInputElement).value,
              );
              ($event.target as HTMLInputElement).value = value;
              number.value = value;
              emit('update:modelValue', number.value);
            },
          }),
          h(Icon, {
            name: 'oxd-add',
            size: 'xx-small',
            class: 'number-max-btn',
            disabled: props.disabled || props.readonly,
            onClick: () => {
              if (
                !(
                  number.value === undefined ||
                  number.value === null ||
                  number.value === ''
                )
              ) {
                number.value = Number(number.value);
                if (!Number.isNaN(number.value)) {
                  number.value = getModifiedValue(number.value + 1);
                }
              } else {
                number.value = props.min;
              }
              emit('update:modelValue', number.value);
            },
          }),
        ],
      );
  },
});
</script>

<style src="./number.scss" lang="scss" scoped></style>
