<template>
  <div :class="rootClasses">
    <slot name="label">
      <div class="oxd-input-group__label-wrapper">
        <oxd-icon
          v-if="labelIcon"
          :name="labelIcon"
          class="oxd-input-group__label-icon"
        />
        <oxd-label
          v-if="label"
          :id="id"
          :labelId="labelId"
          :label="label"
          :clickTarget="labelClickTarget"
          :aria-hidden="labelHidden ? 'true' : null"
          :class="labelClasses"
        />
        <oxd-text
          v-if="hint && hintPlacement === HINT_PLACEMENT_TOP"
          :id="hintId"
          class="oxd-input-field-hint placement-top"
          :style="hintStyle"
          tag="p"
        >
          {{ '(' + hint + ')' }}
        </oxd-text>
      </div>
    </slot>
    <div :class="wrapperClasses">
      <slot></slot>
    </div>
    <slot name="message">
      <oxd-text
        v-if="messageId || message"
        :id="messageId"
        :role="messageId ? 'status' : null"
        :class="messageClasses"
        tag="span"
      >
        {{ message }}
      </oxd-text>
    </slot>
    <oxd-text
      v-if="hint && hintPlacement === HINT_PLACEMENT_BOTTOM"
      :id="hintId"
      class="oxd-input-field-hint placement-bottom"
      :style="hintStyle"
      tag="p"
    >
      {{ hint }}
    </oxd-text>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Label from '@orangehrm/oxd/core/components/Label/Label.vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import {HINT_PLACEMENT_TOP, HINT_PLACEMENT_BOTTOM} from './types';

export default defineComponent({
  name: 'oxd-input-group',

  components: {
    'oxd-label': Label,
    'oxd-text': Text,
    'oxd-icon': Icon,
  },

  data() {
    return {
      HINT_PLACEMENT_TOP: HINT_PLACEMENT_TOP,
      HINT_PLACEMENT_BOTTOM: HINT_PLACEMENT_BOTTOM,
    };
  },

  props: {
    label: {
      type: String,
    },
    labelIcon: {
      type: String,
    },
    hint: {
      type: String,
      default: null,
    },
    hintPlacement: {
      type: String,
      default: HINT_PLACEMENT_TOP,
    },
    hintStyle: {
      type: Object,
      default: () => ({}),
    },
    message: {
      type: String,
    },
    id: {
      type: String,
    },
    labelId: {
      type: String,
    },
    // Hides the label ELEMENT from assistive tech while leaving it on screen.
    // Only for a control the screen reader would otherwise announce twice -
    // see `isFile` in InputField.vue. The control must then name itself with
    // aria-labelledby pointing back here: accname keeps a node that is
    // DIRECTLY referenced by aria-labelledby even when it is aria-hidden, so
    // the name survives. Without that reference this silently unnames the
    // control in engines that honour aria-hidden during name computation.
    labelHidden: {
      type: Boolean,
      default: false,
    },
    // See Label.vue's clickTarget - for a control that `for` cannot address.
    labelClickTarget: {
      type: String,
    },
    // Supplying this turns the message into a live region: the span is then
    // rendered even when empty, because a live region has to be in the
    // accessibility tree before its content changes or the change goes
    // unannounced - which is exactly what `v-if="message"` prevented. The
    // `:empty` rule in input-group.scss keeps the empty span from taking up
    // space; `display: none` would drop it from the tree again.
    //
    // Left out, the span stays conditional and silent. RadioGroup and
    // CheckboxGroup nest an InputGroup purely for layout, and they must not
    // end up with a second, permanently empty live region inside the real one.
    messageId: {
      type: String,
    },
    // The hint carries instructions - accepted file types, a size cap, a
    // required format. Without an id nothing can reference it, so it sat in
    // the tree as a loose paragraph that a reader tabbing between fields never
    // reaches. Only one of the two placements renders, so they can share it.
    hintId: {
      type: String,
    },
    classes: {
      type: Object,
      default: () => {
        return {
          label: {},
          message: {},
          wrapper: {},
        };
      },
    },
  },

  computed: {
    rootClasses(): object {
      return {
        'oxd-input-group': true,
      };
    },
    labelClasses(): object {
      return {
        ...this.classes.label,
      };
    },
    messageClasses(): object {
      return {
        ...this.classes.message,
        'oxd-input-group__message': true,
      };
    },
    wrapperClasses(): object {
      const {wrapper} = this.classes;
      return wrapper ? wrapper : {};
    },
  },
});
</script>

<style src="./input-group.scss" lang="scss" scoped></style>
