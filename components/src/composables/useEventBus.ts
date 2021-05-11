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
      this.queue[name].forEach(function(callback) {
        callback(data);
      });
    }
  }
}

export default function useEventBus() {
  return new EventBus();
}
