import { LitElement } from 'lit';
import { provide } from '@lit-labs/context';
import { DimNavigationItem } from './DimNavigationItem.js';
import { dimNavigationHostContext } from './DimNavigationHostContext.js';

/**
 * @internal
 */
export default abstract class NavigationHost extends LitElement {
  /**
   * The drawer is the host of the navigation items and manages the active item as there can only be one navigation item
   * active at a time but the navigation items are not aware of each other which is why it is delegated to the host.
   */
  protected items: DimNavigationItem[] = [];

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
   * Adds a navigation item to the navigation host and recalculates the current active navigation item
   * @param item the navigation item to register
   * @internal
   */
  register(item: DimNavigationItem) {
    if (this.items.includes(item)) return;

    // Items should register in the order of their DOM appearance
    this.items.push(item);

    // Find active
    const activeItem = NavigationHost.#findActive(this.items);

    if (activeItem) this.#setActiveItem(activeItem);
  }

  /**
   * Removes the navigation item from the navigation host and recalculates the active navigation element
   * @param item the item to unregister
   * @internal
   */
  unregister(item: DimNavigationItem) {
    const index = this.items.indexOf(item);
    if (!index) return;

    this.items.slice(index, 1);

    const activeItem = NavigationHost.#findActive(this.items);
    if (activeItem) this.#setActiveItem(activeItem);
  }

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

    // Initiate render as the active icon changes appearance
    this.requestUpdate();
  }
}
