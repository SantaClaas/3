import { DimNavigationItem, NavigationHost } from '@claas.dev/dim-navigation';
import { css, html, nothing } from 'lit';
import { Ref, createRef, ref } from 'lit/directives/ref.js';

export class DimNavigationDrawer extends NavigationHost {
  static styles = css`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      all: unset;
    }

    :host {
      width: 360px;
      height: 100dvh;

      position: sticky;
      inset: 0 auto 0 0;

      --_background-modal: var(--md-sys-color-container-low);
      --_background-standard: var(--md-sys-color-surface);
      --_background-color: var(--_background-standard);

      background-color: var(--_background-color);

      --_color: var(--md-sys-color-on-surface-variant);
      color: var(--_color);

      --_shadow-modal: var(--md-sys-elevation-level-1-shadow);
      --_shadow-standard: var(--md-sys-elevation-level-0-shadow);
      --_shadow: var(--_shadow-standard);

      box-shadow: var(--_shadow);

      border-radius: var(--md-sys-shape-corner-large-end);
    }

    nav {
      padding: 12px;

      & ol {
        all: unset;
        list-style-type: none;
        & li a {
          all: unset;

          display: flex;
          gap: 12px;
          align-items: center;

          padding: 16px 24px 16px 16px;
          box-sizing: border-box;

          --_indicator-background-color: var(--_background-color);
          --_state-layer-color: var(--md-sys-color-on-surface);
          background-color: var(--_indicator-background-color);
          --_indicator-color: var(--_color);
          color: var(--_indicator-color);

          font-family: var(--md-sys-typescale-label-large-font-family-name);
          line-height: var(--md-sys-typescale-label-large-line-height);
          font-size: var(--md-sys-typescale-label-large-font-size);
          font-style: var(--md-sys-typescale-label-large-font-family-style);
          letter-spacing: var(--md-sys-typescale-label-large-letter-spacing);
          font-weight: var(--md-sys-typescale-label-large-font-weight);

          border-radius: var(--md-sys-shape-corner-extra-large);

          cursor: pointer;

          & svg {
            height: 24px;
            width: 24px;
          }

          & span:first-of-type {
            flex: 1 0 0;
          }

          &:hover {
            background-color: color-mix(
              in srgb,
              var(--_state-layer-color)
                var(--md-sys-state-hover-state-layer-opacity),
              var(--_indicator-background-color)
            );

            color: var(--_indicator-color);
          }

          &:focus {
            background-color: color-mix(
              in srgb,
              var(--_state-layer-color)
                var(--md-sys-state-focus-state-layer-opacity),
              var(--_indicator-background-color)
            );

            color: var(--_indicator-color);
          }

          &:active {
            background-color: color-mix(
              in srgb,
              var(--_state-layer-color)
                var(--md-sys-state-pressed-state-layer-opacity),
              var(--_indicator-background-color)
            );
            color: var(--_indicator-color);
          }

          &[active] {
            --_indicator-background-color: var(
              --md-sys-color-secondary-container
            );
            --_indicator-color: var(--md-sys-color-on-secondary-container);
            --_state-layer-color: var(--md-sys-color-on-secondary-container);
          }
        }
      }
    }

    slot {
      display: none;
    }
  `;

  #slotReference: Ref<HTMLSlotElement> = createRef();

  protected firstUpdated(): void {
    if (!(this.#slotReference.value instanceof HTMLSlotElement))
      // If this errors we broke the components logic. It is expected to not throw here but there is no development time
      // guarantee
      throw new Error('Slot needs to be rendered for navigation host to work');

    this.elements = this.#slotReference.value.assignedElements();
    this.updateComplete.then(() => {
      this.requestUpdate();
    });
  }

  render() {
    return html`
      <nav>
        <ol>
          ${this.elements.map(element => {
            if (!(element instanceof DimNavigationItem)) return element;

            return html`
              <li>
                <a href="${element.href}" ?active=${element.isActive}>
                  ${element.isActive
                    ? element.iconFilled
                    : element.iconOutlined}
                  ${element.label
                    ? html`<span>${element.label}</span>`
                    : nothing}
                  ${element.badge
                    ? html`<span>${element.badge}</span>`
                    : nothing}
                </a>
              </li>
            `;
          })}
        </ol>
      </nav>
      <slot ${ref(this.#slotReference)}></slot>
    `;
  }
}
