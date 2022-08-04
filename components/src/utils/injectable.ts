import {inject, InjectionKey} from 'vue';

export function injectStrict<T>(key: InjectionKey<T>, fallback?: T): T {
  const resolved = inject(key, fallback);
  if (!resolved) {
    throw new Error(
      `Could not resolve ${key.toString()}, this component should be in parent who provide ${key.toString()}`,
    );
  }

  return resolved;
}
