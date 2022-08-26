<template>
  <div class="oxd-radio-pill-wrapper">
    <label :class="labelClasses" :style="style">
      {{ $vt(label) }}
      <input
        type="radio"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        :name="name"
        v-bind="$attrs"
        v-model="checked"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :class="classes"
      />
    </label>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, toRefs} from 'vue';
import translateMixin from '@orangehrm/oxd/mixins/translate';

export interface State {
  focused: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkedProxy: any;
}

export default defineComponent({
  name: 'oxd-radio-pill',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    value: {
      type: String,
    },
    modelValue: {},
    style: {
      type: Object,
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
  },

  mixins: [translateMixin],

  emits: ['update:modelValue', 'blur', 'focus', 'change'],

  setup(props, context) {
    const state: State = reactive({
      focused: false,
      checkedProxy: {},
    });

    const checked = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        state.checkedProxy = value;
      },
    });

    const onFocus = (e: Event) => {
      state.focused = true;
      context.emit('focus', e);
    };

    const onBlur = (e: Event) => {
      state.focused = false;
      context.emit('blur', e);
    };

    const onChange = (e: Event) => {
      if (!props.readonly) {
        context.emit('update:modelValue', state.checkedProxy);
        context.emit('change', e);
      }
    };

    const classes = computed(() => {
      return {
        'oxd-radio-pill-input': true,
        'oxd-radio-pill-input--active': !state.focused,
        'oxd-radio-pill-input--focus': state.focused,
      };
    });

    const labelClasses = computed(() => {
      return {
        'oxd-radio-pill-input-label': true,
        '--checked': props.value === props.modelValue,
        '--disabled': props.disabled,
        '--readonly': props.readonly,
        '--focus': state.focused,
      };
    });

    return {
      ...toRefs(state),
      checked,
      onFocus,
      onBlur,
      onChange,
      classes,
      labelClasses,
    };
  },
});
</script>

<style src="./radio-pill.scss" lang="scss" scoped></style>
