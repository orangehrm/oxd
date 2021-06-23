<template>
  <li class="oxd-tree-node" :class="nodeClasses">
    <div
      :ref="cuid"
      v-if="showRoot"
      :class="nodeClasses"
      class="oxd-tree-node-wrapper"
    >
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
    <div class="oxd-tree-node-liner" :style="lineStyles"></div>
    <transition
      :name="animation"
      v-if="hasChildren"
      @after-leave="onAnimationComplete"
    >
      <ul class="oxd-tree-node-child" v-if="isOpen">
        <oxd-tree-node
          v-for="(child, index) in data.children"
          :key="child.cuid"
          :data="child"
          :animation="animation"
          :isLast="index + 1 === data.children.length"
        >
          <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
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
    isLast: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    'oxd-icon-button': IconButton,
  },
  setup(props) {
    const isOpen = ref(props.open);
    const isCollapsed = ref(!props.open);
    const height = ref(0);
    return {
      isOpen,
      isCollapsed,
      height,
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
        '--last': this.isLast,
      };
    },
    currentNode(): TNode {
      const {name, children, ...rest} = this.data;
      return {name, children, ...rest};
    },
    cuid(): string {
      return nanoid(8);
    },
    nodes(): TNode {
      return {...this.data, cuid: this.cuid};
    },
    lineStyles(): object {
      return {
        height: this.isLast ? this.height / 2 + 'px' : '100%',
      };
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
    calculateNodeHeight() {
      const node = this.$refs[this.cuid] as HTMLInputElement;
      this.height = node ? node.clientHeight : 0;
    },
  },
  mounted() {
    this.calculateNodeHeight();
  },
});
</script>

<style src="./tree-view.scss" lang="scss" scoped></style>
