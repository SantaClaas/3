import { css, html, nothing } from 'lit';
import NavigationHost from './NavigationHost.js';
import { renderNavigationItem } from './DimNavigationItem.js';

export class DimNavigationRail extends NavigationHost {
  static styles = css`
    :host {
      width: 80px;
      height: 100dvh;

      position: sticky;
      inset: 0 auto 0 0;

      --_background-color: var(--md-sys-color-surface);
      background-color: var(--_background-color);
      color: var(--md-sys-color-on-surface-variant);

      font-family: var(--md-sys-typescale-label-medium-font-family-name);
      line-height: var(--md-sys-typescale-label-medium-line-height);
      font-size: var(--md-sys-typescale-label-medium-font-size);
      font-style: var(--md-sys-typescale-label-medium-font-family-style);
      letter-spacing: var(--md-sys-typescale-label-medium-letter-spacing);
      font-weight: var(--md-sys-typescale-label-medium-font-weight);
    }

    nav {
      box-sizing: border-box;
      padding: 44px 0 56px 0;

      & ol {
        all: unset;

        display: flex;
        flex-direction: column;
        gap: 4px;

        padding: 5px;

        & li {
          & a {
            all: unset;

            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;

            height: 56px;

            cursor: pointer;

            /* Icon container */

            /* No label */
            & div {
              height: 24px;
              width: 24px;

              --_icon-container-padding-y: 16px;
              --_icon-container-padding-x: 16px;
              padding: var(--_icon-container-padding-y)
                var(--_icon-container-padding-x);

              position: relative;

              border-radius: 100px;

              & svg {
                height: 24px;
                width: 24px;
              }

              /* Badge */
              --_badge-position-top: 14px;
              & span {
                position: absolute;
                inset: var(--_badge-position-top) auto auto 50%;

                display: flex;
                align-items: center;
                justify-content: center;

                height: 14px;
                width: auto;
                min-width: 16px;
                min-height: 16px;
                padding: 0px 4px;
                box-sizing: border-box;

                border-radius: 8px;
                background-color: var(--md-sys-color-error);
                color: var(--md-sys-color-on-error);

                text-align: center;

                font-family: var(
                  --md-sys-typescale-label-small-font-family-name
                );
                line-height: var(--md-sys-typescale-label-small-line-height);
                font-size: var(--md-sys-typescale-label-small-font-size);
                font-style: var(
                  --md-sys-typescale-label-small-font-family-style
                );
                letter-spacing: var(
                  --md-sys-typescale-label-small-letter-spacing
                );
                font-weight: var(--md-sys-typescale-label-small-font-weight);
              }
            }

            /* Has label */
            &:has(> span) div {
              --_icon-container-padding-y: 4px;
              --_badge-position-top: 2px;
            }

            /* States */
            /* Inactive */
            &:hover div {
              background-color: color-mix(
                in srgb,
                var(--md-sys-color-on-surface-variant)
                  var(--md-sys-state-hover-state-layer-opacity),
                var(--_background-color)
              );
            }

            &:focus div {
              background-color: color-mix(
                in srgb,
                var(--md-sys-color-on-surface-variant)
                  var(--md-sys-state-focus-state-layer-opacity),
                var(--_background-color)
              );
            }

            &:active div {
              background-color: color-mix(
                in srgb,
                var(--md-sys-color-on-surface-variant)
                  var(--md-sys-state-pressed-state-layer-opacity),
                var(--_background-color)
              );
            }

            /* Active (duh) */
            &[active] {
              color: var(--md-sys-color-on-surface);

              & div {
                background-color: var(--md-sys-color-secondary-container);

                /* Icon color is different to text */
                & svg {
                  color: var(--md-sys-color-on-secondary-container);
                }
              }

              &:hover div {
                background-color: color-mix(
                  in srgb,
                  var(--md-sys-color-on-surface)
                    var(--md-sys-state-hover-state-layer-opacity),
                  var(--md-sys-color-secondary-container)
                );

                color: var(--md-sys-on-secondary-container);
              }

              &:focus div {
                background-color: color-mix(
                  in srgb,
                  var(--md-sys-color-on-secondary-container)
                    var(--md-sys-state-focus-state-layer-opacity),
                  var(--md-sys-color-secondary-container)
                );

                color: var(--md-sys-on-secondary-container);
              }

              &:active div {
                background-color: color-mix(
                  in srgb,
                  var(--md-sys-color-on-secondary-container)
                    var(--md-sys-state-focus-state-layer-opacity),
                  var(--md-sys-color-secondary-container)
                );

                color: var(--md-sys-on-secondary-container);
              }
            }
          }
        }
      }
    }
  `;

  render() {
    return html`
      <nav>
        <ol>
          ${this.items.map(renderNavigationItem)}
        </ol>
      </nav>
    `;
  }
}
