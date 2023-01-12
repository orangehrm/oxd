/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */

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
  let handle: any;
  let resolves: Array<(value?: unknown) => void> = [];

  return async (...args: unknown[]) => {
    clearTimeout(handle);
    handle = setTimeout(() => {
      const result = exec(...args);
      resolves.forEach((resolve) => resolve(result));
      resolves = [];
    }, interval);

    return new Promise((resolve) => resolves.push(resolve));
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
