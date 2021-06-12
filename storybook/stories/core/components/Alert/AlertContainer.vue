<template>
  <div>
    <oxd-alert
      :show="true"
      type="success"
      message="Are you sure you want to continue?"
    >
      <oxd-button
        size="medium"
        displayType="ghost-success"
        label="No, Cancel"
      />
      <oxd-button size="medium" displayType="success" label="Yes, Delete" />
    </oxd-alert>

    <oxd-alert
      :show="true"
      type="warn"
      message="Are you sure you want to continue?"
    >
      <oxd-button size="medium" displayType="ghost-warn" label="No, Cancel" />
      <oxd-button size="medium" displayType="warn" label="Yes, Delete" />
    </oxd-alert>

    <oxd-alert
      :show="true"
      type="error"
      message="Are you sure you want to continue?"
    >
      <oxd-button size="medium" displayType="ghost-danger" label="No, Cancel" />
      <oxd-button size="medium" displayType="danger" label="Yes, Delete" />
    </oxd-alert>

    <oxd-alert
      :show="true"
      type="info"
      message="Are you sure you want to continue?"
    >
      <oxd-button size="medium" displayType="ghost-info" label="No, Cancel" />
      <oxd-button size="medium" displayType="info" label="Yes, Delete" />
    </oxd-alert>
  </div>
</template>

<script>
import Alert from '@orangehrm/oxd/core/components/Alert/Alert';
import Button from '@orangehrm/oxd/core/components/Button/Button';

export default {
  name: 'alert-container-example',
  components: {
    'oxd-alert': Alert,
    'oxd-button': Button,
  },
};
</script>
