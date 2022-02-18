<template>
  <div class="oxd-table-left-panel" :style="customStyles">
    <div v-if="headerVisible" class="header">
      <slot name="header">
        <oxd-button
            class="table-header-action-btn"
            :class="!isLeftPanelOpen ? 'no-label' : 'w-100'"
            :tooltip="!isLeftPanelOpen ? buttonData.label : null"
            flow="right"
            :label="buttonData.label"
            :iconName="buttonData.iconName"
            :size="buttonData.size"
            :style="buttonData.style"
            :displayType="buttonData.displayType"
            @click="onHeaderBtnClick"
        >
          <template v-if="buttonData.iconImageSrc" v-slot:icon>
            <img :src="buttonData.iconImageSrc" />
          </template>
        </oxd-button>
      </slot>
      <oxd-divider />
    </div>
    <div v-if="bodyVisible" class="body">
      <slot name="sidePanelBody"></slot>
    </div>
    <div v-if="listVisible" class="oxd-sidebar-footer list">
      <slot name="footer">
        <ul>
          <li
              v-for="(item, id) in sidePanelList"
              :key="id"
              @click="selectListitem(item)"
              :class="{collapsed: !isLeftPanelOpen}"
          >
            <div
                class="count-container"
                :class="{active: selectedListItem.id === item.id}"
            >
              <oxd-icon class="left-icon" :name="item.iconName" :tooltip="item.tooltip"/>
              <p v-if="isLeftPanelOpen" class="oxd-label">{{ item.label }}</p>
            </div>
          </li>
        </ul>
      </slot>
    </div>
    <oxd-icon-button
        :name="isLeftPanelOpen ? 'chevron-left' : 'chevron-right'"
        class="oxd-table-left-panel-toggle-btn"
        @click="toggleLeftPanel"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref} from 'vue';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';

export default defineComponent({
  name: 'oxd-table-icon-filter',

  components: {
    'oxd-divider': Divider,
    'oxd-icon': Icon,
    'oxd-button': Button,
    'oxd-icon-button': IconButton,
  },

  props: {
    headerVisible: {
      type: Boolean,
      default: false,
    },
    bodyVisible: {
      type: Boolean,
      default: false,
    },
    listVisible: {
      type: Boolean,
      default: false,
    },
    bubbleVisible: {
      type: Boolean,
      default: true,
    },
    button: {
      type: Object,
      default: () => null,
    },
    width: {
      type: String,
      default: '100%',
    },
    sidePanelList: {
      type: Array,
      default: () => [],
    },
    selectedListItemId: {
      type: Number,
    },
  },

  setup(props, {emit}) {
    const selectedListItem = ref<{
      id: number;
      label: string;
      active: boolean;
    }>({
      id: props.selectedListItemId,
      label: null,
      active: false,
    });
    const isLeftPanelOpen = ref<boolean>(true);

    // TODO: Optimize these duplicated methods; Sandamal
    const buttonData = computed(() => {
      const initialObject = {
        label: 'Button',
        iconName: 'oxd-add',
        iconImageSrc: null,
        size: 'long',
        displayType: 'secondary',
        style: null,
      };
      for (const key in props.button.props) {
        const value = props.button.props[key];
        if (value) {
          initialObject[key] = value;
        }
      }
      return initialObject;
    });

    const customStyles = computed(() => {
      return {
        width: isLeftPanelOpen.value ? props.width : null,
      };
    });

    const onHeaderBtnClick = () => {
      emit('sidePanelList:onHeaderBtnClick');
    };

    const selectListitem = (item: {
      id: number;
      label: string;
      active: boolean;
    }) => {
      selectedListItem.value = item;
      emit('sidePanelList:onSelect', item);
    };

    const toggleLeftPanel = () => {
      isLeftPanelOpen.value = !isLeftPanelOpen.value;
      emit('side-panel:onToggle', isLeftPanelOpen.value);
    };

    return {
      selectedListItem,
      customStyles,
      buttonData,
      isLeftPanelOpen,
      onHeaderBtnClick,
      selectListitem,
      toggleLeftPanel,
    };
  },
});
</script>

<style src="../Label/label.scss" lang="scss" scoped></style>
<style src="../TableSidebarWithIcons/table-left-panel.scss" lang="scss" scoped></style>
