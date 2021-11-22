<template>
  <div class="oxd-table-sidebar" :style="customStyles">
    <div class="header">
      <slot name="header">
        <oxd-button
          class="w-100"
          :label="buttonData.label"
          :iconName="buttonData.iconName"
          :size="buttonData.size"
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
      <slot name="body">
        <oxd-select-input-btn
          :button="dropdownButtonData"
          :options="options"
          :open-dropdown-initially="true"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import SelectInputButton from '@orangehrm/oxd/core/components/Input/Select/SelectInputButton.vue';

export default defineComponent({
  name: 'oxd-table-filter',

  components: {
    'oxd-divider': Divider,
    'oxd-button': Button,
    'oxd-select-input-btn': SelectInputButton
  },

  props: {
    button: {
      type: Object,
      default: () => {}
    },
    dropdownButton: {
      type: Object,
      default: () => {}
    },
    width: {
      type: String,
      default: '100%'
    },
    options: {
      type: Array
    }
  },

  setup(props) {
    // TODO: Optimize these duplicated methods; Sandamal
    const buttonData = computed(() => {
      const initialObject = {
        label: 'Button',
        iconName: 'plus',
        iconImageSrc: null,
        size: 'long',
        displayType: 'secondary'
      }
      for (var key in props.button) {
        const value = props.button[key]
        if (initialObject[key] && value) {
          initialObject[key] = value
        }
      }
      return initialObject
    })
    const dropdownButtonData = computed(() => {
      const initialObject = {
        label: 'Button',
        iconName: 'plus',
        iconImageSrc: null,
        size: 'long',
        displayType: 'secondary'
      }
      for (var key in props.dropdownButton) {
        const value = props.dropdownButton[key]
        if (initialObject[key] && value) {
          initialObject[key] = value
        }
      }
      return initialObject
    })
    const customStyles = computed(() => {
      return {
        width: props.width
      }
    })
    return {
      customStyles,
      buttonData,
      dropdownButtonData
    }
  },
});
</script>

<style src="./../Label/label.scss" lang="scss" scoped></style>
<style src="./table-sidebar.scss" lang="scss" scoped></style>
