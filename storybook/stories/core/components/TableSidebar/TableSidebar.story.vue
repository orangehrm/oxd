<template>
  <div class="container">
    <oxd-table-sidebar
      v-if="configurations.table.leftPanel.visible"
      class="oxd-table-left-panel"
      :class="{'with-filters': configurations.table.topBar.visible}"
      width="230px"
      :side-panel-list="dataObj.stages"
      :header-visible="configurations.table.leftPanel.header.visible"
      :body-visible="configurations.table.leftPanel.body.visible"
      :list-visible="configurations.table.leftPanel.list.visible"
      :bubble-visible="configurations.table.leftPanel.list.bubble.visible"
      :button="configurations.table.leftPanel.header.button"
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
import SelectInputButton from '@orangehrm/oxd/core/components/Input/Select/SelectInputButton.vue';
import list from './../List/list-config.json'
import data from './../List/list-data.json';

import {defineComponent, ref, computed} from 'vue';
export default defineComponent({
  components: {
    'oxd-table-sidebar': TableSidebar
  },
  setup() {
    const isLeftPanelOpen = ref<boolean>(false)
    const configurations = computed(() => list)
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
      configurations,
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
