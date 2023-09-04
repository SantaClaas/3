import { css, html, nothing } from 'lit';
import NavigationHost from './NavigationHost.js';

export class DimNavigationBar extends NavigationHost {
  static styles = css`
    :host {
      position: fixed;
      inset: auto 0 0 0;

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

      height: 80px;
      padding: 0 8px;

      & ol {
        all: unset;
        display: flex;
        gap: 8px;
        justify-content: space-between;

        list-style-type: none;

        & li {
          width: 100%;

          & a {
            all: unset;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;

            width: 100%;
            padding: 12px 0 16px 0;

            cursor: pointer;

            /* Icon container */
            & div {
              height: 24px;
              width: 24px;
              padding: 4px 20px;

              position: relative;

              border-radius: var(--md-sys-shape-corner-large);
              & svg {
                height: 24px;
                width: 24px;
              }

              /* Badge */
              & span {
                position: absolute;
                inset: 2px auto auto 50%;

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

            &[active] {
              color: var(--md-sys-color-on-surface);

              & div {
                background-color: var(--md-sys-color-secondary-container);

                /* Icon color is different to text */
                & > svg {
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
          ${this.items.map(
            item => html`
              <li>
                <a href="${item.href}" ?active=${item.isActive}>
                  <div>
                    ${item.isActive ? item.iconFilled : item.iconOutlined}
                    ${item.badge ? html`<span>${item.badge}</span>` : nothing}
                  </div>

                  ${item.label}
                </a>
              </li>
            `
          )}
        </ol>
      </nav>
    `;
  }
}
