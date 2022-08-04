<template>
  <oxd-icon-button name="trash" @click="onClick" withContainer />

  <oxd-dialog v-if="show" @update:show="onCancel" :style="{maxWidth: '450px'}">
    <div class="orangehrm-modal-header">
      <oxd-text type="modal-title">Are you sure?</oxd-text>
    </div>
    <div class="orangehrm-text-center-align">
      <oxd-text type="subtitle-2">
        The selected item will be permanently deleted. Are you sure you want to
        continue?
      </oxd-text>
    </div>
    <div class="orangehrm-modal-footer">
      <oxd-button
        label="No, Cancel"
        displayType="text"
        class="orangehrm-button-margin"
        @click="onCancel"
      />
      <oxd-button
        label="Yes, Delete"
        iconName="trash"
        displayType="label-danger"
        class="orangehrm-button-margin"
        @click="onDelete"
      />
    </div>
  </oxd-dialog>
</template>

<script>
import Dialog from '@orangehrm/oxd/core/components/Dialog/Dialog';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon';
import Button from '@orangehrm/oxd/core/components/Button/Button';
import Text from '@orangehrm/oxd/core/components/Text/Text';

export default {
  components: {
    'oxd-dialog': Dialog,
    'oxd-icon-button': IconButton,
    'oxd-text': Text,
    'oxd-button': Button,
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
    onCancel() {
      this.show = false;
    },
    onDelete() {
      this.show = false;
    },
  },
};
</script>

<style>
.orangehrm-modal-header {
  margin-bottom: 1.2rem;
  display: flex;
  justify-content: center;
}
.orangehrm-modal-footer {
  margin-top: 1.2rem;
  display: flex;
  justify-content: center;
}
.orangehrm-button-margin {
  margin: 0.25rem;
}
.orangehrm-text-center-align {
  text-align: center;
}
</style>
