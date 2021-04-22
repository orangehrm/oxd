<template>
  <li class="oxd-tree-node" :class="nodeClasses">
    <div v-if="showRoot" class="oxd-tree-node-wrapper" :class="nodeClasses">
      <span v-if="hasChildren" class="oxd-tree-node-toggle">
        <oxd-icon-button
          @click="onClickNode"
          :name="isOpen ? 'chevron-up' : 'chevron-down'"
          role="none"
        />
      </span>
      <div class="oxd-tree-node-content">
        <slot name="content" :node-data="currentNode"></slot>
        <template v-if="!$slots['content']">
          {{ data.name }}
        </template>
      </div>
    </div>
    <transition
      :name="animation"
      v-if="hasChildren"
      @after-leave="onAnimationComplete"
    >
      <ul class="oxd-tree-node-child" v-show="isOpen">
        <oxd-tree-node
          v-for="child in data.children"
          :key="child.cuid"
          :data="child"
          :animation="animation"
        >
          <template v-for="(_, name) in $slots" v-slot:[name]="slotData"
            ><slot :name="name" v-bind="slotData"
          /></template>
        </oxd-tree-node>
      </ul>
    </transition>
  </li>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import {TNode} from './types';
import {nanoid} from 'nanoid';

export default defineComponent({
  name: 'oxd-tree-node',
  props: {
    data: {
      type: Object as PropType<TNode>,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
    showRoot: {
      type: Boolean,
      default: true,
    },
    animation: {
      type: String,
      default: 'transition-fade-down',
    },
  },
  components: {
    'oxd-icon-button': IconButton,
  },
  setup(props) {
    const isOpen = ref(props.open);
    const isCollapsed = ref(!props.open);
    return {
      isOpen,
      isCollapsed,
    };
  },
  computed: {
    hasChildren(): boolean {
      return this.data.children && this.data.children.length;
    },
    nodeClasses(): object {
      return {
        '--parent': this.hasChildren,
        '--open': !this.isCollapsed && this.hasChildren,
      };
    },
    currentNode(): TNode {
      const {name, children, ...rest} = this.data;
      return {name, children, ...rest};
    },
    nodes(): TNode {
      return {...this.data, cuid: nanoid(8)};
    },
  },
  methods: {
    onClickNode() {
      if (this.hasChildren) {
        this.isOpen = !this.isOpen;
        this.isCollapsed = false;
      }
    },
    onAnimationComplete() {
      this.isCollapsed = true;
    },
  },
});
</script>

<style src="./tree-view.scss" lang="scss" scoped></style>
