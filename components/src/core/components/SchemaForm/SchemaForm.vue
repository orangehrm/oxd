<script lang="ts">
import {
  h,
  ref,
  VNode,
  computed,
  PropType,
  defineComponent,
  DefineComponent,
  resolveComponent,
  ConcreteComponent,
} from 'vue';
import {
  Model,
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
import useTranslate from '../../../composables/useTranslate';

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
      required: false,
    },
    model: {
      type: Object as PropType<Model>,
      required: false,
    },
    enableFirstElementFocus: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['submitValid', 'update:model'],
  setup(props, context) {
    const formRef = ref();
    const {$t} = useTranslate();
    const layoutSchema = computed(() => {
      return props.schema?.layout?.map(layout => ({
        id: layout.id,
        style: layout.style,
        class: layout.class,
        type: layout.type,
        props: layout.props,
        component: layout.component,
        key: layout.key ?? nanoid(6),
      }));
    });

    const fieldSchema = computed(() => {
      return props.schema?.layout?.map(({children}) => {
        if (Array.isArray(children)) return children;
        for (const slot in children) {
          children[slot] = children[slot].map(field => {
            if (field.hook && typeof field.hook === 'function') {
              field = field.hook(field, props.model as Model);
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

    const isLoading = computed(() =>
      !props.schema || props.loading ? true : false,
    );

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

    const getFormElementId = (
      fieldType: string,
      fieldName: string,
      fieldValue: string | unknown,
      formName: string,
    ) => {
      if (fieldType === 'radio') {
        return (
          formName.toString().trim() +
          '_' +
          fieldName.toString().trim() +
          '_' +
          fieldValue.toString().trim()
        );
      } else {
        return formName.toString().trim() + '_' + fieldName.toString().trim();
      }
    };

    const createFieldNode = (field: FieldSchema) => {
      if (!props.schema?.name) {
        throw new Error('Form name is must for schema form');
      } else {
        return h(
          GridItem,
          {
            style: field.style,
            class: field.class,
          },
          {
            default: () => {
              return h(extractFieldComponent(field), {
                id: getFormElementId(
                  field.type,
                  field.name,
                  field.value,
                  props.schema.name,
                ),
                key: field.key,
                label: $t(field.label),
                hint: $t(field.hint),
                disabled: props.schema?.disabled
                  ? props.schema.disabled
                  : false,
                ...(field.props ?? {}),
                ...(field.listeners ?? {}),
                rules: Array.from(field.validators?.values() ?? []),
                modelValue:
                  props && props.model ? props.model[field.name] : null,
                'onUpdate:modelValue': value => {
                  context.emit('update:model', {
                    ...(props.model as Model),
                    [field.name]: value,
                  });
                },
                required:
                  field.validators?.has('required') && !props.schema?.disabled,
                ...(field.type !== 'custom' && {type: field.type}),
              });
            },
          },
        );
      }
    };

    const createActionNode = (field: FieldSchema) => {
      return h(resolveComponent('oxd-button'), {
        id: field.id,
        key: field.key,
        label: $t(field.label),
        style: field.style,
        class: field.class,
        disabled: props.schema?.disabled ? props.schema.disabled : false,
        ...(field.props ?? {}),
        ...(field.listeners ?? {}),
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component: string | ConcreteComponent<any>,
      props: Props,
      children: string | Array<VNode | string> | LayoutChild,
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component as DefineComponent<any>,
          props,
          typeof children === 'string' || Array.isArray(children)
            ? children
            : extractSlots(children),
        );
      }
    };

    context.expose({
      reset: () => formRef.value?.onReset(),
      validate: () => formRef.value?.validate(),
      submit: () => formRef.value?.onSubmit(new Event('submit')),
      errorbag: computed(() => formRef.value?.errorbag),
      invalid: computed(() => formRef.value?.isFromInvalid),
    });

    return () =>
      h(
        Form,
        {
          ref: formRef,
          name: props.schema?.name,
          style: props.schema?.style,
          class: 'oxd-schema-form-container ' + props.schema?.class,
          loading: isLoading.value,
          enableFirstElementFocus: props.enableFirstElementFocus,
          onSubmitValid: ($e: SubmitEvent) => {
            context.emit('submitValid', props.model, $e);
          },
        },
        {
          ...(props.schema && {
            default: () =>
              layoutSchema.value?.map((layout, index) =>
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
          }),
        },
      );
  },
});
</script>
