import { LitElement, html, nothing, svg } from 'lit';
import { property } from 'lit/decorators.js';

const iconOutlinedName = 'icon-outlined';
const iconFilledName = 'icon-filled';

/**
 * A component to provide values needed to render navigation items in a navigation host. Does not render the navigation
 * item itself as the layout varies between navigatiom hosts and is therefore the responsibility of the host.
 * The navigation item is unaware of what host it is nested in.
 */
export class DimNavigationItem extends LitElement {
  #hrefAttribute: string = '';

  #hrefAbsolute: string = '';

  set href(value: string) {
    const oldValue = this.#hrefAttribute;

    this.#hrefAttribute = value;
    this.#hrefAbsolute = new URL(value, document.baseURI).href;

    this.requestUpdate('href', oldValue);
  }

  @property()
  get href() {
    // This approach allows us to mirror the behavior of the anchor tag which converts relative href to absolute
    return this.#hrefAbsolute;
  }

  /** @internal */
  @property({ type: Boolean })
  isActive: boolean = false;

  /**
   * A short meaningful description of the destination.
   * When used with navigation bar, avoid using icon without label
   */
  @property({ type: String })
  label?: string;

  @property({ type: String })
  badge?: string;

  /**
   *
   * @internal
   */
  iconOutlined?: Element[];

  /**
   *
   * @internal
   */
  iconFilled?: Element[];

  #iconOutlinedChanged(event: Event) {
    if (
      !(event.target instanceof HTMLSlotElement) ||
      event.target.name !== iconOutlinedName
    )
      return;

    this.iconOutlined = event.target.assignedElements();
  }

  #iconFilledChanged(event: Event) {
    if (
      !(event.target instanceof HTMLSlotElement) ||
      event.target.name !== iconFilledName
    )
      return;

    this.iconFilled = event.target.assignedElements();
  }

  protected render() {
    return html`
      <slot
        name="${iconOutlinedName}"
        @slotchange=${this.#iconOutlinedChanged}
      ></slot>
      <slot
        name="${iconFilledName}"
        @slotchange=${this.#iconFilledChanged}
      ></slot>
    `;
  }
}

function badge(text?: string) {
  switch (text) {
    // Empty badge
    case '':
      return svg`
        <svg viewBox="0 0 6 6" height="6" width="6" >
          <circle cx="3" cy="3" r="3" fill="currentColor" />
        </svg>
      `;

    case undefined:
      return nothing;

    default: {
      // Maximum badge label length is 4
      const asNumber = Number(text);
      if (Number.isNaN(asNumber)) return html`<span>${text.slice(0, 4)}</span>`;

      // For numbers we allow 3 digits and add plus at the end
      if (asNumber > 999) return html`<span>999+</span>`;

      return html`<span>${text}</span>`;
    }
  }
}
/**
 * Renders a navigation item for the navigation rail and navigatio bar but not the navigation drawer as the layout is
 * different for that component.
 * This is a function to avoid style encapsulation to let the consumers apply different styles easier.
 * @param item the item to render
 * @internal
 */
export function renderNavigationItem(item: DimNavigationItem) {
  return html`
    <li>
      <a href="${item.href}" ?active=${item.isActive}>
        <div>
          ${item.isActive ? item.iconFilled : item.iconOutlined}
          ${badge(item.badge)}
        </div>

        ${item.label ? html`<span>${item.label}</span>` : nothing}
      </a>
    </li>
  `;
}
