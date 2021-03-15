<template>
  <form novalidate @submit.prevent="validate">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import IErrorBag from './errorbag.interface';
import IErrorField from './errorfield.interface';

export default defineComponent({
  name: 'oxd-form',
  data() {
    return {
      errorBag: <IErrorBag>[],
    };
  },

  provide() {
    return {
      form: this,
    };
  },

  computed: {
    isValid(): Boolean {
      return this.errorBag.length === 0;
    },
  },

  methods: {
    validate(e: Event) {
      setTimeout(() => {
        if (this.isValid) {
          this.$emit('submitValid', e);
        }
      }, 0);
    },
    searchErrors(id: string) {
      return this.errorBag.findIndex((item: IErrorField) => {
        return item.cid == id;
      });
    },
    addError(errorField: IErrorField) {
      const i: number = this.searchErrors(errorField.cid);
      if (i < 0) {
        this.errorBag.push(errorField);
      }
    },
    removeError(errorField: IErrorField) {
      const i: number = this.searchErrors(errorField.cid);
      if (i > -1) {
        this.errorBag.splice(i, 1);
      }
    },
  },
});
</script>
