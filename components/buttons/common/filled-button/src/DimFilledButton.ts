import { DimButton } from '@claas.dev/dim-button';
import { css } from 'lit';

export class DimFilledButton extends DimButton {
  static styles = [
    // Only configure styles that are different between buttons
    css`
      button:enabled {
        --_color: var(--md-sys-color-on-primary);
        --_background-color: var(--md-sys-color-primary);
        --_shadow-default: var(--md-sys-elevation-level-0-shadow);
        --_shadow-elevated: var(--md-sys-elevation-level-1-shadow);
      }
    `,
    DimButton.styles,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'dim-filled-button': DimFilledButton;
  }
}
