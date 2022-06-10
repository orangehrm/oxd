<template>
  <div>
    <oxd-tabs
      :tabs="tabs"
      @focus="onFocus"
      @blur="onBlur"
      @click="onClick"
      @keyup.enter="onClick"
    >
    <template #tab1>
      <div>This is tab1</div>
    </template>
    <template #tab2>
      <div>This is tab2</div>
    </template>
    <template #tab3>
      <div>This is tab3</div>
    </template>
    </oxd-tabs>
  </div>
  <div style="margin-top: 2rem">
    <span v-if="FocusEvent">Focus Event Triggered <br> Tab data {{TabData}}</span>
    <span v-if="BlurEvent">Blur Event Triggered <br> Tab data {{TabData}} </span>
    <span v-if="ClickEvent">Click Event Triggered <br> Tab data {{TabData}}</span>
    <span v-if="KeyUpEnterEvent">KeyUp Enter Event Triggered <br> Tab data {{TabData}} </span>
  </div>
</template>

<script>
import Tabs from '@orangehrm/oxd/core/components/Tabs/Tabs.vue';
import { ref } from "vue";

export default {
  data() {
    const tabs = ref();
    tabs.value = [
      { id: "tab1", title: "Details" },
      { id: "tab2", title: "Resume" },
      { id: "tab3", title: "Note" },
    ];
    return {
      FocusEvent: false,
      BlurEvent: false,
      ClickEvent: false,
      KeyUpEnterEvent: false,
      TabData : "",
      tabs
    };
  },

  components: {
    'oxd-tabs': Tabs,
  },
  methods: {
    clearFields() {
      this.FocusEvent = false;
      this.BlurEvent = false;
      this.ClickEvent = false;
      this.KeyUpEnterEvent = false;
    },
    onFocus(event,tab) {
      this.clearFields();
      this.FocusEvent = true;
      this.TabData=tab;
    },
    onBlur(event,tab) {
      this.clearFields();
      this.BlurEvent = true;
      this.TabData=tab;
    },
    onClick(event,tab) {
      this.clearFields();
      this.ClickEvent = true;
      this.TabData=tab;
    },
    onKeyUpEnter(event,tab) {
      this.clearFields();
      this.KeyUpEnterEvent = true;
      this.TabData=tab;
      
    },
  },
};
</script>
