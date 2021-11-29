<template>
  <div class="drawer-wrapper">
    <div v-if="modalState" class="overlay"></div>
    <div
      class="oxd-drawer"
      ref="wrapper"
      :class="[
        alignments,
        {'sticky-footer': stickyFooter},
        {opened: modalState},
      ]"
      :style="[styles, drawerPositionX]"
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
import {defineComponent, computed, onMounted, ref} from 'vue';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';

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
      default: 'right',
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

  setup(props, {emit}) {
    const open = ref(false);
    const wrapper = ref(null);
    const header = ref(null);
    const footer = ref(null);
    const wrapperWidth = ref(0);
    const wrapperHeight = ref(0);
    const footerHeight = ref(0);
    const headerHeight = ref(0);
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

    const toggleDrawer = (isOpen: boolean) => {
      open.value = isOpen;
    };

    const defaultOkAction = () => {
      emit('drawer:click-ok');
      toggleDrawer(true);
    };

    const drawerPositionX = computed(() => {
      let transform = '';
      if (props.position === 'right') {
        transform = `translateX(${
          props.modalState ? '0px' : `${wrapperHeight.value}px`
        })`;
      } else {
        transform = `translateX(${
          props.modalState ? '0px' : `-${wrapperHeight.value}px`
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
        wrapperHeight.value - (headerHeight.value + footerHeight.value);
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
      wrapperWidth.value = wrapper.value.clientWidth;
      wrapperHeight.value = wrapper.value.clientHeight;
      headerHeight.value = header.value.clientHeight;
      footerHeight.value = footer.value.clientHeight;
    });
    return {
      open,
      wrapper,
      header,
      footer,
      styles,
      alignments,
      bodyHeight,
      okButtonData,
      cancelButtonData,
      drawerPositionX,
    };
  },
});
</script>

<style src="./drawer.scss" lang="scss"></style>
