import {inject, provide, onScopeDispose} from 'vue';
import {ValidationHookContext, validationHookKey} from './types';

const executeHookSafely = async (
  hook: () => void | Promise<void>,
  hookName: string,
) => {
  try {
    await Promise.resolve(hook());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Hook error in ${hookName}:`, error);
  }
};

export function injectValidationHook(): ValidationHookContext {
  const hooks = inject(validationHookKey, new Set<ValidationHookContext>());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      (hook, field) => hook.onSuccessfulValidation?.(field),
    ),

    onValidationError: createSafeHook(
      'onValidationError',
      (hook, field, errors) => hook.onValidationError?.(field, errors),
    ),

    onValidationStart: createSafeHook('onValidationStart', (hook, field) =>
      hook.onValidationStart?.(field),
    ),

    onValidationComplete: createSafeHook(
      'onValidationComplete',
      (hook, field, result) => hook.onValidationComplete?.(field, result),
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
