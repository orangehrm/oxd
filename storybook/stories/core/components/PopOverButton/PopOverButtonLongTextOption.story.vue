<template>
  <p>{{ selectedOption }} selected</p>
  <div class="story-container">
    <oxd-pop-over-button
      label="Add Schedule"
      size="medium"
      displayType="secondary"
      customPopOverButtonLabel="Add"
      :options="addScheduleOptions"
      :modelValue="selectedOption"
      @update:modelValue="onSelectOption"
    />
  </div>
</template>

<script lang="ts">
import {Option} from '@orangehrm/oxd/core/components/PopOverButton/types';
import {defineComponent, ref} from 'vue';
import PopOverButton from '@orangehrm/oxd/core/components/PopOverButton/PopOverButton.vue';

export default defineComponent({
  components: {
    'oxd-pop-over-button': PopOverButton,
  },

  setup: function () {
    const selectedOption = ref<Option>(null);

    const addScheduleOptions: Array<Option> = [
      {
        context: 'context_fixed',
        label: 'Fixed Schedule',
      },
      {
        context: 'context_daily',
        label:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        context: 'context_weekly',
        label: 'Flexible Schedule (Weekly)',
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
</style>
