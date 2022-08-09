<template>
  <div class="oxd-comment-wrapper">
    <div class="d-flex align-start">
      <div v-if="enableAvatar" class="oxd-comment-avatar-wrapper">
        <oxd-profile-pic
          size="medium"
          :imageSrc="comment.user && comment.user.avatarUrl"
        />
      </div>
      <div ref="commentContentWrapper" class="oxd-comment-content-wrapper">
        <div
          class="oxd-comment-content-container"
          :class="{'editable-mode': editable}"
        >
          <div
            class="
              oxd-comment-content-header-container
              d-flex
              align-start
              justify-between
            "
          >
            <div
              class="
                oxd-comment-content-header-label-container
                d-flex
                align-center
              "
            >
              <oxd-label
                :label="fullName"
                class="oxd-comment-content-author-name"
                :class="labelClasses"
              />
              <span
                v-if="comment.labelHint"
                class="oxd-comment-content-header-label-hint"
                >{{ $vt(comment.labelHint) }}</span
              >
            </div>
            <div
              class="
                oxd-comment-content-header-actions-container
                show-on-hover-grid
              "
            >
              <oxd-icon-button
                v-if="!editable && allowToDelete"
                data-test="deleteIcon"
                :name="'oxd-trash'"
                :size="'extra-small'"
                :tooltip="$vt('Delete')"
                :class="'oxd-comment-content-header-action'"
                :withContainer="false"
                @click="enableDeleteMode(true)"
              />
              <oxd-icon-button
                v-if="!editable && allowToEdit"
                data-test="editIcon"
                :name="'oxd-edit'"
                :size="'extra-small'"
                :class="'oxd-comment-content-header-action'"
                :withContainer="false"
                :tooltip="$vt('Edit')"
                @click="enableEditMode"
              />
            </div>
          </div>
          <div v-if="editable" class="oxd-comment-content-edit-wrapper">
            <oxd-comment-box
              :actionButtonIcon="'oxd-check'"
              :actionButtonTooltip="$vt('Update')"
              :modelValue="commentContent"
              :hasError="commentInlineValidationMsg"
              :preventAddOnKeyPressEnter="true"
              @blurCommentBox="blurCommentBox"
              @update:modelValue="onInputComment"
              @addComment="onUpdateComment"
              @keyup.esc.stop="enableEditMode(false)"
            />
            <oxd-text
              v-if="commentInlineValidationMsg"
              class="oxd-input-field-error-message oxd-input-group__message"
              tag="span"
            >
              {{ $vt(commentInlineValidationMsg) }}
            </oxd-text>
            <div
              class="oxd-comment-content-footer-container d-flex align-center"
            >
              <div class="oxd-comment-content-footer-action-container">
                {{ $vt('Press Esc to') }}
                <span
                  v-if="allowToEdit"
                  class="oxd-comment-content-footer-action --cancel active"
                  @click="cancelEditMode"
                  >{{ $vt('Cancel') }}</span
                >
              </div>
            </div>
          </div>
          <div v-else class="oxd-comment-content">
            <span v-text="comment.content"></span>
          </div>
        </div>
        <div class="oxd-comment-content-footer-container d-flex align-center">
          <div v-if="comment.time" class="oxd-comment-content-commented-date">
            {{ $vt('Date') }}: {{ comment.time }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="deleteMode"
      ref="commentDeleteWrapper"
      class="oxd-comment-inline-delete d-flex align-center oxd-mt-5 oxd-p-5"
    >
      <div class="comment-inline-delete-content-wrapper d-flex align-center">
        <oxd-text type="subtitle-2">
          {{ $vt(commentDeleteConfirmationMsg) }}
        </oxd-text>
      </div>
      <div
        class="
          comment-inline-delete-actions-wrapper
          d-flex
          align-center
          oxd-ml-3
        "
      >
        <oxd-button
          :label="$vt(cancelDeleteButtonData.label)"
          :iconName="cancelDeleteButtonData.iconName"
          :iconSize="cancelDeleteButtonData.size"
          :displayType="cancelDeleteButtonData.displayType"
          :style="cancelDeleteButtonData.style"
          :class="cancelDeleteButtonData.class"
          data-test="deleteButton"
          @click.once="cancelDeleteButtonData.click"
        />
        <oxd-button
          :label="$vt(confirmDeleteButtonData.label)"
          :iconName="confirmDeleteButtonData.iconName"
          :iconSize="confirmDeleteButtonData.size"
          :displayType="confirmDeleteButtonData.displayType"
          :style="confirmDeleteButtonData.style"
          :class="confirmDeleteButtonData.class"
          data-test="cancelButton"
          class="oxd-ml-3"
          @click="confirmDeleteButtonData.click"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, nextTick} from 'vue';
import translateMixin from '../../../mixins/translate';
import Label from '@orangehrm/oxd/core/components/Label/Label.vue';
import oxdText from '@orangehrm/oxd/core/components/Text/Text.vue';
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic.vue';
import CommentBox from '@orangehrm/oxd/core/components/Comments/CommentBox.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import oxdButton from '@orangehrm/oxd/core/components/Button/Button.vue';

export default defineComponent({
  name: 'oxd-comment',

  mixins: [translateMixin],

  components: {
    'oxd-label': Label,
    'oxd-icon-button': IconButton,
    'oxd-profile-pic': ProfilePic,
    'oxd-comment-box': CommentBox,
    'oxd-text': oxdText,
    'oxd-button': oxdButton,
  },

  props: {
    comment: {
      type: Object,
    },
    allowToEdit: {
      type: Boolean,
      default: false,
    },
    allowToDelete: {
      type: Boolean,
      default: false,
    },
    enableAvatar: {
      type: Boolean,
      default: false,
    },
    okButton: {
      type: Object,
      default: () => null,
    },
    cancelButton: {
      type: Object,
      default: () => null,
    },
    commentDeleteConfirmationMsg: {
      type: String,
      default:
        'The current comment will be permanently deleted. Are you sure you want to continue?',
    },
    requiredEditCommentErrorMsg: {
      type: String,
      default: 'Required',
    },
    unsavedEditCommentErrorMsg: {
      type: String,
      default: 'Comment should be either updated or removed',
    },
  },

  setup(props, {emit}) {
    const editable = ref(false);
    const invalidCommentUpdate = ref(false);
    const invalidCommentSave = ref(false);
    const deleteMode = ref(false);
    const commentOriginalContent = ref(
      JSON.parse(JSON.stringify(props.comment.content)),
    );
    const commentContent = ref(props.comment.content);
    const commentDeleteWrapper = ref(null);

    const fullName = computed(
      () =>
        `${props.comment.user?.firstname || ''} ${
          props.comment.user?.middlename || ''
        } ${props.comment.user?.lastname || ''}`,
    );

    const hasContentChanged = computed(() =>
      commentOriginalContent.value.localeCompare(commentContent.value),
    );

    const commentInlineValidationMsg = computed((): string | boolean => {
      if (invalidCommentSave.value) {
        return props.requiredEditCommentErrorMsg;
      } else if (invalidCommentUpdate.value) {
        return props.unsavedEditCommentErrorMsg;
      } else {
        return false;
      }
    });

    const enableEditMode = (editMode = true) => {
      editable.value = editMode;
    };

    const enableDeleteMode = async (state = false) => {
      deleteMode.value = state;
      await nextTick();
      if (state) {
        commentDeleteWrapper.value.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    };

    const cancelEditMode = (e: Event) => {
      commentContent.value = commentOriginalContent.value;
      invalidCommentUpdate.value = false;
      invalidCommentSave.value = false;
      emit('commentEditHasError', false);
      enableEditMode(false);
    };

    const onInputComment = (value: string) => {
      commentContent.value = value;
      invalidCommentSave.value = false;
      emit('commentEditHasError', false);
      if (commentContent.value === '') {
        invalidCommentSave.value = true;
        invalidCommentUpdate.value = false;
        emit('commentEditHasError', true);
      } else if (hasContentChanged.value === 0) {
        invalidCommentUpdate.value = false;
        emit('commentEditHasError', false);
      } else {
        emit('commentEditHasError', true);
      }
    };

    const blurCommentBox = (e: Event) => {
      if (hasContentChanged.value === 0) {
        invalidCommentUpdate.value = false;
        emit('commentEditHasError', false);
      } else {
        invalidCommentUpdate.value = true;
        emit('commentEditHasError', true);
      }
    };

    const onUpdateComment = (e: Event) => {
      if (!invalidCommentSave.value) {
        emit('onUpdateComment', e, {
          comment: props.comment,
          value: commentContent.value,
        });
        emit('commentEditHasError', false);
        invalidCommentUpdate.value = false;
        invalidCommentSave.value = false;
        enableEditMode(false);
      }
    };

    const defaultConfirmDeleteAction = (e: Event) => {
      enableDeleteMode(false);
      emit('onDeleteComment', e, {
        value: props.comment,
      });
    };

    const defaultCancelDeleteAction = (e: Event) => {
      enableDeleteMode(false);
      emit('cancelAction', e);
    };

    const confirmDeleteButtonData = computed(() => {
      const initialObject = {
        label: 'Yes, Delete',
        iconName: 'oxd-trash',
        size: 'medium',
        displayType: 'danger',
        style: null,
        class: null,
        click: defaultConfirmDeleteAction,
      };
      for (const key in props.okButton) {
        const value = props.okButton[key];
        if (value) {
          initialObject[key] = value;
        }
      }
      return initialObject;
    });

    const cancelDeleteButtonData = computed(() => {
      const initialObject = {
        label: 'Cancel',
        iconName: null,
        size: 'medium',
        displayType: 'ghost-danger',
        style: null,
        class: null,
        click: defaultCancelDeleteAction,
      };
      for (const key in props.cancelButton) {
        const value = props.cancelButton[key];
        if (value) {
          initialObject[key] = value;
        }
      }
      return initialObject;
    });

    return {
      fullName,
      editable,
      commentContent,
      invalidCommentUpdate,
      enableEditMode,
      cancelEditMode,
      enableDeleteMode,
      blurCommentBox,
      onInputComment,
      onUpdateComment,
      commentDeleteWrapper,
      deleteMode,
      confirmDeleteButtonData,
      cancelDeleteButtonData,
      commentInlineValidationMsg,
      invalidCommentSave,
    };
  },
});
</script>

<style src="./comment.scss" lang="scss" scoped></style>
