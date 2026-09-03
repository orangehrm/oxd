<template>
  <oxd-icon-button
    :icon-styles="{
      color: '#fff',
    }"
    class="oxd-dialog-close-button"
    :name="'x'"
    :size="'extra-large'"
    :aria-label="$vt('Close')"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import translateMixin from '../../../mixins/translate';

// The button holds only an icon and passes no tooltip, so without an explicit
// name it announces as "button". Consumers cannot reach it to fix that — the
// dialog renders it internally. WCAG 4.1.2.
export default defineComponent({
  name: 'oxd-dialog-close-button',
  components: {
    'oxd-icon-button': IconButton,
  },
  mixins: [translateMixin],
});
</script>

<style src="./close-button.scss" lang="scss" scoped></style>
