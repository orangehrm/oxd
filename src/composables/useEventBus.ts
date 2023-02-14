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

interface EventQueue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: Array<(data: any) => void>;
}

class EventBus {
  private queue: EventQueue;
  constructor() {
    this.queue = {};
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $on(name: string, callback: (data: any) => void) {
    this.queue[name] = this.queue[name] || [];
    this.queue[name].push(callback);
  }

  $off(name: string, callback: () => void) {
    if (this.queue[name]) {
      for (let i = 0; i < this.queue[name].length; i++) {
        if (this.queue[name][i] === callback) {
          this.queue[name].splice(i, 1);
          break;
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $emit(name: string, data: any) {
    if (this.queue[name]) {
      this.queue[name].forEach(function (callback) {
        callback(data);
      });
    }
  }
}

export default function useEventBus() {
  return new EventBus();
}
