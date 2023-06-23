<template>
  <div class="oxd-comment-box oxd-input-group" v-click-outside="clickOutside">
    <div class="oxd-input-group__label-wrapper">
      <oxd-icon
        v-if="labelIcon"
        :name="labelIcon"
        class="oxd-input-group__label-icon"
      />
      <oxd-label v-if="label" :id="id" :label="label" :class="labelClasses" />
      <oxd-text v-if="hint" class="oxd-input-field-hint placement-top" tag="p">
        {{ '(' + hint + ')' }}
      </oxd-text>
    </div>
    <div class="d-flex">
      <oxd-textarea
        v-bind="$attrs"
        data-test="comment-box-textarea"
        class="oxd-comment-box-textarea"
        :class="textareaClasses"
        ref="textareaComponent"
        :value="modelValue"
        @input="updateModelValue"
        v-on:keydown.enter.prevent="keyupEnter($event)"
      />
    </div>
    <oxd-icon-button
      v-if="modelValue.trim() !== ''"
      data-test="add-comment-button"
      class="oxd-comment-box-add-button"
      :name="actionButtonIcon"
      :tooltip="actionButtonTooltip"
      size="small"
      @click="addComment"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, onMounted, PropType} from 'vue';
import Label from '@orangehrm/oxd/core/components/Label/Label.vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import Textarea from '@orangehrm/oxd/core/components/Textarea/Textarea.vue';
import {
  TextareaResize,
  RESIZE_NONE,
  RESIZE_VERTICAL,
  RESIZE_HORIZONTAL,
} from './../Textarea/types';
import clickOutsideDirective from '../../../directives/click-outside';

export default defineComponent({
  name: 'oxd-textarea-wrapper',
  components: {
    'oxd-label': Label,
    'oxd-text': Text,
    'oxd-icon': Icon,
    'oxd-icon-button': IconButton,
    'oxd-textarea': Textarea,
  },
  directives: {
    'click-outside': clickOutsideDirective,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
    },
    labelIcon: {
      type: String,
    },
    actionButtonIcon: {
      type: String,
    },
    actionButtonTooltip: {
      type: String,
    },
    classes: {
      type: Object as PropType<{
        label: string;
        message: string;
        /* eslint-disable @typescript-eslint/no-explicit-any */
        wrapper: any;
      }>,
      default: () => {
        return {
          label: {},
          message: {},
          wrapper: {},
        };
      },
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    resize: {
      type: String,
      default: RESIZE_VERTICAL,
      validator: function(value: TextareaResize) {
        return (
          [RESIZE_VERTICAL, RESIZE_HORIZONTAL, RESIZE_NONE].indexOf(value) !==
          -1
        );
      },
    },
    preventAddOnKeyPressEnter: {
      type: Boolean,
      defaule: false,
    },
  },
  setup(props, {emit}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textareaComponent: any = ref(null);
    const focused = false;

    const labelClasses = computed((): object => {
      return {
        ...props.classes.label,
      };
    });

    const textareaClasses = computed(() => {
      return {
        'oxd-textarea': true,
        'oxd-textarea--active': !focused,
        'oxd-textarea--focus': focused,
        'oxd-textarea--error': props.hasError,
        [`oxd-textarea--resize-${props.resize}`]: true,
      };
    });

    const updateModelValue = (e: Event) => {
      emit('update:modelValue', (e.target as HTMLTextAreaElement).value);
    };

    const addComment = (str: string) => {
      emit('addComment', str);
      textareaComponent.value?.$el.focus();
    };

    const keyupEnter = (e: any) => {
      if (!props.preventAddOnKeyPressEnter) {
        let commentBody: string = (e.target as HTMLTextAreaElement).value ?? '';
        if (e.keyCode == 13 && !e.shiftKey) {
          e.preventDefault();
          let commentBody: string =
            (e.target as HTMLTextAreaElement).value ?? '';
          commentBody = commentBody.trim();
          addComment(commentBody);
          return false;
        } else if (e.keyCode == 13 && e.shiftKey) {
          commentBody = `${commentBody}\n`;
          emit('update:modelValue', commentBody);
        }
      }
    };

    const clickOutside = (e: Event) => {
      emit('blurCommentBox', e);
    };

    onMounted(() => {
      textareaComponent.value.$el.focus();
    });

    return {
      textareaClasses,
      labelClasses,
      textareaComponent,
      updateModelValue,
      addComment,
      keyupEnter,
      clickOutside,
    };
  },
});
</script>

<style src="./../InputField/input-group.scss" lang="scss" scoped></style>
<style src="./comment-box.scss" lang="scss" scoped></style>
