import {inject, provide, onScopeDispose} from 'vue';
import {ValidationHookContext, validationHookKey} from './types';

const executeHookSafely = async (
  hook: () => void | Promise<void>,
  hookName: string,
) => {
  try {
    await Promise.resolve(hook());
  } catch (error) {
    console.error(`Hook error in ${hookName}:`, error);
  }
};

export function injectValidationHook(): ValidationHookContext {
  const hooks = inject(validationHookKey, new Set<ValidationHookContext>());

  const createSafeHook = <T extends any[]>(
    hookName: string,
    callback: (hook: ValidationHookContext, ...args: T) => void | Promise<void>,
  ) => {
    return async (...args: T) => {
      const promises = Array.from(hooks).map(hook =>
        executeHookSafely(() => callback(hook, ...args), hookName),
      );
      await Promise.all(promises);
    };
  };

  return {
    onSuccessfulValidation: createSafeHook(
      'onSuccessfulValidation',
      (hook, modelValue, field) =>
        hook.onSuccessfulValidation?.(modelValue, field),
    ),

    onValidationError: createSafeHook(
      'onValidationError',
      (hook, modelValue, errors, field) =>
        hook.onValidationError?.(modelValue, errors, field),
    ),

    onValidationStart: createSafeHook(
      'onValidationStart',
      (hook, modelValue, field) => hook.onValidationStart?.(modelValue, field),
    ),

    onValidationComplete: createSafeHook(
      'onValidationComplete',
      (hook, modelValue, result, field) =>
        hook.onValidationComplete?.(modelValue, result, field),
    ),

    onFieldRegister: createSafeHook('onFieldRegister', (hook, field) =>
      hook.onFieldRegister?.(field),
    ),

    onFieldUnregister: createSafeHook('onFieldUnregister', (hook, field) =>
      hook.onFieldUnregister?.(field),
    ),
  };
}

export function useValidationHooks(options: ValidationHookContext) {
  const hooks = inject(validationHookKey, new Set<ValidationHookContext>());
  hooks.add(options);

  // We need to provide the hooks in the setup context
  provide(validationHookKey, hooks);

  onScopeDispose(() => {
    hooks.delete(options);
  });

  return () => {
    hooks.delete(options);
  };
}
