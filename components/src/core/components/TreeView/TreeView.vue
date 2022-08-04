<template>
  <ul class="oxd-tree-view">
    <oxd-tree-node v-bind="$attrs">
      <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </oxd-tree-node>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import TreeNode from '@orangehrm/oxd/core/components/TreeView/TreeNode.vue';

export default defineComponent({
  name: 'oxd-tree-view',
  inheritAttrs: false,
  components: {
    'oxd-tree-node': TreeNode,
  },
});
</script>

<style src="./tree-view.scss" lang="scss" scoped></style>
