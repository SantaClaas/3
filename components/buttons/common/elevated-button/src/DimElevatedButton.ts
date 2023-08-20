import { css } from 'lit';
import { DimButton } from '@claas.dev/dim-button';

export class DimElevatedButton extends DimButton {
  static styles = [
    // Only configure styles that are different between buttons
    css`
      button:enabled {
        --_color: var(--md-sys-color-primary);
        --_background-color: var(--md-sys-color-surface-container-low);
        --_shadow-default: var(--md-sys-elevation-1-shadow);
        --_shadow-elevated: var(--md-sys-elevation-2-shadow);
      }
    `,
    DimButton.styles,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'dim-elevated-button': DimElevatedButton;
  }
}
