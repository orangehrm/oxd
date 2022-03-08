<script lang="ts">
import {defineComponent, PropType, h, toRef, resolveComponent} from 'vue';
import {FormSchema, FIELD_TYPE_MAP, LAYOUT_TYPE_MAP} from './types';
import Form from '@orangehrm/oxd/core/components/Form/Form.vue';
import Grid from '@orangehrm/oxd/core/components/Grid/Grid.vue';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow.vue';
import GridItem from '@orangehrm/oxd/core/components/Grid/GridItem.vue';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup.vue';
import InputField from '@orangehrm/oxd/core/components/InputField/InputField.vue';

export default defineComponent({
  name: 'oxd-schema-form',
  components: {
    'oxd-grid': Grid,
    'oxd-form-row': FormRow,
    'oxd-grid-item': GridItem,
    'oxd-input-group': InputGroup,
    'oxd-input-field': InputField,
  },
  props: {
    schema: {
      type: Object as PropType<FormSchema>,
      required: true,
    },
  },
  setup(props) {
    const schema = toRef(props, 'schema');

    return () =>
      h(
        Form,
        {
          style: schema.value.style,
          class: schema.value.class,
        },
        {
          default: () =>
            schema.value.layout.map(layout => {
              if (layout.type === 'custom' && !layout.component)
                throw new Error('Invalid layout component type');

              const layoutComponent =
                layout.type === 'custom'
                  ? layout.component
                  : resolveComponent(LAYOUT_TYPE_MAP[layout.type]);

              return h(
                layoutComponent,
                {
                  style: layout.style,
                  class: layout.class,
                  ...(layout.props ?? {}),
                },
                {
                  default: () => null,
                },
              );
            }),
        },
      );
  },
});
</script>
