<template>
  <p>context - {{ selectedOptionContext }}</p>
  <p>option - {{ selectedOption }}</p>
  <div class="story-container">
    <oxd-pop-over-button
      label="Add Schedule"
      size="medium"
      displayType="secondary"
      iconName="oxd-add"
      iconSize="small"
      :options="addScheduleOptions"
      @click="onSelectOption"
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
    const selectedOption = ref<string>('nothing');
    const selectedOptionContext = ref<Option>(null);

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

    const onSelectOption = (optionContext: string, option: Option) => {
      console.log('selected');
      selectedOptionContext.value = optionContext;
      selectedOption.value = option;
    };

    return {
      addScheduleOptions,
      onSelectOption,
      selectedOptionContext,
      selectedOption,
    };
  },
});
</script>
<style scoped lang="scss">
.story-container {
  padding-left: 20px;
  display: flex;
}
</style>
