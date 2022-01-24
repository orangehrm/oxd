<template>
  <form
    class="oxd-form"
    novalidate
    @submit.prevent="validate"
    v-focus-first-element
  >
    <div v-if="loading" class="oxd-form-loader">
      <oxd-loading-spinner />
    </div>
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
import Spinner from '@orangehrm/oxd/core/components/Loader/Spinner.vue';
import focusFirstElement from '../../../directives/focus-first-element';

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

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    'oxd-loading-spinner': Spinner,
  },

  directives: {
    'focus-first-element': focusFirstElement,
  },

  computed: {
    isValid(): boolean {
      return this.errorBag.length === 0;
    },
  },

  methods: {
    validate(e: Event) {
      if (!this.loading) {
        setTimeout(() => {
          if (this.isValid) {
            this.$emit('submitValid', e);
          }
        }, 0);
      }
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

<style src="./form.scss" lang="scss" scoped></style>
