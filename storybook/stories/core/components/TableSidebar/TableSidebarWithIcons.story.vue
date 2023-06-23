<template>
  <div class="container">
    <oxd-table-sidebar
      v-if="true"
      class="oxd-table-left-panel"
      :class="{'with-filters': true}"
      width="230px"
      :side-panel-list="sidePanelList"
      :header-visible="headerVisible"
      :body-visible="bodyVisible"
      :list-visible="listVisible"
      :bubble-visible="false"
      :side-panel-icon-visible="true"
      :button="buttonInfo"
      :selected-list-item-id="1"
      @sidePanelList:onSelect="sidePanelListOnSelect"
      @side-panel:onToggle="toggleSidePanel"
      @sidePanelList:onHeaderBtnClick="sidePanelListOnHeaderBtnClick"
      :is-side-panel-open="isLeftPanelOpen"
    >
      <template v-slot:sidePanelBody>
        <slot name="sidePanelBody"></slot>
      </template>
      <template v-slot:footer>
        <slot name="footer"></slot>
      </template>
    </oxd-table-sidebar>
  </div>
</template>

<script lang="ts">
import TableSidebar from '@orangehrm/oxd/core/components/TableSidebar/TableSidebar.vue';

import {defineComponent, ref, computed} from 'vue';
export default defineComponent({
  components: {
    'oxd-table-sidebar': TableSidebar,
  },
  props: {
    headerVisible: {
      type: Boolean,
      default: true,
    },
    bodyVisible: {
      type: Boolean,
      default: true,
    },
    listVisible: {
      type: Boolean,
      default: true,
    },
    sidePanelList: {
      type: Array,
      default: [],
    },
    buttonInfo: {
      type: Object,
      default: {},
    },
  },
  setup() {
    const isLeftPanelOpen = ref<boolean>(false);

    const sidePanelListOnSelect = (item) => {
      alert(`stage selected ${item}`);
    };

    const toggleSidePanel = () => {
      isLeftPanelOpen.value = !isLeftPanelOpen.value;
      alert('toggled');
    };

    const sidePanelListOnHeaderBtnClick = () => {
      alert('header button clicked');
    };

    return {
      isLeftPanelOpen,
      sidePanelListOnSelect,
      toggleSidePanel,
      sidePanelListOnHeaderBtnClick,
    };
  },
});
</script>

<style lang="scss" scoped></style>
