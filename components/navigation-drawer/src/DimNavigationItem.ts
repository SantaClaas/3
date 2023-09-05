import { LitElement, html, nothing } from 'lit';
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

/**
 * Renders a navigation item for the navigation rail and navigatio bar but not the navigation drawer as the layout is
 * different for that component.
 * This is a function instead of a component as the drawer has different layout and avoid style encapsulation.
 * A shared render function to reduce code duplication and errors introduced through code duplication.
 * @param item the item to render
 * @internal
 */
export function renderNavigationItem(item: DimNavigationItem) {
  return html`
    <li>
      <a href="${item.href}" ?active=${item.isActive}>
        <div>
          ${item.isActive ? item.iconFilled : item.iconOutlined}
          ${item.badge ? html`<span>${item.badge}</span>` : nothing}
        </div>

        ${item.label ? html`<span>${item.label}</span>` : nothing}
      </a>
    </li>
  `;
}
