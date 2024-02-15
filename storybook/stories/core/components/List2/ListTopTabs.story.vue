<template>
  <div class="bg-wrapper">
    <oxd-list-tabs :tabs="tabs" v-model="tab" />
    <oxd-list :flatTop="true" v-if="tab === 'goal'">
      <template #sidepanel="{collapsed}">
        <div class="placeholder sidepanel">
          <oxd-text tag="p" class="placeholder-text"> Goal Sidepanel </oxd-text>
        </div>
      </template>
      <template #contentBody>
        <div class="placeholder slotbody">
          <oxd-text tag="p" class="placeholder-text"> Goal Body </oxd-text>
        </div>
      </template>
    </oxd-list>
    <oxd-list :flatTop="true" v-if="tab === 'okrs'">
      <template #sidepanel="{collapsed}">
        <div class="placeholder sidepanel">
          <oxd-text tag="p" class="placeholder-text"> OKR Sidepanel </oxd-text>
        </div>
      </template>
      <template #contentBody>
        <div class="placeholder slotbody">
          <oxd-text tag="p" class="placeholder-text"> OKR Body </oxd-text>
        </div>
      </template>
    </oxd-list>
  </div>
</template>

<script>
import Text from '@orangehrm/oxd/core/components/Text/Text';
import List from '@orangehrm/oxd/core/components/List2/List2.vue';
import ListTabs from '@orangehrm/oxd/core/components/List2Tabs/List2Tabs.vue';

export default {
  components: {
    'oxd-list': List,
    'oxd-text': Text,
    'oxd-list-tabs': ListTabs,
  },
  data() {
    return {
      tab: 'goal',
      tabs: [
        {id: 'goal', label: 'Goal', icon: 'oxd-chat'},
        {id: 'okrs', label: 'OKRs', icon: 'oxd-search'},
      ],
    };
  },
};
</script>

<style scoped>
.bg-wrapper {
  padding: 1rem;
  height: calc(100vh - 5vh);
  background-color: #f6f5fb;
}
.placeholder {
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 10px;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: center;
}
.placeholder.sidepanel {
  background: #d7f2ff;
}
.placeholder.slotbody {
  height: 380px;
  background: #c8ffcb;
}
</style>
