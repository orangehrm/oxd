<template>
  <p>option - {{ selectedOption }}</p>
  <div class="story-container">
    <oxd-pop-over-button
      size="medium"
      displayType="secondary"
      :options="addScheduleOptions"
      :modelValue="selectedOption"
      :customPopOverButtonLabel="'Add Schedule'"
      @update:modelValue="onSelectOption"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import PopOverButton from '@orangehrm/oxd/core/components/PopOverButton/PopOverButton.vue';
import {Option} from '@orangehrm/oxd/core/components/PopOverButton/types';

export default defineComponent({
  components: {
    'oxd-pop-over-button': PopOverButton,
  },

  setup: function () {
    const addScheduleOptions: Array<Option> = [
      {
        context: 'context_fixed',
        label: 'Fixed Schedule',
      },
      {
        context: 'context_daily',
        label: 'Flexible Schedule (Daily)',
      },
      {
        context: 'context_weekly',
        label: 'Flexible Schedule (Weekly)',
      },
    ];

    const selectedOption = ref<Option>(null);
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
</style>
