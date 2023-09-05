import { LitElement, css, html } from 'lit';

export class DimDivider extends LitElement {
  static styles =
    // Only configure styles that are different between buttons
    css`
      hr {
        border: none;
        border-top: 1px solid var(--md-sys-color-outline-variant);
        margin: 0;
        margin-inline: 16px;
        box-sizing: border-box;
      }
    `;

  render() {
    return html`<hr />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dim-divider': DimDivider;
  }
}
