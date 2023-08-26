import { LitElement, css, html } from 'lit';
import { provide } from '@lit-labs/context';
import { type DimNavigationItem } from './DimNavigationItem.js';
import { dimNavigationHostContext } from './DimNavigationHostContext.js';

//TODO add badges support
//TODO use filled out icons for current destination
//TODO only use expanded after > 1239dp https://m3.material.io/components/navigation-drawer/guidelines#81b637af-d1c6-4edd-84fd-487eb9860d76
/**
 * It is recommended to use 3-7 destination items with the navigation
 * Remarks: For the component to properly work it needs to be registered before the navigation due to the context registration requiring the host provider to be initialized
 */
export class DimNavigationDrawer extends LitElement {
  static styles =
    // Only configure styles that are different between buttons
    css`
      :host {
        /* Compact is default layout */
        display: block;
        container-type: inline-size;

        position: fixed;
        --_inset: auto auto 0 0;
        inset: var(--_inset);

        --_width: 100dvw;
        --_height: 80px;

        width: var(--_width);
        height: var(--_height);

        background-color: var(--md-sys-color-surface);
      }

      nav {
        /* Compact Layout (default) */
        box-sizing: border-box;
        padding: 0 8px;
        z-index: var(--md-sys-elevation-level-2-z-index);
        background-color: var(--md-sys-color-surface);

        /* Hide divider when not expanded */
        & slot::slotted(dim-divider) {
          display: none;
          visibility: hidden;
        }

        /* When width is expanded or modal open */
        @container (min-width: 360px) and (min-height: 100dvh) {
          background-color: var(--md-sys-color-surface-container-low);
          box-shadow: var(--md-sys-elevation-1-shadow);
        }

        /* Medium Layout (rail + modal drawer) */
        @media (min-width: 600px) and (max-width: 840px) {
          /* Color (modal) */

          border-radius: none;
        }

        /* Expanded (rail + modal drawer) */
        @media (min-width: 840px) and (max-width: 1240px) {
          padding-inline: 12px;
          width: var(--_rail-width);
          border-radius: none;

          & slot::slotted(dim-divider) {
            display: none;
          }
        }

        /* "Expandeder" for navigation drawer (expanded drawer) */
        @media (min-width: 1240px) {
          width: 360px;
          box-sizing: border-box;
          padding-inline: 12px;

          /* Color (standard) */
          --_background-color: var(--md-sys-color-surface);
          --_color: var(--md-sys-color-on-surface-variant);
          background-color: var(--_background-color);
          color: var(--_color);
          box-shadow: var(--md-sys-elevation-0-shadow);
          border-radius: var(--md-sys-shape-corner-large-end);
        }
      }

      /* Medium: 600 < width < 840 */

      /* @media (600px < width < 840px) { */

      /* Expanded: 840 > width */
      /* @media (width > 840px) { */
      /* Navigation drawer is visible in expanded layouts and a modal on compact and medium */
    `;

  @provide({ context: dimNavigationHostContext })
  private navigationHost: typeof this = this;

  static #findActive(items: DimNavigationItem[]): DimNavigationItem | null {
    for (const item of items) {
      if (item.href !== window.location.href) continue;

      // Only the first item is marked as active as multiple items being active is unwanted behavior
      return item;
    }

    return null;
  }

  /**
   * The drawer is the host of the navigation items and manages the active item as there can only be one navigation item
   * active at a time but the navigation items are not aware of each other which is why it is delegated to the host.
   */
  #items: DimNavigationItem[] = [];

  #activeItem?: DimNavigationItem;

  /**
   * Sets the item as current active navigation item and unsets the old one if there was one before
   * @param item the item to set as active item
   */
  #setActiveItem(item: DimNavigationItem) {
    // If active item did not change, avoid updating and possibly triggering render
    if (this.#activeItem === item) return;

    // Unset previous active item
    if (this.#activeItem) this.#activeItem.isActive = false;

    this.#activeItem = item;
    this.#activeItem.isActive = true;
  }

  /**
   * Adds a navigation item to the navigation host and recalculates the current active navigation item
   * @param item the navigation item to register
   * @internal
   */
  register(item: DimNavigationItem) {
    if (this.#items.includes(item)) return;

    // Items should register in the order of their DOM appearance
    this.#items.push(item);

    // Find active
    const activeItem = DimNavigationDrawer.#findActive(this.#items);

    if (activeItem) this.#setActiveItem(activeItem);
  }

  /**
   * Removes the navigation item from the navigation host and recalculates the active navigation element
   * @param item the item to unregister
   * @internal
   */
  unregister(item: DimNavigationItem) {
    const index = this.#items.indexOf(item);
    if (!index) return;

    this.#items.slice(index, 1);

    const activeItem = DimNavigationDrawer.#findActive(this.#items);
    if (activeItem) this.#setActiveItem(activeItem);
  }

  render() {
    return html`<nav>
      <slot></slot>
    </nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dim-navigation-drawer': DimNavigationDrawer;
  }
}
