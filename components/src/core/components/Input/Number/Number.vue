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
      type: Number as PropType<number | undefined>,
    },
    defaultValue: {
      type: Number as PropType<number | undefined>,
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
    required: {
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
    const number = ref<number | null | undefined>(props.modelValue);
    const outerClasses = computed((): object => {
      return {
        'oxd-number-input-wrapper d-flex justify-between align-center': true,
        'input-outer': true,
        'input-outer--active': !focused.value,
        'input-outer--focus': focused.value,
        'input-outer--error': props.hasError,
      };
    });
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
              if (!(number.value === undefined || number.value === null)) {
                if (number.value <= props.min) return true;
                number.value--;
              } else {
                number.value = 0;
              }
              emit('update:modelValue', number.value);
            },
          }),
          h('input', {
            id: props.id,
            disabled: props.disabled,
            readonly: props.readonly,
            type: 'number',
            class: 'oxd-number-input',
            value: number.value,
            min: props.min,
            max: props.max,
            onFocus: ($event: Event) => {
              focused.value = true;
              emit('focus', $event);
            },
            onBlur: ($event: Event) => {
              focused.value = false;
              emit('blur', $event);
            },
            onChange: ($event: any) => {
              const value:
                | number
                | string
                | null = ($event.target as HTMLInputElement).value;
              if (value) {
                number.value = Number(value);
                if (!(number.value === undefined || number.value === null)) {
                  if (number.value <= props.min) {
                    number.value = props.min;
                  }
                  if (number.value >= props.max) {
                    number.value = props.max;
                  }
                }
              } else {
                if (props.required) {
                  number.value = props.defaultValue;
                } else {
                  number.value = null;
                }
              }
              emit('update:modelValue', number.value);
            },
          }),
          h(Icon, {
            name: 'oxd-add',
            size: 'xx-small',
            class: 'number-max-btn',
            disabled: props.disabled || props.readonly,
            onClick: () => {
              if (number.value) {
                if (number.value >= props.max) return true;
                number.value++;
              } else {
                number.value = 1;
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
