<template>
  <div class="oxd-list-title">
    <div class="oxd-list-title-content">
      <oxd-text type="card-title">
        {{ title }}
      </oxd-text>
      <oxd-button
        size="long"
        iconSize="xx-small"
        :label="mainButtonLabel"
        :displayType="mainButtonType"
        :iconName="mainButtonIconName"
        @click="onClickMainButton"
      />
    </div>
    <oxd-divider class="oxd-list-title-divider" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';

export default defineComponent({
  name: 'oxd-list-title',

  components: {
    'oxd-text': Text,
    'oxd-button': Button,
    'oxd-divider': Divider,
  },

  props: {
    title: {
      type: String,
      default: 'Main Title',
    },
    mainButtonLabel: {
      type: String,
      default: 'Main Button',
    },
    mainButtonType: {
      type: String,
      default: 'secondary',
    },
    mainButtonIconName: {
      type: String,
      default: 'oxd-add',
    },
  },

  emits: ['clickMainButton'],

  setup(_, context) {
    const onClickMainButton = ($event: Event) => {
      context.emit('clickMainButton', $event);
    };

    return {
      onClickMainButton,
    };
  },
});
</script>

<style lang="scss" src="./list2-title.scss" scoped></style>
