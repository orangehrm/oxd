<template>
  <div class="bg-wrapper">
    <oxd-list-title
      title="Work Schedules"
      mainButtonLabel="Add Work Schedule"
    ></oxd-list-title>
    <oxd-list :flatTop="true">
      <template #sidepanel="{collapsed}">
        <div class="placeholder sidepanel">
          <oxd-text tag="p" class="placeholder-text"> Sidepanel </oxd-text>
        </div>
      </template>
      <template #contentBody>
        <div class="placeholder slotbody">
          <oxd-text tag="p" class="placeholder-text"> Body </oxd-text>
        </div>
      </template>
    </oxd-list>
  </div>
</template>

<script>
import Text from '@orangehrm/oxd/core/components/Text/Text';
import List from '@orangehrm/oxd/core/components/List2/List2.vue';
import ListTitle from '@orangehrm/oxd/core/components/List2Title/List2Title.vue';

export default {
  components: {
    'oxd-list': List,
    'oxd-text': Text,
    'oxd-list-title': ListTitle,
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
