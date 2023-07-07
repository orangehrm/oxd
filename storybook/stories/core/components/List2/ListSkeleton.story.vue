<template>
  <div class="bg-wrapper">
    <oxd-list :loading="isLoading">
      <template #sidepanel="{collapsed}">
        <oxd-status-tab-panel
          :loading="isLoading"
          :collapsed="collapsed"
          :filters="sidepanelFilters"
        >
        </oxd-status-tab-panel>
      </template>
      <template #contentHeaderLeft>
        <oxd-skeleton height="28px" width="220px" animate></oxd-skeleton>
      </template>
      <template #contentBody>
        <oxd-list-table
          :items="items"
          :skeleton="true"
          :flashing="true"
          :selectable="true"
          :headers="headers"
          :loading="isLoading"
          v-model:selected="checkedItems"
        ></oxd-list-table>
      </template>
    </oxd-list>
  </div>
</template>

<script>
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import List from '@orangehrm/oxd/core/components/List2/List2.vue';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';
import ListTable from '@orangehrm/oxd/core/components/ListTable/ListTable.vue';
import StatusTabPanel from '@orangehrm/oxd/core/components/List2Sidepanel/StatusTabPanel.vue';

export default {
  components: {
    'oxd-list': List,
    'oxd-text': Text,
    'oxd-skeleton': Skeleton,
    'oxd-list-table': ListTable,
    'oxd-status-tab-panel': StatusTabPanel,
  },

  data() {
    return {
      isLoading: true,
      items: [],
      headers: [
        {
          name: 'col1',
          sortField: 'col1.name',
          title: 'Column 1',
          style: {flex: 1},
        },
        {
          name: 'col2',
          title: 'Column 2',
          style: {flex: 1},
        },
        {
          name: 'action',
          title: 'Action',
          style: {flex: 1},
        },
      ],
      checkedItems: [],
      sidepanelFilters: [],
    };
  },
};
</script>

<style scoped>
.bg-wrapper {
  padding: 1rem;
  height: calc(100vh - 5vh);
  background-color: #f6f5fb;
}
</style>
