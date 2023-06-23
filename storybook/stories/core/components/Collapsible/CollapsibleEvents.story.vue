<template>
  <div>
    <oxd-collapsible
      :headerTitle="'Collapsible Component'"
      @toggle="onToggle"
    >
    <template #commonContent>
      <div>This the Common Content</div>
    </template>
    <template #collapsedContent>
      <div>This the Collapsed View</div>
    </template>
    <template #expandedContent>
      <div>This the Expanded View</div>
    </template>
    </oxd-collapsible>
  </div>
  <div style="margin-top: 2rem">
    <span v-if="ToggleEvent">Toggle Event Triggered <br> Toggle data {{ToggleInfo}}</span>
  </div>
</template>

<script>
import Collapsible from '@orangehrm/oxd/core/components/Collapsible/Collapsible.vue';
import { ref } from "vue";

export default {
  data() {
    return {
      ToggleEvent: false,
      ToggleInfo : "",
    };
  },

  components: {
    'oxd-collapsible': Collapsible,
  },
  methods: {
    clearFields() {
      this.ToggleEvent = false;

    },
    onToggle(data) {
      this.clearFields();
      this.ToggleEvent = true;
      this.ToggleInfo=data;
    },
  },
};
</script>
