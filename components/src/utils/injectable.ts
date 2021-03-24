import { inject } from 'vue'

export function injectStrict<T>(key: string, fallback?: T) {
    const resolved = inject(key, fallback)
    if (!resolved) {
        throw new Error(`Could not resolve ${key}, this component should be in parent who provide ${key}`)
    }

    return resolved
}
