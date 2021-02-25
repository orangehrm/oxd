<template>
  <oxd-sheet type="pastel-white" :rounded="false">
    <oxd-sheet v-bind="$attrs">
      <oxd-text type="card-title">Card Title</oxd-text>
      <div :style="{width: '100px', height: '100px'}"></div>
    </oxd-sheet>
  </oxd-sheet>
</template>

<script>
import Sheet from '@orangehrm/oxd/core/components/Sheet/Sheet';
import Text from '@orangehrm/oxd/core/components/Text/Text';

export default {
  components: {
    'oxd-sheet': Sheet,
    'oxd-text': Text,
  },
  inheritAttrs: false,
};
</script>
