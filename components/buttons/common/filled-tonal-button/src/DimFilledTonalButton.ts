import { DimButton } from '@claas.dev/dim-button';
import { css } from 'lit';

export class DimFilledTonalButton extends DimButton {
  static styles = [
    // Only configure styles that differentiate between buttons
    css`
      button:enabled {
        --_color: var(--md-sys-color-on-secondary-container);
        --_background-color: var(--md-sys-color-secondary-container);
        --_shadow-default: var(--md-sys-elevation-0-shadow);
        --_shadow-elevated: var(--md-sys-elevation-1-shadow);
      }
    `,
    DimButton.styles,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'dim-filled-tonal-button': DimFilledTonalButton;
  }
}
