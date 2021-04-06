/**
 * A function that emits a side effect and does not return anything.
 * https://github.com/chodorowicz/ts-debounce/blob/master/src/index.ts
 */

/*eslint @typescript-eslint/no-explicit-any: ["error", { "ignoreRestArgs": true }]*/
export type Procedure = (...args: any[]) => void;

export type Options = {
  isImmediate: boolean;
};

export default function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  options: Options = {
    isImmediate: false,
  },
): F {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function(this: unknown, ...args: any[]) {
    // eslint-disable-next-line  @typescript-eslint/no-this-alias
    const self = this;

    const doLater = function() {
      timeoutId = undefined;
      if (!options.isImmediate) {
        func.apply(self, args);
      }
    };

    const shouldCallNow = options.isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(self, args);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
}
