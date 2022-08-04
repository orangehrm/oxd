<template>
  <p>
    <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever since
    the 1500s, when an unknown printer took a galley of type and scrambled it to
    make a type specimen book. It has survived not only five centuries, but also
    the leap into electronic typesetting, remaining essentially unchanged. It
    was popularised in the 1960s with the release of Letraset sheets containing
    Lorem Ipsum passages, and more recently with desktop publishing software
    like Aldus PageMaker including versions of Lorem Ipsum.
  </p>
  <oxd-icon-button name="trash" @click="onClick" withContainer />

  <oxd-dialog
    v-if="show"
    @update:show="onClose"
    :withTransition="false"
    :style="{maxWidth: '800px'}"
  >
    <p>
      <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of
      Lorem Ipsum.
    </p>
  </oxd-dialog>
</template>

<script>
import Dialog from '@orangehrm/oxd/core/components/Dialog/Dialog';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon';

export default {
  components: {
    'oxd-dialog': Dialog,
    'oxd-icon-button': IconButton,
  },

  data() {
    return {
      show: true,
    };
  },

  methods: {
    onClick() {
      this.show = true;
    },
    onClose() {
      this.show = false;
    },
  },
};
</script>
