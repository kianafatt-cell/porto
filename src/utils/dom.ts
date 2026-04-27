/**
 * Tiny DOM helpers. We avoid the full jQuery-style API and keep these
 * focused on the ergonomic shapes we reach for all day long.
 */

/** Query a single element with proper typing, or throw if required. */
export function qs<T extends HTMLElement = HTMLElement>(
  selector: string,
  scope: ParentNode = document,
): T | null {
  return scope.querySelector<T>(selector);
}

/** Same as `qs`, but throws when the element is missing. */
export function qsRequired<T extends HTMLElement = HTMLElement>(
  selector: string,
  scope: ParentNode = document,
): T {
  const el = scope.querySelector<T>(selector);
  if (!el) {
    throw new Error(`Element not found for selector: ${selector}`);
  }
  return el;
}

/** Query multiple elements, returned as a real array. */
export function qsa<T extends HTMLElement = HTMLElement>(
  selector: string,
  scope: ParentNode = document,
): T[] {
  return Array.from(scope.querySelectorAll<T>(selector));
}

type Attrs = Record<string, string | number | boolean | null | undefined>;
type Children = Array<Node | string | null | undefined | false>;

/**
 * Tiny JSX-less element builder. Pairs nicely with template literal HTML
 * for component bodies while giving us a typed way to create wrappers.
 */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Attrs,
  children?: Children,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (value === null || value === undefined || value === false) continue;
      if (key === 'class' || key === 'className') {
        node.className = String(value);
      } else if (key === 'style' && typeof value === 'string') {
        node.setAttribute('style', value);
      } else if (key.startsWith('data-') || key.startsWith('aria-')) {
        node.setAttribute(key, String(value));
      } else if (key in node) {
        (node as unknown as Record<string, unknown>)[key] = value;
      } else {
        node.setAttribute(key, String(value));
      }
    }
  }
  if (children) {
    for (const child of children) {
      if (child === null || child === undefined || child === false) continue;
      node.append(typeof child === 'string' ? document.createTextNode(child) : child);
    }
  }
  return node;
}

/** Set multiple attributes / data attributes in one pass. */
export function setAttrs(node: Element, attrs: Attrs): void {
  for (const [key, value] of Object.entries(attrs)) {
    if (value === null || value === undefined || value === false) {
      node.removeAttribute(key);
    } else {
      node.setAttribute(key, String(value));
    }
  }
}

/** Toggle a classname with an explicit `on` flag. */
export function toggleClass(
  node: Element,
  className: string,
  on: boolean,
): void {
  node.classList.toggle(className, on);
}

/** Remove a node from its parent if it has one. */
export function removeNode(node: Node | null | undefined): void {
  if (node && node.parentNode) node.parentNode.removeChild(node);
}

/** Empty an element of all children. */
export function clear(node: Element): void {
  while (node.firstChild) node.removeChild(node.firstChild);
}

/** Dispatch a typed custom event from `node`. */
export function emit<T>(
  node: EventTarget,
  type: string,
  detail?: T,
  bubbles = true,
): void {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles }));
}

/** Check if an element is currently within the visual viewport. */
export function isInViewport(node: Element, threshold = 0): boolean {
  const rect = node.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  return (
    rect.top < viewHeight - threshold &&
    rect.bottom > threshold &&
    rect.left < viewWidth - threshold &&
    rect.right > threshold
  );
}

/** Escape HTML for safe interpolation into innerHTML strings. */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Tag helper so `html\`...\`` returns a string. */
export function html(
  strings: TemplateStringsArray,
  ...values: Array<unknown>
): string {
  let out = '';
  strings.forEach((str, i) => {
    out += str;
    if (i < values.length) {
      const v = values[i];
      if (Array.isArray(v)) {
        out += v.join('');
      } else if (v === null || v === undefined || v === false) {
        out += '';
      } else {
        out += String(v);
      }
    }
  });
  return out;
}

/** Parse an HTML string into a detached fragment. */
export function fragment(markup: string): DocumentFragment {
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  return template.content;
}
