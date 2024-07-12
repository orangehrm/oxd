<template>
  <a class="orangehrm-upgrade-link" :href="upgradeUrl">
    <oxd-glass-button
      v-if="showUpgradeButton"
      :label="label"
      size="large"
      class="orangehrm-upgrade-button"
    >
      <template #icon>
        <oxd-icon
          type="svg"
          name="upgrade"
          class="orangehrm-upgrade-icon"
        ></oxd-icon>
      </template>
    </oxd-glass-button>
  </a>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import OxdGlassButton from '@/components/Button/GlassButton.vue';
import OxdIcon from '@/components/Icon/Icon.vue';

export default defineComponent({
  name: 'UpgradeButton',
  components: {
    OxdIcon,
    OxdGlassButton,
    'oxd-glass-button': OxdGlassButton,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    showUpgradeButton: {
      type: Boolean,
      required: true,
    },
    upgradeUrl: {
      type: String,
      required: true,
    },
  },
});
</script>

<style src="./upgrade-button.scss" scoped lang="scss"></style>
