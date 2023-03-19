import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class DimOutlinedInput extends LitElement {
  static styles = css`
    /* @import 'open-props/shadow/style'; */

    :host {
    }

    .container {
    }

    .container:focus-within {
      border-color: var(--purple-5);
    }
  `;

  @property({ type: String }) value: string | undefined;

  @property({ type: String }) label: string | undefined;

  @property({ type: String }) helperText: string | undefined;

  @property({ type: Boolean }) isError = false;

  render() {
    return html`
      <div>
        <div class="container">dada</div>
      </div>
    `;
  }
}
