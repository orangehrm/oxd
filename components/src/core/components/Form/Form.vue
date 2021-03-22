<template>
  <form novalidate @submit.prevent="validate">
    <slot></slot>
  </form>
</template>

<script lang="ts">
interface State {
  errorBag: ErrorBag;
}

import {defineComponent} from 'vue';
import ErrorBag from './errorbag.interface';
import ErrorField from './errorfield.interface';

export default defineComponent({
  name: 'oxd-form',
  data(): State {
    return {
      errorBag: [],
    };
  },

  provide() {
    return {
      form: this,
    };
  },

  computed: {
    isValid(): boolean {
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
      return this.errorBag.findIndex((item: ErrorField) => {
        return item.cid == id;
      });
    },
    addError(errorField: ErrorField) {
      const i: number = this.searchErrors(errorField.cid);
      if (i < 0) {
        this.errorBag.push(errorField);
      }
    },
    removeError(errorField: ErrorField) {
      const i: number = this.searchErrors(errorField.cid);
      if (i > -1) {
        this.errorBag.splice(i, 1);
      }
    },
  },
});
</script>
