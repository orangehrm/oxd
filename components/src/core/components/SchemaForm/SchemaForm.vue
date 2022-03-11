<script lang="ts">
import {
  h,
  ref,
  VNode,
  computed,
  PropType,
  withModifiers,
  defineComponent,
  DefineComponent,
  resolveComponent,
  ConcreteComponent,
} from 'vue';
import {
  Props,
  FieldType,
  LayoutType,
  FormSchema,
  FieldSchema,
  LayoutChild,
  LAYOUT_TYPE_MAP,
  ComponentSchemaProperties,
} from './types';
import {nanoid} from 'nanoid';
import Form from '@orangehrm/oxd/core/components/Form/Form.vue';
import Grid from '@orangehrm/oxd/core/components/Grid/Grid.vue';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow.vue';
import GridItem from '@orangehrm/oxd/core/components/Grid/GridItem.vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';
import FormActions from '@orangehrm/oxd/core/components/Form/FormActions.vue';
import InputField from '@orangehrm/oxd/core/components/InputField/InputField.vue';

export default defineComponent({
  name: 'oxd-schema-form',
  components: {
    'oxd-grid': Grid,
    'oxd-button': Button,
    'oxd-divider': Divider,
    'oxd-form-row': FormRow,
    'oxd-input-field': InputField,
    'oxd-form-actions': FormActions,
  },
  props: {
    schema: {
      type: Object as PropType<FormSchema>,
      required: true,
    },
  },
  setup(props, context) {
    const formModel = ref<Record<string, any>>({});

    const layoutSchema = computed(() => {
      return props.schema.layout.map(layout => ({
        id: layout.id,
        style: layout.style,
        class: layout.class,
        type: layout.type,
        props: layout.props,
        key: layout.key ?? nanoid(6),
      }));
    });

    const fieldSchema = computed(() => {
      return props.schema.layout.map(({children}) => {
        if (Array.isArray(children)) return children;
        for (const slot in children) {
          children[slot] = children[slot].map(field => {
            if (field.hook && typeof field.hook === 'function') {
              field = field.hook(field, formModel.value);
            }
            return {
              ...field,
              key: field.key ?? nanoid(6),
            };
          });
        }
        return children;
      });
    });

    const extractLayoutComponent = (
      schema: ComponentSchemaProperties<LayoutType>,
    ) => {
      if (schema.type === 'custom') {
        if (typeof schema.component !== 'object' || !schema.component)
          throw new Error('Invalid layout component type');
        return schema.component;
      } else {
        return resolveComponent(LAYOUT_TYPE_MAP[schema.type]);
      }
    };

    const extractFieldComponent = (
      schema: ComponentSchemaProperties<FieldType>,
    ) => {
      if (schema.type === 'custom') {
        if (typeof schema.component !== 'object' || !schema.component)
          throw new Error('Invalid field component type');
        return schema.component;
      } else {
        return resolveComponent('oxd-input-field');
      }
    };

    const createFieldNode = (field: FieldSchema) => {
      return h(
        GridItem,
        {
          style: field.style,
          class: field.class,
        },
        {
          default: () =>
            h(extractFieldComponent(field), {
              id: field.id,
              key: field.key,
              label: field.label,
              required: field.required,
              ...(field.props ?? {}),
              ...(field.listners ?? {}),
              rules: field.validators ?? [],
              modelValue: formModel.value[field.name],
              'onUpdate:modelValue': value => {
                formModel.value[field.name] = value;
              },
              ...(field.type !== 'custom' && {type: field.type}),
            }),
        },
      );
    };

    const createActionNode = (field: FieldSchema) => {
      return h(resolveComponent('oxd-button'), {
        id: field.id,
        key: field.key,
        label: field.label,
        style: field.style,
        class: field.class,
        ...(field.props ?? {}),
        ...(field.listners ?? {}),
      });
    };

    const extractSlots = (layoutChildObj: LayoutChild) => {
      const _slots: Record<string, object> = {};
      for (const slotName in layoutChildObj) {
        _slots[slotName] = () =>
          layoutChildObj[slotName]
            .map(field => {
              if (field.visible !== false && field.type === 'button') {
                return createActionNode(field);
              }
              return field.visible !== false ? createFieldNode(field) : null;
            })
            .filter(field => field !== null);
      }
      return _slots;
    };

    const createLayoutNode = (
      component: string | ConcreteComponent,
      props: Props,
      children: string[] | VNode[] | LayoutChild,
    ) => {
      if (typeof component === 'string' && Array.isArray(children)) {
        return h(component, children);
      } else {
        // ConcreateComponent is typecasted as Definecomponent since
        // h function type signature has some issues matching with ConcreateComponent
        // according to line below it should match, but it doesnt
        // https://github.com/vuejs/core/blob/9c304bfe7942a20264235865b4bb5f6e53fdee0d/packages/runtime-core/src/h.ts#L137
        // maybe able to refactor with vue upgrade
        return h(
          component as DefineComponent,
          props,
          Array.isArray(children) ? children : extractSlots(children),
        );
      }
    };

    return () =>
      h(
        Form,
        {
          style: props.schema.style,
          class: props.schema.class,
          onSubmit: withModifiers(
            $e => {
              context.emit('submit', $e, formModel.value);
            },
            ['stop', 'prevent'],
          ),
          onReset: withModifiers(
            $e => {
              context.emit('reset', $e);
            },
            ['stop'],
          ),
        },
        {
          default: () =>
            layoutSchema.value.map((layout, index) =>
              createLayoutNode(
                extractLayoutComponent(layout),
                {
                  id: layout.id,
                  key: layout.key,
                  style: layout.style,
                  class: layout.class,
                  ...(layout.props ?? {}),
                },
                fieldSchema.value[index],
              ),
            ),
        },
      );
  },
});
</script>
