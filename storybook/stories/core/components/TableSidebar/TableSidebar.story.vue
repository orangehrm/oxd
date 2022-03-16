<template>
  <div class="container">
    <oxd-table-sidebar
      v-if="leftPanel.visible"
      class="oxd-table-left-panel"
      :class="{'with-filters': topBar.visible}"
      width="250px"
      :side-panel-list="dataObj.stages"
      :header-visible="leftPanel.header.visible"
      :body-visible="leftPanel.body.visible"
      :list-visible="leftPanel.list.visible"
      :bubble-visible="leftPanel.list.bubble.visible"
      :button="leftPanel.header.button"
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
import leftPanelTableList from './../List/list-schema/left-panel.table.list';
import topBarTableList from './../List/list-schema/top-bar.table.list';
import data from './../List/list-data.json';

import {defineComponent, ref, computed} from 'vue';
export default defineComponent({
  components: {
    'oxd-table-sidebar': TableSidebar
  },
  setup() {
    const isLeftPanelOpen = ref<boolean>(false)
    const leftPanel = computed(() => leftPanelTableList)
    const topBar = computed(() => topBarTableList)
    const dataObj = computed(() => {
      return data
    })

    const sidePanelListOnSelect = item => {
      alert(`stage selected ${item}`)
    };

    const toggleSidePanel = () => {
      isLeftPanelOpen.value = !isLeftPanelOpen.value
      alert('toggled')
    }

    const sidePanelListOnHeaderBtnClick = () => {
      alert('header button clicked')
    };

    return {
      leftPanel,
      topBar,
      dataObj,
      isLeftPanelOpen,
      sidePanelListOnSelect,
      toggleSidePanel,
      sidePanelListOnHeaderBtnClick,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
