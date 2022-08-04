<template>
  <div class="drawer-wrapper">
    <div v-if="modalState" class="overlay"></div>
    <div
      class="oxd-drawer"
      ref="wrapper"
      :class="drawerStyleClasses"
      :style="[styles, drawerPositionX]"
      v-click-outside="clickOutside"
    >
      <div class="drawer-header" ref="header">
        <slot name="header">
          <h5 v-text="title"></h5>
        </slot>
      </div>
      <div class="drawer-body" :style="bodyHeight">
        <slot name="body"></slot>
      </div>
      <div class="drawer-footer" ref="footer">
        <slot name="footer">
          <oxd-button
            class="default-btn--cancel"
            :label="cancelButtonData.label"
            :iconName="cancelButtonData.iconName"
            :size="cancelButtonData.size"
            :style="cancelButtonData.style"
            :displayType="cancelButtonData.displayType"
            @click="cancelButtonData.click"
          />
          <oxd-button
            class="default-btn--save"
            :label="okButtonData.label"
            :iconName="okButtonData.iconName"
            :size="okButtonData.size"
            :style="okButtonData.style"
            :displayType="okButtonData.displayType"
            @click="okButtonData.click"
          />
        </slot>
      </div>
      <div v-if="false" class="trigger">
        <slot name="trigger"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, onMounted, ref, reactive} from 'vue';
import {DrawerPosition, RIGHT, POSITIONS, Drawer} from './types';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import clickOutsideDirective from './../../../directives/click-outside';

export default defineComponent({
  components: {
    'oxd-button': Button,
  },

  props: {
    autoAlign: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: RIGHT,
      validator: (value: DrawerPosition) => {
        return POSITIONS.indexOf(value) !== 1;
      },
    },
    width: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
    fullHeight: {
      type: Boolean,
      default: false,
    },
    stickyFooter: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    okButton: {
      type: Object,
      default: () => null,
    },
    cancelButton: {
      type: Object,
      default: () => null,
    },
    modalState: {
      type: Boolean,
      default: false,
    },
  },

  directives: {
    'click-outside': clickOutsideDirective,
  },

  setup(props, {emit}) {
    const wrapper = ref<HTMLElement>();
    const header = ref<HTMLElement>();
    const footer = ref<HTMLElement>();
    const state: Drawer = reactive({
      open: false,
      wrapperHeight: 0,
      footerHeight: 0,
      headerHeight: 0,
    });
    const alignments = computed(() => {
      const styles = [];
      if (props.autoAlign) {
        styles.push('auto-align');
        if (props.position) {
          styles.push(props.position);
        }
      }
      return styles.join(' ');
    });

    const drawerStyleClasses = computed(() => {
      return [
        alignments,
        {'sticky-footer': props.stickyFooter},
        {opened: props.modalState},
      ];
    });

    const toggleDrawer = (isOpen: boolean) => {
      state.open = isOpen;
    };

    const defaultOkAction = () => {
      emit('drawer:click-ok');
      toggleDrawer(true);
    };

    const clickOutside = () => {
      emit('drawer:click-outside');
    };

    const drawerPositionX = computed(() => {
      let transform = '';
      if (props.position === 'right') {
        transform = `translateX(${props.modalState ? '0px' : props.width})`;
      } else {
        transform = `translateX(${
          props.modalState ? '0px' : `-${props.width}`
        })`;
      }
      return `transform: ${transform}`;
    });

    const styles = computed(() => {
      return {
        width: props.width,
        height: props.fullHeight ? '100vh' : props.height ? props.height : null,
        position: props.fixed ? 'fixed' : 'position',
        transform: drawerPositionX,
      };
    });
    const bodyHeight = computed(() => {
      const totalHeightToRemove =
        state.wrapperHeight - (state.headerHeight + state.footerHeight + 20);
      return {
        height: `${totalHeightToRemove}px`,
      };
    });
    const okButtonData = computed(() => {
      const initialObject = {
        label: 'Save',
        iconName: null,
        iconImageSrc: null,
        size: 'medium',
        displayType: 'secondary',
        style: null,
        click: defaultOkAction,
      };
      for (const key in props.okButton) {
        const value = props.okButton[key];
        if (value) {
          initialObject[key] = value;
        }
      }
      return initialObject;
    });

    const cancelButtonData = computed(() => {
      const initialObject = {
        label: 'Cancel',
        iconName: null,
        iconImageSrc: null,
        size: 'medium',
        displayType: 'ghost',
        style: null,
        click: emit('drawer:click-cancel'),
      };
      for (const key in props.cancelButton) {
        const value = props.cancelButton[key];
        if (value) {
          initialObject[key] = value;
        }
      }
      return initialObject;
    });

    onMounted(() => {
      state.wrapperHeight = wrapper.value.clientHeight;
      state.headerHeight = header.value.clientHeight;
      state.footerHeight = footer.value.clientHeight;
    });
    return {
      state,
      wrapper,
      header,
      footer,
      styles,
      alignments,
      bodyHeight,
      okButtonData,
      cancelButtonData,
      drawerPositionX,
      clickOutside,
      drawerStyleClasses,
    };
  },
});
</script>

<style src="./drawer.scss" lang="scss" scoped></style>
