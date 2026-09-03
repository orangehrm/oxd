import {ObjectDirective} from 'vue';
import rawDirective from '../index';

type FocusTrapHTMLElement = HTMLElement & {
  _tabClicking?: (e: KeyboardEvent) => void;
};

// Directive is a union of the object and function forms; narrow to the object
// one so the lifecycle hooks are reachable.
const focusTrapDirective = rawDirective as ObjectDirective<
  FocusTrapHTMLElement
>;

interface ListenerCall {
  type: string;
  handler: unknown;
  options: unknown;
}

// The directive registers a document-level keydown handler. The leak is
// invisible from the DOM, so assert against addEventListener/removeEventListener
// directly: the phase passed to remove must match the one used to add, or the
// listener outlives the element forever.
describe('focus-trap directive', () => {
  let added: ListenerCall[] = [];
  let removed: ListenerCall[] = [];

  const makeEl = (): FocusTrapHTMLElement => {
    const el = document.createElement('div');
    el.innerHTML = '<button>one</button><button>two</button>';
    return el as FocusTrapHTMLElement;
  };

  const keydown = (calls: ListenerCall[]) =>
    calls.filter(call => call.type === 'keydown');

  beforeEach(() => {
    added = [];
    removed = [];
    jest
      .spyOn(document, 'addEventListener')
      .mockImplementation((type, handler, options) => {
        added.push({type, handler, options});
      });
    jest
      .spyOn(document, 'removeEventListener')
      .mockImplementation((type, handler, options) => {
        removed.push({type, handler, options});
      });
  });

  afterEach(() => jest.restoreAllMocks());

  it('removes the handler it added when unmounted', () => {
    const el = makeEl();
    focusTrapDirective.mounted?.(el, {} as never, {} as never, {} as never);
    const installed = keydown(added)[0];

    focusTrapDirective.unmounted?.(el, {} as never, {} as never, {} as never);

    expect(keydown(removed)).toHaveLength(1);
    expect(keydown(removed)[0].handler).toBe(installed.handler);
    // the phases must match or removeEventListener is a silent no-op
    expect(keydown(removed)[0].options).toBe(installed.options);
    expect(el._tabClicking).toBeUndefined();
  });

  it('does not accumulate handlers when the element re-renders', () => {
    const el = makeEl();
    focusTrapDirective.mounted?.(el, {} as never, {} as never, {} as never);

    // a re-render that changes the focusable count re-installs the handler
    el.innerHTML = '<button>one</button>';
    focusTrapDirective.updated?.(el, {} as never, {} as never, {} as never);

    // every handler added must have a matching removal, so the number of live
    // document listeners never grows beyond one
    expect(keydown(added).length - keydown(removed).length).toBe(1);
  });
});
