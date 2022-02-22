<template>
  <div class="container">
    <oxd-table-sidebar
      v-if="true"
      class="oxd-table-left-panel"
      :class="{'with-filters': true}"
      width="230px"
      :side-panel-list="stages"
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
    const stages = [
      {
        "id": 1,
        "label": "All Reports",
        "iconName": "oxd-all-reports",
      },
      {
        "id": 2,
        "label": "Standard Reports",
        "iconName": "oxd-standard-reports",
      },
      {
        "id": 3,
        "label": "My Reports",
        "iconName": "oxd-my-reports",
      }
    ];

    const headerVisible = true;
    const bodyVisible = true;
    const listVisible = true;
    const buttonInfo = {
      "props": {
        "label": "New Report",
        "displayType": "secondary",
        "size": "long",
        "display-type": "label-info",
        "icon-name": "oxd-add"
      }
    }

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
      stages,
      headerVisible,
      bodyVisible,
      listVisible,
      buttonInfo
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
