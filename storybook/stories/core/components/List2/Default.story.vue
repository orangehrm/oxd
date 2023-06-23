<template>
  <div class="bg-wrapper">
    <oxd-list>
      <template #sidepanel="{collapsed}">
        <div class="placeholder sidepanel">
          <oxd-text tag="p" class="placeholder-text">
            Slot for sidepanel
          </oxd-text>
        </div>
      </template>
      <template #contentHeaderLeft>
        <div class="placeholder slotheaderleft">
          <oxd-text tag="p" class="placeholder-text">
            Slot for header left
          </oxd-text>
        </div>
      </template>
      <template #contentHeaderRight>
        <div class="placeholder slotheaderright">
          <oxd-text tag="p" class="placeholder-text">
            Slot for header right
          </oxd-text>
        </div>
      </template>
      <template #contentBody>
        <div class="placeholder slotbody">
          <oxd-text tag="p" class="placeholder-text"> Slot for body </oxd-text>
        </div>
      </template>
      <template #contentFooter>
        <div class="placeholder slotfooter">
          <oxd-text tag="p" class="placeholder-text">
            Slot for footer
          </oxd-text>
        </div>
      </template>
    </oxd-list>
  </div>
</template>

<script>
import Text from '@orangehrm/oxd/core/components/Text/Text';
import List from '@orangehrm/oxd/core/components/List2/List2.vue';

export default {
  components: {
    'oxd-list': List,
    'oxd-text': Text,
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
}
.placeholder.sidepanel {
  background: #d7f2ff;
}
.placeholder.slotbody {
  height: 380px;
  margin-top: 10px;
  background: #c8ffcb;
}
.placeholder.slotfooter {
  height: 70px;
  background: #ffe0b3;
}
.placeholder.slotheaderleft,
.placeholder.slotheaderright {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slotheaderleft {
  background: #ebc0f3;
}
.slotheaderright {
  background: #fff5a2;
}
</style>
