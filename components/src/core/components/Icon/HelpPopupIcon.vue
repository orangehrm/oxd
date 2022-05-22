<template>
  <oxd-icon
    :size="ICON_SIZE_SMALL"
    name="oxd-help-popup"
    :help-tooltip="$vt(helpText)"
    :position="helpPosition"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import {HelpPosition, BOTTOM_RIGHT, HELP_POSITIONS} from './types';
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
    helpPosition: {
      type: String,
      default: BOTTOM_RIGHT,
      validator: (value: HelpPosition) => {
        return HELP_POSITIONS.indexOf(value) !== -1;
      },
    },
  },
});
</script>
<style src="./help-popup-icon.scss" lang="scss" scoped></style>
