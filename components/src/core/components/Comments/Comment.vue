<template>
  <div class="oxd-comment-wrapper d-flex align-start">
    <div v-if="enableAvatar" class="oxd-comment-avatar-wrapper">
      <oxd-profile-pic size="medium" />
    </div>
    <div class="oxd-comment-content-wrapper">
      <div class="oxd-comment-content-container">
        <div
          class="
            oxd-comment-content-header-container
            d-flex
            align-center
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
              :name="'oxd-trash'"
              :size="'extra-small'"
              :tooltip="$vt('Delete')"
              :withContainer="false"
              @click="enableDeleteMode"
            />
            <oxd-icon-button
              v-if="!editable && allowToEdit"
              :name="'oxd-edit'"
              :size="'extra-small'"
              :withContainer="false"
              :tooltip="$vt('Edit')"
              @click="enableEditMode"
            />
          </div>
        </div>
        <div v-if="editable" class="oxd-comment-content-edit-wrapper">
          <oxd-comment-box
            :actionButtonIcon="'oxd-check'"
            :actionButtonTooltip="'Update'"
            :modelValue="commentContent"
            @update:modelValue="onInputComment"
            @addComment="onUpdateComment"
            @keyup.esc="enableEditMode(false)"
          />
          <div class="oxd-comment-content-footer-container d-flex align-center">
            <div class="oxd-comment-content-footer-action-container">
              {{ $vt('Press Esc to') }}
              <span
                v-if="allowToEdit"
                class="oxd-comment-content-footer-action --cancel active"
                @click="enableEditMode(false)"
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
          Date: {{ comment.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue';
import translateMixin from '../../../mixins/translate';
import Label from '@orangehrm/oxd/core/components/Label/Label.vue';
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic.vue';
import CommentBox from '@orangehrm/oxd/core/components/Comments/CommentBox.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';

export default defineComponent({
  name: 'oxd-comment',

  mixins: [translateMixin],

  components: {
    'oxd-label': Label,
    'oxd-icon-button': IconButton,
    'oxd-profile-pic': ProfilePic,
    'oxd-comment-box': CommentBox,
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
  },

  setup(props, {emit}) {
    const editable = ref(false);
    const commentContent = ref(props.comment.content);
    // let commentContent = JSON.parse(JSON.stringify(props.comment.content));

    const fullName = computed(
      () =>
        `${props.comment.user?.firstname || ''} ${
          props.comment.user?.middlename || ''
        } ${props.comment.user?.lastname || ''}`,
    );

    const enableEditMode = (editMode = true) => {
      editable.value = editMode;
    };

    const enableDeleteMode = () => {
      emit('onDeleteComment', props.comment);
    };

    const onInputComment = (value: string) => {
      commentContent.value = value;
    };

    const onUpdateComment = () => {
      emit('onUpdateComment', props.comment, commentContent.value);
      enableEditMode(false);
    };

    return {
      fullName,
      editable,
      commentContent,
      enableEditMode,
      enableDeleteMode,
      onInputComment,
      onUpdateComment,
    };
  },
});
</script>

<style src="./comment.scss" lang="scss" scoped></style>
