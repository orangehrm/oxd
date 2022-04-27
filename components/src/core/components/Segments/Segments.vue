<script lang="ts">
import {defineComponent, h, PropType} from 'vue';
import {nanoid} from 'nanoid';
import {SEGMENT_DEFAULT} from './types';

export default defineComponent({
  name: 'oxd-segments',
  props: {
    options: {
      type: Array as PropType<any>,
    },
    groupId: {
      type: [String, Number] as PropType<string | number>,
      default: nanoid(8),
    },
    modelValue: {
      type: Object as PropType<any>,
      default: () => SEGMENT_DEFAULT,
    },
  },
  setup() {},
  render() {
    return h(
      'div',
      {
        class: 'oxd-segments-wrapper',
      },
      this.options.map((option: any, i: number) => {
        return h(
          'div',
          {
            class: ['oxd-segment-wrapper', 'd-flex', 'align-center'],
          },
          [
            h(
              'label',
              {
                for: option.id,
                class: [
                  'oxd-segment-label',
                  {
                    active: this.modelValue?.id === option.id,
                  },
                ],
              },
              option.label,
            ),
            h('input', {
              name: this.groupId,
              id: option.id,
              type: 'radio',
              class: 'oxd-segment-input',
              modelValue: this.modelValue,
              onChange: () => this.$emit('update:modelValue', option),
            }),
          ],
        );
      }),
    );
  },
});
</script>

<style src="./segments.scss" lang="scss" scoped></style>
