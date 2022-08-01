<template>
  <div class="oxd-comment-groups-wrapper">
    <div
      class="oxd-comment-groups-container"
      :class="commentGroupsContainerClasses"
      :style="commentGroupsContainerStyles"
    >
      <ul ref="commentGroupsList" class="oxd-comment-groups-list">
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
            :allowToEdit="allowToEdit"
            :allowToDelete="allowToDelete"
            :enableAvatar="enableAvatar"
            @onUpdateComment="onUpdateComment"
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
      v-bind="$attrs"
      @update:modelValue="onInputComment"
      @addComment="onAddComment"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, nextTick} from 'vue';
import Comment from './Comment.vue';
import Label from '@orangehrm/oxd/core/components/Label/Label.vue';
import CommentBox from './CommentBox.vue';

export default defineComponent({
  name: 'oxd-comments',

  components: {
    'oxd-label': Label,
    'oxd-comment': Comment,
    'oxd-comment-box': CommentBox,
  },

  emits: ['update:modelValue'],

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

    const onInputComment = (value: string) => {
      comment.value = value;
      emit('update:modelValue', comment.value);
    };

    const onAddComment = () => {
      emit('onAddComment', comment.value, () => {
        setTimeout(() => {
          commentGroupsList.value.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }, 0);
      });
    };

    const onUpdateComment = (commentObj, newComment) => {
      emit('onUpdateComment', commentObj, newComment);
    };

    return {
      comment,
      commentGroupsContainerClasses,
      commentGroupsContainerStyles,
      onInputComment,
      onAddComment,
      onUpdateComment,
      commentGroupsList,
    };
  },
});
</script>

<style src="./comments.scss" lang="scss" scoped></style>
