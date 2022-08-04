import {defineComponent} from 'vue';

export const validatableMixin = defineComponent({
  data() {
    return {
      errorBucket: [] as string[],
    };
  },

  props: {
    rules: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate(value?: any) {
      const errorBucket = [];

      for (let index = 0; index < this.rules.length; index++) {
        const rule = this.rules[index];
        const valid = typeof rule === 'function' ? rule(value) : rule;

        if (typeof valid === 'string') {
          errorBucket.push(valid || '');
          // eslint-disable-next-line no-empty
        } else if (valid === true) {
        } else {
          // eslint-disable-next-line no-console
          console.error(
            `Rules should return a string or true, received '${typeof valid}'`,
          );
        }
      }

      this.errorBucket = errorBucket;
    },
  },
});

export default validatableMixin;
