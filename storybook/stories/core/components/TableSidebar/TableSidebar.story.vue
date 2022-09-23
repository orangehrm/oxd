<template> 
  <div :style=" isLeftPanelOpen? 'width: 500px': 'width: 120px' " class="container" >
    <oxd-table-sidebar
      v-if="leftPanel.visible"
      class="oxd-table-left-panel"
      :class="{'with-filters': true}"
      width="200px"
      :side-panel-list="sidePanelList"
      :header-visible="headerVisible"
      :body-visible="bodyVisible"
      :list-visible="listVisible"
      :bubble-visible="bubbleVisible"
      :button="button"
      :secondary-button="secondaryButton"
      :selected-list-item-id="selectedListItemId"
      :header-action-button-visible="headerActionButtonVisible"
      @sidePanelList:onSelect="sidePanelListOnSelect"
      @side-panel:onToggle="toggleSidePanel"
      @sidePanelList:onHeaderBtnClick="sidePanelListOnHeaderBtnClick"
      @sidePanelList:onHeaderSecondaryBtnClick="
        sidePanelListOnHeaderSecondaryBtnClick
      "
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
import leftPanelTableList from './../List/list-with-sidebar/left-panel.table.list';
import topBarTableList from './../List/list-with-sidebar/top-bar.table.list';
import data from './../List/list-data.json';

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
    headerActionButtonVisible: {
      type: Boolean,
      default: true,
    },
    bubbleVisible: {
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
    selectedListItemId: {
      type: Number,
    },
    button: {
      type: Object,
      default: {},
    },
    secondaryButton: {
      type: Object,
      default: null,
    },
  },
  setup() {
    const isLeftPanelOpen = ref<boolean>(true);
    const leftPanel = computed(() => leftPanelTableList);
    const topBar = computed(() => topBarTableList);
    const dataObj = computed(() => {
      return data;
    });

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

    const sidePanelListOnHeaderSecondaryBtnClick = () => {
      alert('header secondary button clicked');
    };

    return {
      leftPanel,
      topBar,
      dataObj,
      isLeftPanelOpen,
      sidePanelListOnSelect,
      toggleSidePanel,
      sidePanelListOnHeaderBtnClick,
      sidePanelListOnHeaderSecondaryBtnClick,
    };
  },
});
</script>

<style lang="scss" scoped></style>
