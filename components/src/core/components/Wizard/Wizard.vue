<template>
  <div class="oxd-wizard">
    <div
      v-for="(tab, index) in tabs"
      :key="tab.id"
      :id="String(tab.id)"
      :tooltip="tab.disabled !== true ? tab.title : undefined"
      :class="{
        'oxd-wizard-tab': true,
        '--active': tab.id == modelValue,
        '--disabled': tab.disabled === true,
      }"
    >
      <div class="oxd-wizard-tab-circle">
        <div
          :class="{
            'oxd-wizard-tab-circle-tooltip': true,
            '--not-clickable': tab.clickable === false,
          }"
          :tooltip="tab.disabled !== true ? tab.title : undefined"
          @click="onTooltipClick(tab, $event)"
        ></div>
        <oxd-icon-button
          size="small"
          :name="getTabIconName(tab, index)"
          :disabled="tab.disabled === true"
          :class="{
            'oxd-wizard-tab-circle-button': true,
            '--active': tab.id == modelValue || tab.completed,
            '--not-clickable': tab.clickable === false,
          }"
          @click="onClick(tab, $event)"
          @focus="onFocus(tab, $event)"
          @blur="onBlur(tab, $event)"
        />
      </div>

      <div class="oxd-wizard-tab-title-container">
        <oxd-text
          tag="p"
          :class="{
            'oxd-wizard-tab-title-container--title': true,
            '--active': tab.id == modelValue,
            '--disabled': tab.disabled === true,
            '--not-clickable': tab.clickable === false,
          }"
          @click="onClick(tab, $event)"
        >
          {{ tab.title }}
        </oxd-text>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import {WizardTab, WIZARD_ICONS} from './types';

export default defineComponent({
  name: 'oxd-wizard',

  components: {
    'oxd-text': Text,
    'oxd-icon-button': IconButton,
  },

  emits: ['update:modelValue', 'tab-click', 'tab-focus', 'tab-blur'],

  props: {
    tabs: {
      type: Array as PropType<WizardTab[]>,
      required: true,
      validator: (value: WizardTab[]) => {
        return value.length >= 3 && value.length <= 6;
      },
    },
    modelValue: {
      type: Number,
      default: 1,
    },
    showCompletedIcon: {
      type: Boolean,
      default: false,
    },
    completedIconName: {
      type: String,
      default: 'oxd-check',
    },
  },

  setup(props, {emit}) {
    const onClick = (tab: WizardTab, event: Event) => {
      if (tab.disabled !== true && tab.clickable !== false) {
        emit('update:modelValue', tab.id);
        emit('tab-click', {tab, event});
      }
    };

    const onFocus = (tab: WizardTab, event: Event) => {
      emit('tab-focus', {tab, event});
    };

    const onBlur = (tab: WizardTab, event: Event) => {
      emit('tab-blur', {tab, event});
    };

    const onTooltipClick = (tab: WizardTab, event: Event) => {
      if (tab.disabled !== true && tab.clickable !== false) {
        emit('update:modelValue', tab.id);
        emit('tab-click', {tab, event});
      }
    };

    const getIconName = (index: number): string => {
      return WIZARD_ICONS[index as keyof typeof WIZARD_ICONS];
    };

    const getTabIconName = (tab: WizardTab, index: number): string => {
      if (
        tab.completed &&
        props.showCompletedIcon &&
        tab.id != props.modelValue
      ) {
        return props.completedIconName;
      }
      if (tab.iconName) {
        return tab.iconName;
      }
      return getIconName(index + 1);
    };

    return {
      getTabIconName,
      onClick,
      onFocus,
      onBlur,
      onTooltipClick,
    };
  },
});
</script>

<style lang="scss" src="./Wizard.scss" scoped></style>
