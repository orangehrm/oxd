<template>
  <div class="oxd-table-filter">
    <div class="oxd-table-filter-header">
      <div class="oxd-table-filter-header-title">
        <oxd-text class="oxd-table-filter-title" tag="h5">{{
          filterTitle
        }}</oxd-text>
      </div>
      <div class="oxd-table-filter-header-options">
        <div class="--toggle">
          <slot name="toggleOptions"></slot>
        </div>
        <div class="--export">
          <slot name="exportOptions"></slot>
        </div>
      </div>
    </div>
    <oxd-divider />
    <div class="oxd-table-filter-area">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';

export default defineComponent({
  name: 'oxd-table-filter',

  components: {
    'oxd-text': Text,
    'oxd-divider': Divider,
  },

  props: {
    filterTitle: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isActive: false,
    };
  },

  methods: {
    openSubmenu() {
      this.isActive = true;
    },
    closeSubMenu() {
      this.isActive = false;
    },
  },
});
</script>

<style src="./table-filter.scss" lang="scss" scoped></style>
<style lang="scss">
.oxd-table-filter-header-options {
  & .oxd-icon-button {
    font-size: 12px;
    width: 24px !important;
    height: 24px !important;
    min-width: unset;
    min-height: unset;
    margin-right: 5px;
  }
  & .oxd-button {
    padding-right: 5px;
    padding-left: 5px;
    min-width: unset;
    margin-right: 5px;
  }
}
</style>
