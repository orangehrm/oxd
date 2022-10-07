<template>
  <div
    class="oxd-table-left-panel"
    :style="customStyles"
    :class="
      secondaryButton
        ? isLeftPanelOpen
          ? 'with-secondary'
          : 'with-secondary with-secondary-collapsed'
        : ''
    "
  >
    <div v-if="headerVisible" class="oxd-table-left-panel--header">
      <slot name="header">
        <div
          v-if="headerActionButtonVisible"
          class="table-header-action-btn-container"
        >
          <div class="table-header-action-btns">
            <oxd-button
              class="table-header-action-btn"
              :class="
                !isLeftPanelOpen
                  ? 'no-label'
                  : secondaryButton
                  ? 'w-100'
                  : 'w-100'
              "
              :tooltip="!isLeftPanelOpen ? buttonData.label : null"
              flow="right"
              :label="buttonData.label"
              :iconName="buttonData.iconName"
              :iconSize="buttonData.iconSize"
              :size="buttonData.size"
              :style="buttonData.style"
              :disabled="buttonData.disabled"
              :disabledTooltip="buttonData.disabledTooltip"
              :displayType="buttonData.displayType"
              v-on="buttonData.disabled ? {} : {click: onHeaderBtnClick}"
            >
              <template v-if="buttonData.iconImageSrc" v-slot:icon>
                <img :src="buttonData.iconImageSrc" />
              </template>
            </oxd-button>
            <oxd-icon-button
              v-if="secondaryButton"
              class="table-header-action-secondary-btn"
              :class="!isLeftPanelOpen ? 'collapsed-btn' : ''"
              :size="secondaryButton.props.size || 'extra-large'"
              :name="secondaryButton.props.icon || 'oxd-new-folder'"
              :tooltip="secondaryButton.props.label || 'New Folder'"
              :icon-styles="secondaryButton.props.style"
              @click="onHeaderSecondaryBtnClick"
            />
          </div>
          <oxd-divider class="oxd-table-left-panel--separator" />
        </div>
      </slot>
    </div>
    <div v-if="bodyVisible" class="oxd-table-left-panel--body">
      <slot name="sidePanelBody"></slot>
    </div>
    <div v-if="listVisible" class="oxd-table-left-panel--footer list">
      <slot name="footer">
        <ul>
          <li
            v-for="(item, id) in sidePanelList"
            :key="id"
            :class="{collapsed: !isLeftPanelOpen}"
            @click="selectListItem(item)"
            @keyup.enter="selectListItem(item)"
          >
            <div
              class="count-container"
              :class="{active: selectedListItemId === item.id}"
            >
              <oxd-chip
                tabindex="0"
                v-if="bubbleVisible"
                :label="item.count"
                :tooltip="!isLeftPanelOpen ? $vt(item.label) : null"
                flow="right"
                class="oxd-dropdown-selected-chip"
                :displayType="item.displayType"
                :background-color="item.style.backgroundColor"
                :color="item.style.color"
              />
              <oxd-icon
                tabindex="0"
                v-if="sidePanelIconVisible"
                class="oxd-left-icon"
                :name="item.iconName"
                :tooltip="!isLeftPanelOpen ? $vt(item.label) : null"
              />
              <p v-if="isLeftPanelOpen" class="oxd-label">
                {{ $vt(item.label) }}
              </p>
            </div>
          </li>
        </ul>
      </slot>
    </div>
    <oxd-icon-button
      :name="isLeftPanelOpen ? 'oxd-arrow-left' : 'oxd-arrow-right'"
      class="oxd-table-left-panel--toggle-btn"
      size="xxx-small"
      @click="toggleLeftPanel"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref} from 'vue';
import Chip from '@orangehrm/oxd/core/components/Chip/Chip.vue';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';
import translateMixin from '../../../mixins/translate';

export default defineComponent({
  name: 'oxd-table-filter',

  components: {
    'oxd-chip': Chip,
    'oxd-button': Button,
    'oxd-icon-button': IconButton,
    'oxd-icon': Icon,
    'oxd-divider': Divider,
  },

  mixins: [translateMixin],

  props: {
    headerVisible: {
      type: Boolean,
      default: false,
    },
    headerActionButtonVisible: {
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
    sidePanelIconVisible: {
      type: Boolean,
      default: false,
    },
    button: {
      type: Object,
      default: () => null,
    },
    secondaryButton: {
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
    const isLeftPanelOpen = ref<boolean>(true);

    const buttonData = computed(() => {
      const initialObject = {
        label: 'Button',
        iconName: 'oxd-add',
        iconImageSrc: null,
        iconSize: 'medium',
        size: 'long',
        displayType: 'secondary',
        style: null,
        disabled: null,
        disabledTooltip: null,
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

    const onHeaderSecondaryBtnClick = () => {
      emit('sidePanelList:onHeaderSecondaryBtnClick');
    };

    const selectListItem = (item: {
      id: number;
      label: string;
      active: boolean;
    }) => {
      emit('sidePanelList:onSelect', item);
    };

    const toggleLeftPanel = () => {
      isLeftPanelOpen.value = !isLeftPanelOpen.value;
      emit('side-panel:onToggle', isLeftPanelOpen.value);
      document.dispatchEvent(
        new CustomEvent('collapsibleViewToggled', {bubbles: true}),
      );
    };

    return {
      customStyles,
      buttonData,
      isLeftPanelOpen,
      onHeaderBtnClick,
      onHeaderSecondaryBtnClick,
      selectListItem,
      toggleLeftPanel,
    };
  },
});
</script>

<style src="./../Label/label.scss" lang="scss" scoped></style>
<style src="./table-left-panel.scss" lang="scss" scoped></style>
