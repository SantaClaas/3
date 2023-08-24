import { LitElement, css, html } from 'lit';

export class DimFloatingActionButton extends LitElement {
  static styles =
    // Only configure styles that are different between buttons
    css`
      button:enabled {
        -webkit-tap-highlight-color: transparent;

        --_background-color: var(--md-sys-color-primary-container);
        --_color: var(--md-sys-color-on-primary-container);
        all: unset;

        display: inline-block;
        box-shadow: var(--md-sys-elevation-3-shadow);
        background-color: var(--_background-color);
        color: var(--_color);
        border-radius: 16px;
        height: 56px;
        aspect-ratio: 1;
        padding: 16px;
        box-sizing: border-box;
        margin: 16px;

        cursor: pointer;
        ::slotted(*) {
          height: 24px;
          width: 24px;
        }

        &:hover {
          box-shadow: var(--md-sys-elevation-4-shadow);
          background-color: color-mix(
            in srgb,
            var(--_color) var(--md-sys-state-hover-state-layer-opacity),
            var(--_background-color)
          );
        }

        &:focus {
          background-color: color-mix(
            in srgb,
            var(--_color) var(--md-sys-state-focus-state-layer-opacity),
            var(--_background-color)
          );
        }

        &:active {
          background-color: color-mix(
            in srgb,
            var(--_color) var(--md-sys-state-pressed-state-layer-opacity),
            var(--_background-color)
          );
        }
      }
    `;

  render() {
    return html` <button><slot></slot></button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dim-floating-action-button': DimFloatingActionButton;
  }
}
