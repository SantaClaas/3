import { DimButton } from '@claas.dev/dim-button';
import { css } from 'lit';

export class DimOutlinedButton extends DimButton {
  static styles = [
    // Only configure styles that differentiate between buttons
    css`
      button {
        &:enabled {
          --_color: var(--md-sys-color-primary);
          --_background-color: transparent;

          --_shadow-default: none;
          --_shadow-elevated: none;

          --_border: 1px solid var(--md-sys-color-outline);
          --_border-focused: 1px solid var(--md-sys-color-primary);
        }

        &:disabled {
          --_background-color-disabled: transparent;

          --_shadow-disabled: none;

          --_border-disabled: 1px solid
            color-mix(in srgb, var(--md-sys-color-on-surface) 12%, transparent);
        }
      }
    `,
    DimButton.styles,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'dim-outlined-button': DimOutlinedButton;
  }
}
