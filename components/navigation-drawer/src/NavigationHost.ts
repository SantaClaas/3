import { LitElement } from 'lit';
import { provide } from '@lit-labs/context';
import { DimNavigationItem } from './DimNavigationItem.js';
import { dimNavigationHostContext } from './DimNavigationHostContext.js';
import { DimSectionHeader } from './DimSectionHeader.js';

export type NavigationElement = DimSectionHeader | DimNavigationItem;

/**
 * @internal
 */
export default abstract class NavigationHost extends LitElement {
  #elements: Element[] = [];

  protected set elements(value: Element[]) {
    this.#elements = value;

    this.#updateActiveItem();
  }

  protected get elements() {
    return this.#elements;
  }

  @provide({ context: dimNavigationHostContext })
  private navigationHost: typeof this = this;

  static #findActiveNavigation(items: Element[]): DimNavigationItem | null {
    for (const item of items) {
      if (
        !(item instanceof DimNavigationItem) ||
        item.href !== window.location.href
      )
        continue;

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
  register(item: NavigationElement) {
    // This avoids duplicate registration as some components are moved and appear multiple times in the navigation host
    // subtree
    if (this.elements.includes(item)) {
      console.debug('dub');
      return;
    }

    // Assume items register in the order of their DOM appearance
    this.elements.push(item);

    if (item instanceof DimSectionHeader || this.#updateActiveItem()) {
      this.requestUpdate();
    }
  }

  /**
   * Removes the navigation item from the navigation host and recalculates the active navigation element
   * @param item the item to unregister
   * @internal
   */
  unregister(item: NavigationElement) {
    const index = this.elements.indexOf(item);
    if (!index) return;

    this.elements.slice(index, 1);

    if (item instanceof DimSectionHeader || this.#updateActiveItem())
      this.requestUpdate();
  }

  #activeItem?: DimNavigationItem;

  /**
   * Finds and sets the item as current active navigation item and unsets the old one if there was one before
   * @param item the item to set as active item
   * @returns true if the active item changed, else false
   */
  #updateActiveItem(): boolean {
    const newActive = NavigationHost.#findActiveNavigation(this.elements);
    // Don't change active item if we could not find an active item
    if (!newActive) return false;

    // If active item did not change, avoid updating and possibly triggering render
    if (this.#activeItem === newActive) return false;

    // Unset previous active item
    if (this.#activeItem) this.#activeItem.isActive = false;

    this.#activeItem = newActive;
    this.#activeItem.isActive = true;

    return true;
  }
}
