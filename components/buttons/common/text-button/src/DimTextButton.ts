import { DimButton } from '@claas.dev/dim-button';
import { css } from 'lit';

export class DimTextButton extends DimButton {
  static styles = [
    // Only configure styles that are different between buttons
    css`
      button {
        --_padding-inline: 12px;
        --_padding-inline-icon: 12px 16px;

        &:enabled {
          --_color: var(--md-sys-color-primary);
          --_background-color: transparent;

          --_shadow-default: var(--md-sys-elevation-0-shadow);
          --_shadow-elevated: none;
        }

        &:disabled {
          --_background-color-disabled: transparent;
        }
      }
    `,
    DimButton.styles,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'dim-text-button': DimTextButton;
  }
}
