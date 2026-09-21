<template>
  <label
    :id="labelId"
    :class="classes"
    :for="id"
    :style="style"
    @click="onClick"
  >
    {{ label }}
  </label>
</template>

<script>
export default {
  name: 'oxd-label',

  props: {
    label: {
      type: String,
      required: true,
    },
    style: {
      type: Object,
    },
    id: {
      type: String,
    },
    // The label's own element id, so a control that cannot be referenced by
    // `for` (a group of inputs, say) can point at it with aria-labelledby.
    labelId: {
      type: String,
    },
    // Id of a control to activate on click, for a control `for` cannot
    // address. `for` only works on labelable elements, so a combobox rendered
    // as a <div> gets no native label-click behaviour - clicking its label
    // would otherwise do nothing.
    clickTarget: {
      type: String,
    },
  },

  methods: {
    onClick() {
      // Only when there is no native `for`; otherwise the browser already
      // activates the control and doing it again would toggle twice.
      if (!this.clickTarget || this.id) return;
      const el = document.getElementById(this.clickTarget);
      if (!el) return;
      el.focus();
      el.click();
    },
  },

  computed: {
    classes() {
      return {
        'oxd-label': true,
      };
    },
  },
};
</script>

<style src="./label.scss" lang="scss" scoped></style>
