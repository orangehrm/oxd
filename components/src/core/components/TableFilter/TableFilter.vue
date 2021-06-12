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
        <div class="--toggle">
          <oxd-icon-button
            :name="isActive ? 'caret-up-fill' : 'caret-down-fill'"
            @click="toggleFilters"
          />
        </div>
      </div>
    </div>
    <oxd-divider v-show="isActive" />
    <div v-show="isActive" class="oxd-table-filter-area">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watchEffect} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import useResponsive, {
  DEVICE_LG,
  DEVICE_XL,
} from '../../../composables/useResponsive';

export default defineComponent({
  name: 'oxd-table-filter',

  components: {
    'oxd-text': Text,
    'oxd-divider': Divider,
    'oxd-icon-button': IconButton,
  },

  props: {
    filterTitle: {
      type: String,
      required: true,
    },
  },

  setup() {
    const responsiveState = useResponsive();
    const isActive = ref(true);

    const toggleFilters = () => {
      isActive.value = !isActive.value;
    };

    watchEffect(() => {
      isActive.value =
        responsiveState.screenType === DEVICE_LG ||
        responsiveState.screenType === DEVICE_XL;
    });

    return {
      isActive,
      toggleFilters,
    };
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
