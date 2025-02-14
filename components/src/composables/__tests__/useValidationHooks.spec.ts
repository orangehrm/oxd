import {
  FieldProperties,
  validationHookKey,
  ValidationHookContext,
} from '../types';
import {defineComponent} from 'vue';
import {mount} from '@vue/test-utils';
import {injectValidationHook, useValidationHooks} from '../useValidationHooks';

// eslint-disable-next-line no-console
const originalConsoleError = console.error;
beforeEach(() => {
  // eslint-disable-next-line no-console
  console.error = originalConsoleError;
  jest.clearAllMocks();
});

const mockField: FieldProperties = {
  cid: 'test-id',
  label: 'Test Field',
  modelName: 'testField',
  modelValue: 'test value',
  dirty: false,
  touched: false,
};

const createTestComponent = (
  setupFn: (context: {
    hook: ValidationHookContext;
    removeHook?: () => void;
  }) => void,
) => {
  const context = {
    hook: {} as ValidationHookContext,
    removeHook: undefined as undefined | (() => void),
  };

  return {
    component: defineComponent({
      setup() {
        setupFn(context);
        return {};
      },
      template: '<div></div>',
    }),
    context,
  };
};

describe('components/src/composables/useValidationHooks.ts', () => {
  it('should register and execute a single hook', async () => {
    const onSuccessfulValidation = jest.fn();
    const {component, context} = createTestComponent(ctx => {
      ctx.removeHook = useValidationHooks({onSuccessfulValidation});
      ctx.hook = injectValidationHook();
    });

    const wrapper = mount(component, {
      global: {
        provide: {
          [validationHookKey as symbol]: new Set<ValidationHookContext>(),
        },
      },
    });

    await context.hook.onSuccessfulValidation?.(mockField);
    expect(onSuccessfulValidation).toHaveBeenCalledWith(mockField);
    expect(onSuccessfulValidation).toHaveBeenCalledTimes(1);

    context.removeHook?.();
    await context.hook.onSuccessfulValidation?.(mockField);
    expect(onSuccessfulValidation).toHaveBeenCalledTimes(1);

    wrapper.unmount();
  });

  it('should execute multiple hooks in registration order', async () => {
    const executionOrder: number[] = [];
    const hook1 = jest.fn().mockImplementation(() => executionOrder.push(1));
    const hook2 = jest.fn().mockImplementation(() => executionOrder.push(2));

    const {component, context} = createTestComponent(ctx => {
      useValidationHooks({onSuccessfulValidation: hook1});
      useValidationHooks({onSuccessfulValidation: hook2});
      ctx.hook = injectValidationHook();
    });

    const wrapper = mount(component, {
      global: {
        provide: {
          [validationHookKey as symbol]: new Set<ValidationHookContext>(),
        },
      },
    });

    await context.hook.onSuccessfulValidation?.(mockField);
    expect(executionOrder).toEqual([1, 2]);

    wrapper.unmount();
  });
  it('should catch and log errors without affecting other hooks', async () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    const successHook = jest.fn();
    const errorHook = jest.fn().mockImplementation(() => {
      throw new Error('Test error');
    });

    const {component, context} = createTestComponent(ctx => {
      useValidationHooks({onSuccessfulValidation: errorHook});
      useValidationHooks({onSuccessfulValidation: successHook});
      ctx.hook = injectValidationHook();
    });

    const wrapper = mount(component, {
      global: {
        provide: {
          [validationHookKey as symbol]: new Set<ValidationHookContext>(),
        },
      },
    });

    await expect(
      context.hook.onSuccessfulValidation?.(mockField),
    ).resolves.not.toThrow();
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith(
      'Hook error in onSuccessfulValidation:',
      expect.any(Error),
    );
    expect(successHook).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should execute validation lifecycle hooks in correct order', async () => {
    const lifecycle: string[] = [];
    const hooks: ValidationHookContext = {
      onValidationStart: jest
        .fn()
        .mockImplementation(() => lifecycle.push('start')),
      onSuccessfulValidation: jest
        .fn()
        .mockImplementation(() => lifecycle.push('success')),
      onValidationError: jest
        .fn()
        .mockImplementation(() => lifecycle.push('error')),
      onValidationComplete: jest
        .fn()
        .mockImplementation(() => lifecycle.push('complete')),
    };

    const {component, context} = createTestComponent(ctx => {
      useValidationHooks(hooks);
      ctx.hook = injectValidationHook();
    });

    const wrapper = mount(component, {
      global: {
        provide: {
          [validationHookKey as symbol]: new Set<ValidationHookContext>(),
        },
      },
    });

    // Test successful validation flow
    await context.hook.onValidationStart?.(mockField);
    await context.hook.onSuccessfulValidation?.(mockField);
    await context.hook.onValidationComplete?.(mockField, {
      cid: 'test-id',
      errors: [],
    });

    expect(lifecycle).toEqual(['start', 'success', 'complete']);
    expect(hooks.onValidationError).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should handle validation error flow', async () => {
    const lifecycle: string[] = [];
    const hooks: ValidationHookContext = {
      onValidationStart: jest
        .fn()
        .mockImplementation(() => lifecycle.push('start')),
      onSuccessfulValidation: jest
        .fn()
        .mockImplementation(() => lifecycle.push('success')),
      onValidationError: jest
        .fn()
        .mockImplementation(() => lifecycle.push('error')),
      onValidationComplete: jest
        .fn()
        .mockImplementation(() => lifecycle.push('complete')),
    };

    const {component, context} = createTestComponent(ctx => {
      useValidationHooks(hooks);
      ctx.hook = injectValidationHook();
    });

    const wrapper = mount(component, {
      global: {
        provide: {
          [validationHookKey as symbol]: new Set<ValidationHookContext>(),
        },
      },
    });

    // Test error validation flow
    await context.hook.onValidationStart?.(mockField);
    await context.hook.onValidationError?.(mockField, ['Error message']);
    await context.hook.onValidationComplete?.(mockField, {
      cid: 'test-id',
      errors: ['Error message'],
    });

    expect(lifecycle).toEqual(['start', 'error', 'complete']);
    expect(hooks.onSuccessfulValidation).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should handle field registration and unregistration', async () => {
    const onFieldRegister = jest.fn();
    const onFieldUnregister = jest.fn();

    const {component, context} = createTestComponent(ctx => {
      useValidationHooks({onFieldRegister, onFieldUnregister});
      ctx.hook = injectValidationHook();
    });

    const wrapper = mount(component, {
      global: {
        provide: {
          [validationHookKey as symbol]: new Set<ValidationHookContext>(),
        },
      },
    });

    await context.hook.onFieldRegister?.(mockField);
    expect(onFieldRegister).toHaveBeenCalledWith(mockField);

    await context.hook.onFieldUnregister?.(mockField);
    expect(onFieldUnregister).toHaveBeenCalledWith(mockField);

    wrapper.unmount();
  });

  it('should execute hooks independently without blocking', async () => {
    const slowHook = jest
      .fn()
      .mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 100)),
      );
    const fastHook = jest.fn();

    const {component, context} = createTestComponent(ctx => {
      useValidationHooks({onSuccessfulValidation: slowHook});
      useValidationHooks({onSuccessfulValidation: fastHook});
      ctx.hook = injectValidationHook();
    });

    const wrapper = mount(component, {
      global: {
        provide: {
          [validationHookKey as symbol]: new Set<ValidationHookContext>(),
        },
      },
    });

    await context.hook.onSuccessfulValidation?.(mockField);

    expect(fastHook).toHaveBeenCalled();
    expect(slowHook).toHaveBeenCalled();

    wrapper.unmount();
  });
});
