<template>
  <div class="oxd-comment-groups-wrapper">
    <div
      class="oxd-comment-groups-container"
      :class="commentGroupsContainerClasses"
      :style="commentGroupsContainerStyles"
    >
      <ul
        ref="commentGroupsList"
        class="oxd-comment-groups-list"
        v-if="commentGroups && commentGroups.length > 0"
      >
        <li
          class="oxd-comment-group"
          v-for="(commentGroup, index) in commentGroups"
          :key="commentGroup.id || index"
        >
          <oxd-label
            v-if="commentGroup.label"
            :label="commentGroup.label"
            class="oxd-comment-group-label"
          />
          <oxd-comment
            v-for="(comment, index) in commentGroup.comments"
            :comment="comment"
            :key="comment || index"
            :allowToEdit="readOnly ? false : allowToEdit || comment.allowToEdit"
            :allowToDelete="
              readOnly ? false : allowToDelete || comment.allowToDelete
            "
            :enableAvatar="enableAvatar"
            :commentDeleteConfirmationMsg="commentDeleteConfirmationMsg"
            @onUpdateComment="onUpdateComment"
            @onDeleteComment="onDeleteComment"
          />
        </li>
      </ul>
    </div>
    <oxd-comment-box
      v-if="!readOnly"
      :label="'Add notes'"
      :labelIcon="'oxd-note'"
      :actionButtonIcon="'oxd-add'"
      :actionButtonTooltip="'Add'"
      :placeholder="'Write your note'"
      :modelValue="comment"
      :hasError="hasError"
      @update:modelValue="onInputComment"
      @addComment="onAddComment"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, onMounted} from 'vue';
import Comment from './Comment.vue';
import Label from '@orangehrm/oxd/core/components/Label/Label.vue';
import CommentBox from './CommentBox.vue';
import {END, Scroll, SMOOTH} from './types';

export default defineComponent({
  name: 'oxd-comments',

  components: {
    'oxd-label': Label,
    'oxd-comment': Comment,
    'oxd-comment-box': CommentBox,
  },

  emits: ['update:modelValue', 'addComment', 'updateComment', 'deleteComment'],

  props: {
    modelValue: {
      type: Object,
    },
    commentGroups: {
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
    scrollMaxHeight: {
      type: Number,
      default: 0,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    commentDeleteConfirmationMsg: {
      type: String,
      default:
        'The current comment will be permanently deleted. Are you sure you want to continue?',
    },
    scrollSettings: {
      type: Object,
    },
  },
  setup(props, {emit}) {
    const commentGroupsList = ref(null);
    const comment = ref<string>('');

    const commentGroupsContainerClasses = computed(() => {
      return {
        'scroll-vertical': props.scrollMaxHeight,
      };
    });

    const commentGroupsContainerStyles = computed(() => {
      return {
        'max-height':
          props.scrollMaxHeight > 0 ? `${props.scrollMaxHeight}px` : undefined,
      };
    });

    const scrollSettingsObj = computed(() => {
      const initialObject: Scroll = {
        mode: SMOOTH,
        scrollTo: END,
      };
      for (const key in props.scrollSettings) {
        const value = props.scrollSettings[key];
        if (value) {
          initialObject[key] = value;
        }
      }
      return initialObject;
    });

    const onInputComment = (value: string) => {
      comment.value = value;
      emit('update:modelValue', comment.value);
    };

    const onAddComment = () => {
      emit('addComment', comment.value, () => {
        setTimeout(() => {
          commentGroupsList.value.scrollIntoView({
            behavior: scrollSettingsObj.value.mode,
            block: scrollSettingsObj.value.scrollTo,
          });
        }, 0);
      });
      emit('update:modelValue', '');
      comment.value = '';
    };

    onMounted(() => {
      setTimeout(() => {
        comment.value = '';
        commentGroupsList.value.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, 0);
    });

    const onUpdateComment = (commentObj, newComment) => {
      emit('updateComment', commentObj, newComment);
    };

    const onDeleteComment = (commentObj) => {
      emit('deleteComment', commentObj);
    };

    return {
      comment,
      commentGroupsContainerClasses,
      commentGroupsContainerStyles,
      onInputComment,
      onAddComment,
      onUpdateComment,
      onDeleteComment,
      commentGroupsList,
    };
  },
});
</script>

<style src="./comments.scss" lang="scss" scoped></style>
