import { LitElement, css, html } from 'lit';
import { provide } from '@lit-labs/context';
import { type DimNavigationItem } from './DimNavigationItem.js';
import { dimNavigationHostContext } from './DimNavigationHostContext.js';

//TODO add badges support
//TODO use filled out icons for current destination
//TODO only use expanded after > 1239dp https://m3.material.io/components/navigation-drawer/guidelines#81b637af-d1c6-4edd-84fd-487eb9860d76
/**
 * Remarks: For the component to properly work it needs to be registered before the navigation due to the context registration requiring the host provider to be initialized
 */
export class DimNavigationDrawer extends LitElement {
  static styles =
    // Only configure styles that are different between buttons
    css`
      /* Compact: Width < 600 (Default in mobile first) */
      nav {
        /* Color (modal) */
        background-color: var(--md-sys-color-surface-container-low);
      }

      /* Medium: 600 < width < 840 */

      /* @media (600px < width < 840px) { */
      @media (min-width: 600px) and (max-width: 840px) {
        nav {
          /* Color (modal) */
          background-color: var(--md-sys-color-surface-container-low);
          box-shadow: var(--md-sys-elevation-1-shadow);
        }
      }

      /* Expanded: 840 > width */

      /* @media (width > 840px) { */
      /* Navigation drawer is visible in expanded layouts and a modal on compact and medium */
      @media (min-width: 840px) {
        nav {
          position: sticky;
          top: 0;
          height: 100dvh;
          width: 360px;
          padding-inline: 12px;
          box-sizing: border-box;

          /* Color (standard) */
          --_background-color: var(--md-sys-color-surface);
          --_color: var(--md-sys-color-on-surface-variant);
          background-color: var(--_background-color);
          color: var(--_color);
          box-shadow: var(--md-sys-elevation-0-shadow);
          border-radius: var(--md-sys-shape-corner-large-end);
        }
      }
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ = html` <section>
    <header>Mail</header>
    <ul>
      <li>
        <a href="inbox">
          <!-- Icon (optional) -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 -960 960 960"
            width="48"
          >
            <path
              fill="currentColor"
              d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-136H634q-26 40-67.5 61.5T480-233q-45 0-86.5-21.5T326-316H180v136Zm300.246-113Q521-293 554-316.5q33-23.5 56-59.5h170v-404H180v404h170q23 36 56.246 59.5 33.247 23.5 74 23.5ZM180-180h600-600Z"
            />
          </svg>

          <!-- Label text -->
          <span>Inbox</span>

          <!-- Badge -->
          <span>24</span>
        </a>
      </li>
      <li>
        <a href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 -960 960 960"
            width="48"
          >
            <path
              fill="currentColor"
              d="M120-160v-640l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0v-457 457Z"
            />
          </svg>

          <span>Outbox</span>
        </a>
      </li>
      <li>
        <a href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 -960 960 960"
            width="48"
          >
            <path
              fill="currentColor"
              d="m480-121-41-37q-105.768-97.121-174.884-167.561Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.155 60.5-150.577Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.423Q880-733.155 880-643q0 46-16.5 91T806-451.5Q765-396 695.884-325.561 626.768-255.121 521-158l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712-426 750.5-476t54-89.135q15.5-39.136 15.5-77.72Q820-709 778-751.5T670.225-794q-51.524 0-95.375 31.5Q531-731 504-674h-49q-26-56-69.85-88-43.851-32-95.375-32Q224-794 182-751.5t-42 108.816Q140-604 155.5-564.5t54 90Q248-424 314-358t166 158Zm0-297Z"
            />
          </svg>

          <span>Favorites</span>
        </a>
      </li>
      <li>
        <a href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 -960 960 960"
            width="48"
          >
            <path
              fill="currentColor"
              d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"
            />
          </svg>
          <span>Trash</span>
        </a>
      </li>
    </ul>
  </section>
  <dim-divider></dim-divider>
  <section>
    <header>Labels</header>
    <ul>
      <li>
        <a href="inbox">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
              fill="currentColor"
            />
          </svg>

          <!-- Label text -->
          <span>Label 1</span>
        </a>
      </li>
      <li>
        <a href="#">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
              fill="currentColor"
            />
          </svg>

          <span>Label 2</span>
        </a>
      </li>
      <li>
        <a href="#">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
              fill="currentColor"
            />
          </svg>

          <span>Label 3</span>
        </a>
      </li>
      <li>
        <a href="#">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
              fill="currentColor"
            />
          </svg>

          <span>Label 4</span>
        </a>
      </li>
    </ul>
  </section>`;

declare global {
  interface HTMLElementTagNameMap {
    'dim-navigation-drawer': DimNavigationDrawer;
  }
}
