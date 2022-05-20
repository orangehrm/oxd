<template>
  <oxd-icon
    :size="ICON_SIZE_SMALL"
    name="oxd-help-popup"
    :help-tooltip="$vt(helpText)"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import translateMixin from '@orangehrm/oxd/mixins/translate';
import {ICON_SIZE_SMALL} from '@orangehrm/oxd/core/components/Icon/types';

export default defineComponent({
  name: 'oxd-help-popup-icon',

  components: {
    'oxd-icon': Icon,
  },

  mixins: [translateMixin],

  data() {
    return {
      ICON_SIZE_SMALL,
    };
  },

  props: {
    helpText: {
      type: String,
      default: null,
    },
  },
});
</script>
<style src="./help-popup-icon.scss" lang="scss" scoped></style>
