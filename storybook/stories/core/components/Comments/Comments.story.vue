<template>
  <oxd-comments
    :commentGroups="commentGroupsList"
    :allowToEdit="allowToEdit"
    :allowToDelete="allowToDelete"
    :enableAvatar="enableAvatar"
    :scrollHeight="scrollHeight"
    @onAddComment="onAddComment"
    @onUpdateComment="onUpdateComment"
  />
</template>

<script lang="ts">
import {nanoid} from 'nanoid';
import Comments from '@orangehrm/oxd/core/components/Comments/Comments';

export default {
  data: () => {
    return {
      commentGroupsList: []
    }
  },

  props:{
    commentGroups: {
      type: Array,
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
      default: true,
    },
    scrollHeight: {
      type: Number,
      default: 0,
    },
  },

  components: {
    'oxd-comments': Comments,
  },
  methods: {
    onAddComment(comment: string, successCallback) {
      setTimeout(() => {
        const commentObj = {
          id: nanoid(6),
          content: comment,
          time: "2021/09/04 2: 12 PM",
          user: {
            commenterName: "Gayan Sandamal",
          }
        };
        this.commentGroupsList[2]?.comments?.push(commentObj);
        successCallback();
      }, 1000);
    },
    onUpdateComment(commentObj, newComment) {
      setTimeout(() => {
        const commentGroup = this.commentGroupsList?.find(group => group.id === commentObj.groupId);
        const comment = commentGroup?.comments?.find(comment => comment.id === commentObj.id);
        comment.content = newComment;
      }, 2000);
    },
  },
  mounted() {
    this.commentGroupsList = this.commentGroups;
  }
};
</script>
