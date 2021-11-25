<template>
  <div class="oxd-table-sidebar" :style="customStyles">
    <div class="header">
      <slot name="header">
        <oxd-button
          class="w-100"
          :label="buttonData.label"
          :iconName="buttonData.iconName"
          :size="buttonData.size"
          :style="buttonData.style"
          :displayType="buttonData.displayType"
          @click="onToggleDropdown"
        >
          <template v-if="buttonData.iconImageSrc" v-slot:icon>
            <img :src="buttonData.iconImageSrc" />
          </template>
        </oxd-button>
        <oxd-divider />
      </slot>
    </div>
    <div class="body">
      <slot name="body"></slot>
    </div>
    <div class="list">
      <slot name="list">
        <ul>
          <li
            v-for="(item, id) in list"
            :key="id"
            @click="selectListitem(item)"
            :class="{
              active: selectedListItem.id
                ? selectedListItem.id === item.id
                : selectedStageId === item.id,
            }"
          >
            <div class="count-container">
              <oxd-chip
                :label="item.count"
                class="oxd-dropdown-selected-chip"
                :displayType="item.displayType"
                :background-color="item.style.backgroundColor"
                :color="item.style.color"
              />
            </div>
            <p class="oxd-label">{{ item.label }}</p>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref} from 'vue';
import Chip from '@orangehrm/oxd/core/components/Chip/Chip.vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';

export default defineComponent({
  name: 'oxd-table-filter',

  components: {
    'oxd-chip': Chip,
    'oxd-divider': Divider,
    'oxd-button': Button,
  },

  props: {
    button: {
      type: Object,
      default: () => null,
    },
    width: {
      type: String,
      default: '100%',
    },
    list: {
      type: Array,
      default: () => [],
    },
    selectedStageId: {
      type: Number,
    },
  },

  setup(props, {emit}) {
    const selectedListItem = ref<{
      id: number;
      label: string;
      active: boolean;
    }>({
      id: null,
      label: null,
      active: false,
    });

    // TODO: Optimize these duplicated methods; Sandamal
    const buttonData = computed(() => {
      const initialObject = {
        label: 'Button',
        iconName: 'plus',
        iconImageSrc: null,
        size: 'long',
        displayType: 'secondary',
        style: null,
      }
      for (const key in props.button) {
        const value = props.button[key]
        if (value) {
          initialObject[key] = value;
        }
      }
      return initialObject;
    });

    const customStyles = computed(() => {
      return {
        width: props.width,
      };
    });

    const selectListitem = (item: {
      id: number;
      label: string;
      active: boolean;
    }) => {
      selectedListItem.value = item;
      emit('list:onSelect', item);
    }

    return {
      selectedListItem,
      customStyles,
      buttonData,
      selectListitem,
    }
  },
});
</script>

<style src="./../Label/label.scss" lang="scss" scoped></style>
<style src="./table-sidebar.scss" lang="scss" scoped></style>

<style lang="scss" scoped>
.list {
  margin-top: 1.5rem;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      border-radius: 1.5rem;
      .count-container {
        width: 45px;
        height: 26px;
        .oxd-dropdown-selected-chip {
          min-width: 20px;
          width: auto;
          padding: 4px 9px;
          font-size: 0.75rem;
          font-weight: 700;
          font-family: 'Nunito Sans', sans-serif;
        }
      }
      .oxd-label {
        margin-left: 0.5rem;
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
        font-size: 0.75rem;
        line-height: normal;
      }
      &:hover,
      &.active {
        background-color: rgba(100, 114, 140, 0.1);
        cursor: pointer;
      }
      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
