/**
 * Regular debounce function returns undefined and cannot be
 * used in promise chain. this debounce function will return
 * a promise and resolve it after set interval
 *
 * source:
 * https://stackoverflow.com/questions/35228052/debounce-function-implemented-with-promises
 *
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function promiseDebounce(
  exec: (...args: any[]) => Promise<any>,
  interval: number,
): () => ReturnType<typeof exec> {
  let handle: number | undefined;
  let resolves: Array<(value?: unknown) => void> = [];

  return async (...args: unknown[]) => {
    clearTimeout(handle);
    handle = setTimeout(() => {
      const result = exec(...args);
      resolves.forEach(resolve => resolve(result));
      resolves = [];
    }, interval);

    return new Promise(resolve => resolves.push(resolve));
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
