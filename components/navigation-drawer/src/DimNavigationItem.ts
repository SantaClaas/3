import { LitElement, css, html } from 'lit';
import { ref, Ref, createRef } from 'lit/directives/ref.js';
import { property } from 'lit/decorators.js';
import { consume } from '@lit-labs/context';
import { dimNavigationHostContext } from './DimNavigationHostContext.js';
import { DimNavigationDrawer } from './DimNavigationDrawer.js';

export class DimNavigationItem extends LitElement {
  static styles = css`
    li a {
      all: unset;

      vertical-align: middle;
      box-sizing: border-box;
      display: flex;
      /* width 336 = 16 left padding + 296 w + 24 right padding */
      padding-inline: 16px 24px;
      padding-block: 16px;
      align-items: center;

      gap: 12px;

      /* Inactive */
      font-family: var(--md-sys-typescale-label-large-font-family-name);
      line-height: var(--md-sys-typescale-label-large-line-height);
      font-size: var(--md-sys-typescale-label-large-font-size);
      font-style: var(--md-sys-typescale-label-large-font-family-style);
      letter-spacing: var(--md-sys-typescale-label-large-letter-spacing);
      font-weight: var(--md-sys-typescale-label-large-font-weight);

      border-radius: var(--md-sys-shape-corner-extra-large);

      cursor: pointer;

      /* Inactive hover */
      &:hover {
        background-color: color-mix(
          in srgb,
          var(--md-sys-color-on-surface)
            var(--md-sys-state-hover-state-layer-opacity),
          var(--_background-color)
        );

        color: var(--md-sys-color-on-surface);
      }

      &:focus {
        background-color: color-mix(
          in srgb,
          var(--md-sys-color-on-surface)
            var(--md-sys-state-focus-state-layer-opacity),
          var(--_background-color)
        );
        color: var(--md-sys-color-on-surface);
      }

      &:active {
        background-color: color-mix(
          in srgb,
          var(--md-sys-color-on-secondary-container)
            var(--md-sys-state-pressed-state-layer-opacity),
          var(--_background-color)
        );
        color: var(--md-sys-color-on-surface);
      }

      /* Use outlined icon when inactive */

      &:not([active]) slot[name='icon-filled']::slotted(*) {
        display: none;
      }

      /* Active destination */
      &[active] {
        /* Active indicator is the link in our case so we change its background color */
        --_background-color: var(--md-sys-color-secondary-container);
        --_color: var(--md-sys-color-on-secondary-container);
        background-color: var(--_background-color);
        color: var(--_color);

        /* Active hover */
        &:hover {
          background-color: color-mix(
            in srgb,
            var(--md-sys-color-on-secondary-container)
              var(--md-sys-state-hover-state-layer-opacity),
            var(--_background-color)
          );

          color: var(--md-sys-on-secondary-container);
        }

        &:focus {
          background-color: color-mix(
            in srgb,
            var(--md-sys-color-on-secondary-container)
              var(--md-sys-state-focus-state-layer-opacity),
            var(--_background-color)
          );

          color: var(--md-sys-on-secondary-container);
        }

        &:active {
          background-color: color-mix(
            in srgb,
            var(--md-sys-color-on-secondary-container)
              var(--md-sys-state-focus-state-layer-opacity),
            var(--_background-color)
          );

          color: var(--md-sys-on-secondary-container);
        }

        /* Use filled icon when active */
        & slot[name='icon-outlined']::slotted(*) {
          display: none;
        }
      }

      /* Icon */
      & slot[name^='icon-']::slotted(*) {
        height: 24px;
        width: 24px;
      }

      /* Label */
      & slot:not([name])::slotted(*) {
        flex: 1 0 0;
      }
    }
  `;

  #hrefAttribute: string = '';

  #anchorReference: Ref<HTMLAnchorElement> = createRef();

  set href(value: string) {
    const oldValue = this.#hrefAttribute;

    this.#hrefAttribute = value;
    this.requestUpdate('href', oldValue);
  }

  @property()
  get href() {
    // This approach allows us to mirror the behavior of the anchor tag which converts relative href to absolute
    return this.#anchorReference.value?.href ?? '';
  }

  /** @internal */
  @property({ type: Boolean })
  isActive: boolean = false;

  @consume({ context: dimNavigationHostContext })
  navigationHost?: DimNavigationDrawer;

  protected firstUpdated(): void {
    /**
     * Known cases when this can happen:
     * - Users place navigation item outside of navigatio host like navigation drawer
     * - This navigatiom items "firstUpdate" was called before the context was initialized, this should not happen but
     *   can't be guaranteed at development time
     *
     * In any of these cases erroring would be bad as web component should work by default. A warning in dev mode could
     * be considered as appropriate
     */
    if (!this.navigationHost) return;

    // Can not run on connected callback as we need the anchor to be rendered to get the full path href
    this.navigationHost.register(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    // See notes in connectedCallback above
    if (!this.navigationHost) return;

    this.navigationHost.unregister(this);
  }

  protected render() {
    return html`
      <li>
        <a
          href=${this.#hrefAttribute}
          ?active=${this.isActive}
          ${ref(this.#anchorReference)}
        >
          <slot name="icon-outlined"></slot>
          <slot name="icon-filled"></slot>

          <slot></slot>
          <slot name="badge"></slot>
        </a>
      </li>
    `;
  }
}
