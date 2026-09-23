<template>
  <oxd-input-group
    :label="label"
    :labelIcon="labelIcon"
    :hint="hint"
    :hintPlacement="hintPlacement"
    :hintStyle="hintStyle"
    :id="labelFor"
    :labelId="labelId"
    :message="message"
    :messageId="messageId"
    :hintId="hintId"
    :labelHidden="isFile"
    :labelClickTarget="labelClickTarget"
    class="oxd-input-field-bottom-space"
    :classes="classes"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <component
      :is="component"
      v-bind="$attrs"
      :id="resolvedId"
      :role="isGroup ? 'group' : null"
      :aria-labelledby="labelledBy"
      :aria-invalid="hasError || null"
      :aria-describedby="describedBy"
      :disabled="disabled"
      :hasError="hasError"
      :modelValue="modelValue"
      @update:modelValue="onChange"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </component>
    <span :id="descriptionId" class="oxd-input-field-description" hidden>
      {{ describedMessage }}
    </span>
  </oxd-input-group>
</template>

<script lang="ts">
import {toRef, ref, watch, PropType, nextTick, defineComponent} from 'vue';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup.vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import FileInput from '@orangehrm/oxd/core/components/Input/FileInput.vue';
import Textarea from '@orangehrm/oxd/core/components/Textarea/Textarea.vue';
import PasswordInput from '@orangehrm/oxd/core/components/Input/PasswordInput.vue';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';
import SwitchInput from '@orangehrm/oxd/core/components/Input/SwitchInput.vue';
import RadioInput from '@orangehrm/oxd/core/components/Input/RadioInput.vue';
import DateInput from '@orangehrm/oxd/core/components/Input/DateInput.vue';
import AutocompleteInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteInput.vue';
import QuickSearchInput from '@orangehrm/oxd/core/components/Input/Autocomplete/QuickSearchInput.vue';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';
import MultiSelectInput from '@orangehrm/oxd/core/components/Input/MultiSelect/MultiSelectInput.vue';
import TimeInput from '@orangehrm/oxd/core/components/Input/Time/TimeInput.vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import InfoBox from '@orangehrm/oxd/core/components/InfoBox/InfoBox.vue';
import Comments from '@orangehrm/oxd/core/components/Comments/Comments.vue';
import TinyMce from '@orangehrm/oxd/core/components/TinyMce/TinyMce.vue';
import {
  Types,
  Components,
  TYPES,
  TYPE_INPUT,
  TYPE_MAP,
  GROUP_TYPES,
  TYPE_SELECT,
  TYPE_MULTISELECT,
  TYPE_TREE_SELECT,
  TYPE_FILE_INPUT,
  HINT_PLACEMENT_TOP,
} from './types';
import useField from '../../../composables/useField';
import translateMixin from '../../../mixins/translate';
import {uuid} from '../../../mixins/uuid';
import CheckboxGroup from '@orangehrm/oxd/core/components/Input/CheckboxGroup.vue';
import RadioPillGroup from '@orangehrm/oxd/core/components/Input/RadioPills/RadioPillGroup.vue';
import TreeSelectInput from '@orangehrm/oxd/core/components/Input/TreeSelect/TreeSelect.vue';
import RadioGroup from '@orangehrm/oxd/core/components/Input/RadioGroup.vue';
import Number from '@orangehrm/oxd/core/components/Input/Number/Number.vue';

export default defineComponent({
  name: 'oxd-input-field',
  inheritAttrs: false,

  components: {
    'oxd-input-group': InputGroup,
    'oxd-input': Input,
    'oxd-file-input': FileInput,
    'oxd-textarea': Textarea,
    'oxd-password-input': PasswordInput,
    'oxd-checkbox-input': CheckboxInput,
    'oxd-switch-input': SwitchInput,
    'oxd-radio-input': RadioInput,
    'oxd-date-input': DateInput,
    'oxd-autocomplete-input': AutocompleteInput,
    'oxd-select-input': SelectInput,
    'oxd-multiselect-input': MultiSelectInput,
    'oxd-time-input': TimeInput,
    'oxd-text': Text,
    'oxd-checkboxgroup-input': CheckboxGroup,
    'oxd-infobox': InfoBox,
    'oxd-quicksearch-input': QuickSearchInput,
    'oxd-comments': Comments,
    'oxd-radio-pill-group': RadioPillGroup,
    'oxd-tree-select-input': TreeSelectInput,
    'oxd-radiogroup-input': RadioGroup,
    'oxd-tinymce': TinyMce,
    'oxd-number-input': Number,
  },

  mixins: [translateMixin, uuid],
  emits: ['update:modelValue'],

  props: {
    modelValue: {},
    snapshotFunction: {},
    label: {
      type: String,
    },
    labelIcon: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
    },
    modelName: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: TYPE_INPUT,
      validator: (value: Types) => {
        return TYPES.indexOf(value) !== -1;
      },
    },
    errors: {
      type: String,
      default: TYPE_INPUT,
      validator: (value: Types) => {
        return TYPES.indexOf(value) !== -1;
      },
    },
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Array as PropType<any>,
      default: () => [],
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
    dirty: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, context) {
    const modelValue = toRef(props, 'modelValue');
    const rules = toRef(props, 'rules');
    const isDisabled = toRef(props, 'disabled');
    const isDirty: boolean =
      props.dirty || Boolean(props.type === 'date' && modelValue.value);

    const initialValue = modelValue.value;

    const onReset = async () => {
      context.emit('update:modelValue', initialValue);
      await nextTick();
    };

    const {hasError, message, startWatcher, dirty} = useField({
      fieldLabel: props.label ? props.label : '',
      modelName: props.modelName ? props.modelName : '',
      rules,
      modelValue,
      isDisabled,
      isDirty,
      onReset,
      getSnapshot: props.snapshotFunction,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = ($event: any) => {
      if (!dirty.value) {
        dirty.value = true;
        startWatcher();
      }
      context.emit('update:modelValue', $event);
    };

    if (isDirty) startWatcher();

    // The description a screen reader reads for the control is a COPY of the
    // message that only catches up while the control is not focused. Errors
    // appear as the user types, i.e. on the focused control; if its
    // description changed then, Orca spoke it (accessible-description
    // changed) AND the role="status" region spoke it again. Freezing the copy
    // leaves the live region as the one announcement, and the copy is current
    // again by the time the user comes back to the field.
    const focused = ref(false);
    const describedMessage = ref(message.value);
    watch(message, value => {
      if (!focused.value) describedMessage.value = value;
    });
    const onFocusIn = () => {
      focused.value = true;
    };
    const onFocusOut = (event: FocusEvent) => {
      const root = event.currentTarget as HTMLElement | null;
      const next = event.relatedTarget as Node | null;
      // moving between parts of one field (date input -> calendar button)
      if (root && next && root.contains(next)) return;
      focused.value = false;
      describedMessage.value = message.value;
    };

    return {
      message,
      hasError,
      onChange,
      describedMessage,
      onFocusIn,
      onFocusOut,
    };
  },

  computed: {
    // A label binds to its control only through id/for. When the consumer
    // omits id, generate a stable per-instance one. WCAG 1.3.1/3.3.2/4.1.2.
    resolvedId(): string {
      return this.id || `oxd-input-field-${this.cid}`;
    },
    labelId(): string {
      return `${this.resolvedId}-label`;
    },
    messageId(): string {
      return `${this.resolvedId}-message`;
    },
    descriptionId(): string {
      return `${this.resolvedId}-description`;
    },
    hintId(): string {
      return `${this.resolvedId}-hint`;
    },
    // `v-bind="$attrs"` is merged first, so binding aria-describedby here would
    // otherwise silently drop one the consumer passed in. It is an id list, so
    // append to theirs rather than replace it.
    describedBy(): string | null {
      const inherited = this.$attrs['aria-describedby'] as string | undefined;
      // Hint before message: instructions first, then what went wrong.
      // Points at the frozen copy of the message (see setup), never at the
      // live region itself, and ALWAYS - so neither the attribute nor the
      // text it resolves to changes while the user is typing. An empty
      // description is not read.
      const ids = [
        inherited,
        this.hint ? this.hintId : null,
        this.descriptionId,
      ].filter(Boolean);
      return ids.join(' ');
    },
    // A file input is exposed as a BUTTON, not a textbox. Screen readers
    // suppress a <label> that names a textbox, but not one that names a
    // button - a button normally names itself from its own content - so the
    // label gets read as text and then again as the button's name. Hiding the
    // label element and naming the control with aria-labelledby collapses that
    // to a single announcement. Verified against Orca: "Upload Resume" twice
    // before, once after.
    isFile(): boolean {
      return this.type === TYPE_FILE_INPUT;
    },
    // The select's focusable element is a <div role="combobox">, and `for`
    // only addresses labelable elements - so it must be named by reference
    // too. Unlike the file input its label stays visible to AT: combobox is a
    // form-field role, which readers do collapse with their label.
    // All three render SelectText, whose focusable element is the div, so all
    // three need naming by reference - not just the one the defect was raised
    // against. Leaving multiselect/treeselect on `for` would point their label
    // at a <div>, which names nothing.
    isSelect(): boolean {
      return (
        this.type === TYPE_SELECT ||
        this.type === TYPE_MULTISELECT ||
        this.type === TYPE_TREE_SELECT
      );
    },
    // Groups cannot use `for` at all; a file input can, but must not, for the
    // reason above. Everything else keeps the plain <label for> wiring.
    labelledBy(): string | null {
      // `v-bind="$attrs"` is merged BEFORE this binding, so returning null does
      // not fall back to an inherited aria-labelledby - it erases it, and a
      // consumer that renders its own label is left with an unnamed control.
      // Same hazard already handled for aria-describedby below.
      const inherited = this.$attrs['aria-labelledby'] as string | undefined;
      if (!this.label) return inherited ?? null;
      // When this component renders the label it owns the naming, so its own
      // labelId wins over anything inherited.
      return this.isGroup || this.isFile || this.isSelect
        ? this.labelId
        : inherited ?? null;
    },
    // checkboxgroup/radiogroup/radiopillgroup hand each member its own
    // `${id}_${option.id}`, so no element owns resolvedId. Naming them with
    // `for` would leave both the group unnamed and the label orphaned.
    isGroup(): boolean {
      return GROUP_TYPES.indexOf(this.type as Types) !== -1;
    },
    // A select's focusable element is a <div>, which `for` cannot address, so
    // clicking its label had no effect once `for` was dropped. Groups are left
    // alone: a group label has no single control to activate and never had
    // click behaviour.
    labelClickTarget(): string | undefined {
      return this.isSelect ? this.resolvedId : undefined;
    },
    labelFor(): string | undefined {
      return this.isGroup || this.isSelect ? undefined : this.resolvedId;
    },
    classes(): object {
      return {
        label: {
          'oxd-input-field-required': this.required,
        },
        message: {
          'oxd-input-field-error-message': this.hasError,
        },
      };
    },
    component(): Components {
      return TYPE_MAP[this.type as Types];
    },
  },
});
</script>

<style src="./input-field.scss" lang="scss"></style>
