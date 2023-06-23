<template>
  <div>
    <oxd-tabs
      :tabs="tabs"
      @focus="onFocus"
      @blur="onBlur"
      @click="onClick"
      @keyup.enter="onClick"
    >
      <oxd-tab :tab="{id: 'tab1', title: 'Details'}">
        <div>This is tab1</div>
      </oxd-tab>
      <oxd-tab :tab="{id: 'tab2', title: 'Resume'}">
        <div>This is tab2</div>
      </oxd-tab>
      <oxd-tab :tab="{id: 'tab3', title: 'Note'}">
        <div>This is tab3</div>
      </oxd-tab>
    </oxd-tabs>
  </div>
  <div style="margin-top: 2rem">
    <span v-if="FocusEvent"
      >Focus Event Triggered <br />
      Tab data {{ TabData }}</span
    >
    <span v-if="BlurEvent"
      >Blur Event Triggered <br />
      Tab data {{ TabData }}
    </span>
    <span v-if="ClickEvent"
      >Click Event Triggered <br />
      Tab data {{ TabData }}</span
    >
    <span v-if="KeyUpEnterEvent"
      >KeyUp Enter Event Triggered <br />
      Tab data {{ TabData }}
    </span>
  </div>
</template>

<script>
import Tabs from '@orangehrm/oxd/core/components/Tabs/Tabs.vue';
import Tab from '@orangehrm/oxd/core/components/Tabs/Tab.vue';
import {ref} from 'vue';

export default {
  data() {
    const tabs = ref();
    tabs.value = [
      {id: 'tab1', title: 'Details'},
      {id: 'tab2', title: 'Resume'},
      {id: 'tab3', title: 'Note'},
    ];
    return {
      FocusEvent: false,
      BlurEvent: false,
      ClickEvent: false,
      KeyUpEnterEvent: false,
      TabData: '',
      tabs,
    };
  },

  components: {
    'oxd-tabs': Tabs,
    'oxd-tab': Tab,
  },
  methods: {
    clearFields() {
      this.FocusEvent = false;
      this.BlurEvent = false;
      this.ClickEvent = false;
      this.KeyUpEnterEvent = false;
    },
    onFocus(event, tab) {
      this.clearFields();
      this.FocusEvent = true;
      this.TabData = tab;
    },
    onBlur(event, tab) {
      this.clearFields();
      this.BlurEvent = true;
      this.TabData = tab;
    },
    onClick(event, tab) {
      this.clearFields();
      this.ClickEvent = true;
      this.TabData = tab;
    },
    onKeyUpEnter(event, tab) {
      this.clearFields();
      this.KeyUpEnterEvent = true;
      this.TabData = tab;
    },
  },
};
</script>
