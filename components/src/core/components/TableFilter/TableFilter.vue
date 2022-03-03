<template>
  <div class="oxd-table-filter">
    <div class="oxd-table-filter-header" :class="{spilled: isSpilled}">
      <div class="oxd-table-filter-header-title">
        <oxd-text class="oxd-table-filter-title" tag="h5">{{
          filterTitle
        }}</oxd-text>
      </div>
      <div class="oxd-table-filter-header-bulk-actions">
        <div class="--actions">
          <slot name="actionOptions"></slot>
        </div>
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
    <oxd-divider v-show="isActive" />
  </div>
</template>

<script lang="ts">
import {defineComponent, nextTick, ref, watchEffect} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';
import useResponsive, {
  DEVICE_LG,
  DEVICE_XL,
} from '../../../composables/useResponsive';

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
    itemsSelected: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const responsiveState = useResponsive();
    const isActive = ref(true);
    const isSpilled = ref(true);

    const toggleFilters = () => {
      isActive.value = !isActive.value;
    };

    const updateIsSpilled = () => {
      nextTick(function() {
        const titleWidth = document.getElementsByClassName(
          'oxd-table-filter-header-title',
        )[0]
          ? document.getElementsByClassName('oxd-table-filter-header-title')[0]
              .clientWidth
          : 0;
        const actionButtonWidth = document.getElementsByClassName(
          'oxd-table-filter-header-bulk-actions',
        )[0]
          ? document.getElementsByClassName(
              'oxd-table-filter-header-bulk-actions',
            )[0].clientWidth
          : 0;
        const fullWidth = document.getElementsByClassName(
          'oxd-table-filter-header',
        )[0]
          ? document.getElementsByClassName('oxd-table-filter-header')[0]
              .clientWidth
          : 0;
        const filterWidth = document.getElementsByClassName(
          'oxd-table-filter-header-options',
        )[0]
          ? document.getElementsByClassName(
              'oxd-table-filter-header-options',
            )[0].clientWidth
          : 0;
        isSpilled.value =
          props.itemsSelected &&
          titleWidth + actionButtonWidth + filterWidth > fullWidth;
      });
    };

    watchEffect(() => {
      isActive.value =
        responsiveState.screenType === DEVICE_LG ||
        responsiveState.screenType === DEVICE_XL;
    });
    watchEffect(() => {
      props.itemsSelected;
      responsiveState.windowWidth;
      updateIsSpilled();
    });

    document.addEventListener('collapsibleViewToggled', updateIsSpilled);
    return {
      isActive,
      isSpilled,
      toggleFilters,
    };
  },
});
</script>

<style src="./table-filter.scss" lang="scss" scoped></style>
<style lang="scss">
.oxd-table-filter {
  .oxd-table-filter-header-options {
    & .oxd-icon-button,
    .oxd-button {
      margin-left: 5px;
    }
    .oxd-button.with-icon {
      padding: 0.5rem 1rem;
      min-width: unset;
    }
  }
}
</style>
