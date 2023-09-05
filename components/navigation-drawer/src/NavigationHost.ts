import { LitElement } from 'lit';
import { DimNavigationItem } from './DimNavigationItem.js';
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
