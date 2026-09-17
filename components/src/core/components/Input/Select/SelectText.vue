<template>
  <div
    :class="classes"
    :style="style"
    :tabindex="tabIndex"
    v-bind="$attrs"
    :role="popupRole ? 'combobox' : null"
    :aria-haspopup="popupRole"
    :aria-expanded="popupRole ? (dropdownOpened ? 'true' : 'false') : null"
    :aria-controls="popupRole && dropdownOpened ? listboxId : null"
    :aria-activedescendant="popupRole && dropdownOpened ? activeOptionId : null"
    @focus="onFocus"
    @blur="onBlur"
  >
    <!-- Inline label slot -->
    <div v-if="$slots.topOfInput" class="oxd-select-text--inline-label">
      <slot name="topOfInput"></slot>
    </div>

    <!-- Input content - aligns to bottom when inline label is present -->
    <div
      class="oxd-select-text-input"
      :class="{'oxd-select-text--has-inline-label': $slots.topOfInput}"
    >
      <div v-if="!value" class="select-placeholder">{{ $vt(placeholder) }}</div>
      <div v-else class="selected-content">{{ value }}</div>
      <input
        type="text"
        readonly="readonly"
        tabIndex="-1"
        aria-hidden="true"
        @blur="onBlur"
      />
    </div>

    <div class="oxd-select-text--after">
      <slot name="afterInput"></slot>
      <div
        class="oxd-select-text--arrow"
        :class="dropdownIconClasses"
        v-if="!disabled"
      >
        <oxd-icon
          :class="dropdownIconClasses"
          :size="dropdownIconSize"
          :name="dropdownIcon"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import eventsMixin from './events-mixin';
import navigationMixin from './navigation-mixin';
import translateMixin from '../../../../mixins/translate';

export default defineComponent({
  name: 'oxd-select-text',
  inheritAttrs: false,

  components: {
    'oxd-icon': Icon,
  },

  mixins: [navigationMixin, eventsMixin, translateMixin],

  emits: ['icon:clicked'],

  props: {
    dropdownOpened: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    style: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    downIcon: {
      type: String,
      default: 'caret-down-fill',
    },
    upIcon: {
      type: String,
      default: 'caret-up-fill',
    },
    dropdownIconSize: {
      type: String,
      default: 'medium',
    },
    // The readonly tabindex=-1 <input> in the template is kept for layout only
    // and is aria-hidden. It used to carry the id, so <label for> named an
    // element that can never be focused while the focusable div went unnamed -
    // the reader announced "text field read only" and no label. The id now
    // lives on the combobox div.
    //
    // id of the listbox this combobox controls, and of the option currently
    // highlighted inside it. Both have to be real ids or the reader cannot
    // follow arrow-key movement.
    // Opt-in. SelectText is shared by SelectInput, MultiSelectInput and
    // TreeSelect, and only a caller whose popup really is a listbox may say so.
    // TreeSelect's popup is a table of checkboxes, so it passes nothing and
    // stays a plain focusable div rather than promising semantics it does not
    // have. Set it to the popup's role ('listbox') to turn the pattern on.
    popupRole: {
      type: String,
      default: null,
    },
    listboxId: {
      type: String,
    },
    activeOptionId: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      focused: false,
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-select-text': true,
        'oxd-select-text--active': !this.focused,
        'oxd-select-text--focus': this.focused,
        'oxd-select-text--error': this.hasError,
        'oxd-select-text--disabled': this.disabled,
        'oxd-select-text--readonly': this.readonly,
      };
    },
    dropdownIcon(): string {
      return this.dropdownOpened ? this.upIcon : this.downIcon;
    },
    dropdownIconClasses(): object {
      return {
        '--disabled': this.disabled,
        '--readonly': this.readonly,
      };
    },
    tabIndex(): number {
      return this.disabled ? -1 : 0;
    },
  },

  methods: {
    onFocus($e: Event) {
      if (this.disabled) {
        $e.stopImmediatePropagation();
        return;
      }
      this.focused = true;
    },
    onBlur($e: Event) {
      $e.stopImmediatePropagation();
      this.focused = false;
      this.$emit('blur', $e);
    },
  },
});
</script>

<style src="./select-input.scss" lang="scss" scoped></style>
