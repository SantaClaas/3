import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class ClaasOutlinedInput extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--claas-outlined-input-text-color, #000);
    }
  `;

  @property({ type: String }) value: string | undefined;

  @property({ type: String }) label: string | undefined;

  @property({ type: String }) helperText: string | undefined;

  @property({ type: Boolean }) isError = false;

  render() {
    return html``;
  }
}
