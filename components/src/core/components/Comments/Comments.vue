<template>
  <div class="oxd-comment-groups-wrapper">
    <div v-if="showHeaderLabel" class="oxd-comment-header-label-wrapper">
      <oxd-label :label="headerLabel" />
    </div>
    <div
      class="oxd-comment-groups-container"
      :class="commentGroupsContainerClasses"
      :style="commentGroupsContainerStyles"
    >
      <div
        v-if="!(hideEmptyPlaceholder || hasCommentsInside)"
        class="
          oxd-comment-no-notes-found-container
          d-flex
          justify-center
          align-center
        "
        :style="{'min-height': `${commentThreadMinHeight}`}"
      >
        <div class="oxd-comment-no-notes-found-wrapper">
          <oxd-icon
            class="oxd-comment-no-notes-found justify-center"
            name="oxd-no-notes-found"
          />
          <div class="oxd-comment-no-notes-found-label">
            {{ $vt(emptyPlaceholderMsg) }}
          </div>
        </div>
      </div>
      <ul
        ref="commentGroupsList"
        class="oxd-comment-groups-list"
        v-if="hasCommentsInside"
      >
        <li
          class="oxd-comment-group"
          v-for="(commentGroup, groupIndex) in commentGroups"
          :key="commentGroup.id || groupIndex"
        >
          <oxd-label
            v-if="commentGroup.label"
            :label="commentGroup.label"
            class="oxd-comment-group-label"
          />
          <oxd-comment
            v-for="(comment, commentIndex) in commentGroup.comments"
            :comment="comment"
            :key="comment || commentIndex"
            :allowToEdit="
              disabled || readOnly ? false : allowToEdit || comment.allowToEdit
            "
            :allowToDelete="
              disabled || readOnly
                ? false
                : allowToDelete || comment.allowToDelete
            "
            :enableAvatar="enableAvatar"
            :requiredEditCommentErrorMsg="requiredEditCommentErrorMsg"
            :unsavedEditCommentErrorMsg="unsavedEditCommentErrorMsg"
            :commentDeleteConfirmationMsg="commentDeleteConfirmationMsg"
            :maxCharLength="commentEditMaxCharLength"
            @commentEditHasError="commentEditHasError"
            @onUpdateComment="onUpdateComment"
            @onDeleteComment="onDeleteComment"
          />
        </li>
      </ul>
    </div>
    <oxd-comment-box
      v-if="!(readOnly || disabled || hideAddInput)"
      :label="commentBoxLabel"
      :labelIcon="'oxd-note'"
      :actionButtonIcon="'oxd-add'"
      :actionButtonTooltip="'Add'"
      :placeholder="commentBoxPlaceholder"
      :modelValue="comment"
      :hasError="hasError"
      :unsavedAddCommentErrorMsg="unsavedAddCommentErrorMsg"
      :preventAddOnKeyPressEnter="true"
      @update:modelValue="onInputComment"
      @addComment="onAddComment"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  nextTick,
  PropType,
} from 'vue';
import Comment from './Comment.vue';
import Label from '@orangehrm/oxd/core/components/Label/Label.vue';
import CommentBox from './CommentBox.vue';
import {END, Scroll, SMOOTH} from './types';
import translateMixin from '../../../mixins/translate';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'oxd-comments',

  components: {
    'oxd-icon': Icon,
    'oxd-label': Label,
    'oxd-comment': Comment,
    'oxd-comment-box': CommentBox,
  },

  mixins: [translateMixin],

  emits: [
    'update:modelValue',
    'addComment',
    'updateComment',
    'deleteComment',
    'commentEditHasError',
    'commentChanged',
  ],

  props: {
    modelValue: {
      type: Object,
    },
    commentGroups: {
      type: Array as PropType<any>,
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
    commentThreadMinHeight: {
      type: Number,
      default: '216px',
    },
    scrollHeight: {
      type: Number,
      default: 0,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    headerLabel: {
      type: String,
    },
    commentBoxLabel: {
      type: String,
      default: 'Add Comment',
    },
    commentBoxPlaceholder: {
      type: String,
      default: 'Write your comment...',
    },
    unsavedAddCommentErrorMsg: {
      type: String,
    },
    unsavedEditCommentErrorMsg: {
      type: String,
    },
    requiredEditCommentErrorMsg: {
      type: String,
    },
    commentDeleteConfirmationMsg: {
      type: String,
    },
    scrollSettings: {
      type: Object,
    },
    commentEditMaxCharLength: {
      type: Number,
    },
    hideAddInput: {
      type: Boolean,
      default: false,
    },
    hideEmptyPlaceholder: {
      type: Boolean,
      default: false,
    },
    emptyPlaceholderMsg: {
      type: String,
      default: 'Sorry, No Comments Found!',
    },
  },
  setup(props, {emit}) {
    const commentGroupsList = ref(null);
    const comment = ref<string>('');

    const hasCommentsInside = computed(() => {
      let totalCommentsLength = 0;
      props.commentGroups?.forEach((commentGroup) => {
        totalCommentsLength =
          totalCommentsLength + commentGroup?.comments?.length;
      });
      return totalCommentsLength > 0;
    });

    const showHeaderLabel = computed(() => {
      if (props.hideEmptyPlaceholder) {
        return props.headerLabel && hasCommentsInside.value;
      } else {
        return props.headerLabel;
      }
    });

    const commentGroupsContainerClasses = computed(() => {
      return {
        'd-flex justify-center align-center': !hasCommentsInside,
        'scroll-vertical': props.scrollHeight,
      };
    });

    const commentGroupsContainerStyles = computed(() => {
      return {
        'min-height': `${props.commentThreadMinHeight}`,
        height:
          hasCommentsInside.value && props.scrollHeight > 0
            ? `${props.scrollHeight}px`
            : undefined,
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
      emit('commentChanged', comment.value);
    };

    const doScroll = async () => {
      await nextTick();
      commentGroupsList.value?.scrollIntoView({
        behavior: scrollSettingsObj.value.mode,
        block: scrollSettingsObj.value.scrollTo,
      });
    };

    const onAddComment = (event) => {
      emit('addComment', event, {
        value: comment.value,
        successCallback: () => {
          doScroll();
        },
      });
      emit('update:modelValue', '');
      comment.value = '';
    };

    onMounted(() => {
      comment.value = '';
      doScroll();
    });

    const commentEditHasError = (hasError: boolean) => {
      emit('commentEditHasError', hasError);
    };

    const onUpdateComment = (
      e: Event,
      data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        comment: any;
        value: string;
      },
    ) => {
      emit('updateComment', e, data);
    };

    const onDeleteComment = (e: Event, commentObj) => {
      emit('deleteComment', e, commentObj);
    };

    return {
      comment,
      commentGroupsContainerClasses,
      commentGroupsContainerStyles,
      onInputComment,
      onAddComment,
      commentEditHasError,
      onUpdateComment,
      onDeleteComment,
      commentGroupsList,
      hasCommentsInside,
      showHeaderLabel,
    };
  },
});
</script>

<style src="./comments.scss" lang="scss" scoped></style>
