<template>
  <oxd-input 
    v-model="value"
    :imageIcon="imageIcon"
    :isIconClickable="isIconClickable"
    :imageIconClick="imageIconClick"
  >
    <template v-slot:topOfInput>
      <span class="top-of-input-label">{{ topOfInputLabel }}</span>
    </template>
  </oxd-input>
</template>

<script>
import Input from '@orangehrm/oxd/core/components/Input/Input';

export default {
  data() {
    return {
      value: '',
      topOfInputLabel: 'Label',
      imageIcon: require('@orangehrm/oxd/assets/images/facebook_logo_icon.svg'),
      isIconClickable: false,
    };
  },
  methods: {
    imageIconClick() {
      window.open('https://www.facebook.com/OrangeHRM/', '_blank');
    },
  },
  components: {
    'oxd-input': Input,
  },
};
</script>

