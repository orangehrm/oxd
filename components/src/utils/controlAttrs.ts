/**
 * Fallthrough attributes fall on a component's ROOT element. For a component
 * whose root is a wrapper rather than the control itself - a time input inside
 * a layout div, a number input beside its spinner buttons - that puts the
 * control's identity and ARIA relationships on a div the user never focuses.
 * A screen reader landing on the real control then hears neither its invalid
 * state nor the message describing it.
 *
 * Split them: `control` goes on the focusable element, `wrapper` keeps
 * everything else (class, style, data-*) where the component already put it.
 */
const CONTROL_ATTR = /^(id|name|aria-[a-z-]+)$/;

export interface SplitAttrs {
  control: Record<string, unknown>;
  wrapper: Record<string, unknown>;
}

export function splitControlAttrs(attrs: Record<string, unknown>): SplitAttrs {
  const control: Record<string, unknown> = {};
  const wrapper: Record<string, unknown> = {};
  Object.keys(attrs).forEach(key => {
    if (CONTROL_ATTR.test(key)) {
      control[key] = attrs[key];
    } else {
      wrapper[key] = attrs[key];
    }
  });
  return {control, wrapper};
}

export default splitControlAttrs;
