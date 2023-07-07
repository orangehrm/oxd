<template>
  <oxd-sheet type="white" :gutters="false" :class="listPanelClasses">
    <div v-if="$slots['sidepanel']" :class="sidePanelClasses">
      <slot name="sidepanel" :collapsed="isCollapsed"></slot>
    </div>
    <div v-if="$slots['sidepanel']" class="oxd-list-divider">
      <oxd-divider orientation="vertical"></oxd-divider>
      <template v-if="showCollapse">
        <oxd-skeleton
          v-if="loading"
          :width="20"
          :height="20"
          :circle="true"
          class="skeleton-collapsebtn"
        />
        <oxd-icon-button
          v-else
          size="xxx-small"
          class="oxd-list-collapsebtn"
          :name="isCollapsed ? 'oxd-arrow-right' : 'oxd-arrow-left'"
          @click="onClickCollapse"
        />
      </template>
    </div>
    <div class="oxd-list-content">
      <template
        v-if="$slots['contentHeaderLeft'] || $slots['contentHeaderRight']"
      >
        <div class="oxd-list-content-header">
          <div class="oxd-list-content-header --left">
            <slot name="contentHeaderLeft"></slot>
          </div>
          <div class="oxd-list-content-header --right">
            <slot name="contentHeaderRight"></slot>
          </div>
        </div>
        <oxd-divider></oxd-divider>
      </template>
      <div class="oxd-list-content-body">
        <slot name="contentBody"></slot>
      </div>
      <br v-if="$slots['contentFooter']" />
      <div class="oxd-list-content-footer">
        <slot name="contentFooter"></slot>
      </div>
    </div>
  </oxd-sheet>
</template>

<script>
import {computed, defineComponent, ref} from 'vue';
import Sheet from '@orangehrm/oxd/core/components/Sheet/Sheet.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';

export default defineComponent({
  name: 'oxd-list',

  components: {
    'oxd-sheet': Sheet,
    'oxd-divider': Divider,
    'oxd-skeleton': Skeleton,
    'oxd-icon-button': IconButton,
  },

  props: {
    showCollapse: {
      type: Boolean,
      default: true,
    },
    flatTop: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const isCollapsed = ref(false);

    const onClickCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const sidePanelClasses = computed(() => ({
      'oxd-list-sidepanel': true,
      '--collapsed': isCollapsed.value,
    }));

    const listPanelClasses = computed(() => ({
      'oxd-list-card': true,
      '--flat-top': props.flatTop,
    }));

    return {
      isCollapsed,
      onClickCollapse,
      sidePanelClasses,
      listPanelClasses,
    };
  },
});
</script>

<style lang="scss" src="./list2.scss" scoped></style>
