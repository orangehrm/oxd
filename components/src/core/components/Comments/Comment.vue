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
              justify-between
            "
          >
            <div
              class="
                oxd-comment-content-header-label-container
                d-flex
              "
            >
              <oxd-label
                :label="comment.user.commenterName"
                class="oxd-comment-content-author-name"
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
              :preventAddOnKeyPressEnter="false"
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
              {{ commentInlineValidationMsg }}
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
          <div class="oxd-comment-content-commented-date d-flex align-center">
            <span v-if="comment.formattedTime">
              {{ $vt('Date') }}: {{ comment.formattedTime }}
            </span>
            <oxd-chip
              v-if="
                showGroupNamePill &&
                  comment.groupName &&
                  !comment.customGroupName
              "
              :label="$vt(comment.groupName)"
              class="oxd-comment-group-name-chip"
              :background-color="'#929baa'"
              :color="'#fafafc'"
            />
            <oxd-chip
              v-if="
                showGroupNamePill &&
                  comment.groupName &&
                  comment.customGroupName
              "
              class="oxd-comment-group-name-chip"
              :background-color="'#929baa'"
              :color="'#fafafc'"
            >
              <span class="oxd-comment-group-name-primary">{{
                $vt(comment.customGroupName.labelPrimary)
              }}</span>
              <span class="oxd-comment-group-name-secondary">{{
                $vt(comment.customGroupName.labelSecondary)
              }}</span>
            </oxd-chip>
            <oxd-chip
              v-if="comment.edited"
              :label="$vt('Edited')"
              class="oxd-comment-edited-chip"
              :background-color="'#e8eaef'"
              :color="'#929baa'"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="deleteMode" ref="commentDeleteWrapper">
      <oxd-alert
        :message="$vt(commentDeleteConfirmationMsg)"
        :type="'error'"
        :show="deleteMode"
        :compact="stackConfirmationElements"
      >
        <oxd-button
          :label="$vt(cancelDeleteButtonData.label)"
          :iconSize="cancelDeleteButtonData.size"
          :displayType="cancelDeleteButtonData.displayType"
          :style="cancelDeleteButtonData.style"
          :class="cancelDeleteButtonData.class"
          data-test="deleteButton"
          @click.once="cancelDeleteButtonData.click"
        />
        <oxd-button
          :label="$vt(confirmDeleteButtonData.label)"
          :iconSize="confirmDeleteButtonData.size"
          :displayType="confirmDeleteButtonData.displayType"
          :style="confirmDeleteButtonData.style"
          :class="confirmDeleteButtonData.class"
          data-test="cancelButton"
          class="oxd-ml-3"
          @click="confirmDeleteButtonData.click"
        />
      </oxd-alert>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, nextTick, watch, PropType} from 'vue';
import translateMixin from '../../../mixins/translate';
import Chip from '@orangehrm/oxd/core/components/Chip/Chip.vue';
import Label from '@orangehrm/oxd/core/components/Label/Label.vue';
import oxdText from '@orangehrm/oxd/core/components/Text/Text.vue';
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic.vue';
import CommentBox from '@orangehrm/oxd/core/components/Comments/CommentBox.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import oxdButton from '@orangehrm/oxd/core/components/Button/Button.vue';
import oxdAlert from '@orangehrm/oxd/core/components/Alert/Alert.vue';
import useTranslate from '../../../composables/useTranslate';

export default defineComponent({
  name: 'oxd-comment',

  mixins: [translateMixin],

  components: {
    'oxd-chip': Chip,
    'oxd-label': Label,
    'oxd-icon-button': IconButton,
    'oxd-profile-pic': ProfilePic,
    'oxd-comment-box': CommentBox,
    'oxd-text': oxdText,
    'oxd-button': oxdButton,
    'oxd-alert': oxdAlert,
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
    maxCharLength: {
      type: Number,
      default: 65535,
    },
    showGroupNamePill: {
      type: Boolean,
      default: false,
    },
    stackConfirmationElements: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },

  setup(props, {emit}) {
    const {$t} = useTranslate();
    const editable = ref(false);
    const invalidCommentUpdate = ref(false);
    const invalidCommentSaveRequired = ref(false);
    const hasError = ref<boolean>(false);
    const deleteMode = ref(false);
    const commentOriginalContent = ref(
      JSON.parse(JSON.stringify(props.comment.content)),
    );
    const commentContent = ref(props.comment.content);
    const commentDeleteWrapper = ref(null);

    const hasContentChanged = computed(() =>
      commentOriginalContent.value.localeCompare(commentContent.value),
    );

    const maxCharLengthMsg = $t('Should not exceed {{amount}} characters', {
      amount: props.maxCharLength.toString(),
    });

    const shouldNotExceedCharLength = computed(() => {
      const validation =
        !commentContent.value ||
        new String(commentContent.value).length <= props.maxCharLength ||
        maxCharLengthMsg;
      return validation;
    });

    const commentInlineValidationMsg = computed((): string | boolean => {
      if (invalidCommentSaveRequired.value) {
        return $t(props.requiredEditCommentErrorMsg);
      }
      if (invalidCommentUpdate.value) {
        return $t(props.unsavedEditCommentErrorMsg);
      }
      if (typeof shouldNotExceedCharLength.value === 'string') {
        return $t(shouldNotExceedCharLength.value);
      }
      return false;
    });

    const enableEditMode = (editMode = true) => {
      editable.value = editMode;
      deleteMode.value = false;
      if (!editMode) {
        commentContent.value = commentOriginalContent.value;
        invalidCommentUpdate.value = false;
        invalidCommentSaveRequired.value = false;
        hasError.value = false;
      }
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

    const cancelEditMode = () => {
      commentContent.value = commentOriginalContent.value;
      invalidCommentUpdate.value = false;
      invalidCommentSaveRequired.value = false;
      hasError.value = false;
      enableEditMode(false);
    };

    const onInputComment = (value: string) => {
      commentContent.value = value;
      invalidCommentSaveRequired.value = false;
      shouldNotExceedCharLength.value;
      hasError.value = false;
      if (commentContent.value?.trim() === '') {
        invalidCommentSaveRequired.value = true;
        invalidCommentUpdate.value = false;
        hasError.value = true;
      } else if (hasContentChanged.value === 0) {
        invalidCommentUpdate.value = false;
        hasError.value = false;
      } else if (typeof shouldNotExceedCharLength.value === 'string') {
        invalidCommentSaveRequired.value = false;
        invalidCommentUpdate.value = false;
        hasError.value = true;
      } else if (shouldNotExceedCharLength.value) {
        invalidCommentSaveRequired.value = false;
        invalidCommentUpdate.value = false;
        hasError.value = false;
      } else {
        hasError.value = true;
      }
    };

    const blurCommentBox = () => {
      if (typeof shouldNotExceedCharLength.value === 'string') {
        invalidCommentSaveRequired.value = false;
        invalidCommentUpdate.value = false;
        hasError.value = true;
      } else if (hasContentChanged.value === 0) {
        invalidCommentUpdate.value = false;
        hasError.value = false;
      } else {
        invalidCommentUpdate.value = true;
        hasError.value = true;
      }
    };

    const onUpdateComment = (e: Event) => {
      if (invalidCommentUpdate.value) {
        invalidCommentUpdate.value = false;
        hasError.value = false;
      }
      if (!hasError.value) {
        commentOriginalContent.value = commentContent.value;
        emit('onUpdateComment', e, {
          comment: props.comment,
          value: commentContent.value,
        });
        hasError.value = false;
        invalidCommentUpdate.value = false;
        invalidCommentSaveRequired.value = false;
        editable.value = false;
        deleteMode.value = false;
        invalidCommentUpdate.value = false;
        invalidCommentSaveRequired.value = false;
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
        label: 'No, Cancel',
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

    watch(
      () => hasError.value,
      (value: boolean) => {
        emit('commentEditHasError', value);
      },
    );

    return {
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
      invalidCommentSaveRequired,
    };
  },
});
</script>

<style src="./comment.scss" lang="scss" scoped></style>
