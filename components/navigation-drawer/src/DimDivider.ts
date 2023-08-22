import { LitElement, css, html } from 'lit';

//TODO add badges support
//TODO use filled out icons for current destination
//TODO only use expanded after > 1239dp https://m3.material.io/components/navigation-drawer/guidelines#81b637af-d1c6-4edd-84fd-487eb9860d76
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
