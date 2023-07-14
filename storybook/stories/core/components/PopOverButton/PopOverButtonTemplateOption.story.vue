<template>
  <p>{{ selectedOption }} selected</p>
  <div class="story-container">
    <oxd-pop-over-button
      customPopOverButtonLabel="Add"
      size="medium"
      displayType="secondary"
      iconName="oxd-add"
      iconSize="small"
      :options="addScheduleOptions"
      :dropdownAlignment = "'RIGHT'"
      :modelValue="selectedOption"
      @update:modelValue="onSelectOption"
    >
      <template v-slot:option="{data}">
        <div class="d-flex justify-between align-center w-100">
          <oxd-chip class="pop-over-chip" :label="data.context" />
          <span v-html="data.label"></span>
        </div>
      </template>
    </oxd-pop-over-button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import PopOverButton from '@orangehrm/oxd/core/components/PopOverButton/PopOverButton.vue';
import OxdChip from '@orangehrm/oxd/core/components/Chip/Chip';
import {Option} from '@orangehrm/oxd/core/components/PopOverButton/types';

export default defineComponent({
  components: {
    'oxd-pop-over-button': PopOverButton,
    'oxd-chip': OxdChip,
  },

  setup: function () {
    const selectedOption = ref<Option>(null);

    const addScheduleOptions: Array<Option> = [
      {
        context: 'fixed',
        label: 'Fixed',
      },
      {
        context: 'daily',
        label: 'Daily',
      },
      {
        context: 'weekly',
        label: 'Weekly',
      },
    ];

    const onSelectOption = (option: Option) => {
      selectedOption.value = option;
    };

    return {
      addScheduleOptions,
      onSelectOption,
      selectedOption,
    };
  },
});
</script>
<style scoped lang="scss">
.story-container {
  padding-left: 100px;
  display: flex;
}
.pop-over-chip {
  white-space: nowrap;
}
</style>
