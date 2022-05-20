<template>
  <oxd-icon
    :size="ICON_SIZE_MEDIUM"
    name="oxd-help-popup"
    :help-tooltip="$vt(helpText)"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {TOOLTIP_RIGHT} from './../Button/types';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import translateMixin from '@orangehrm/oxd/mixins/translate';
import {ICON_SIZE_MEDIUM} from '@orangehrm/oxd/core/components/Icon/types';

export default defineComponent({
  name: 'oxd-help-popup-icon',

  components: {
    'oxd-icon': Icon,
  },

  mixins: [translateMixin],

  data() {
    return {
      TOOLTIP_RIGHT,
      ICON_SIZE_MEDIUM,
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
