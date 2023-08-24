import { CSSResultGroup, LitElement, css, html } from 'lit';

export class DimBadge extends LitElement {
  static styles?: CSSResultGroup | undefined = css`
    :host {
    }
  `;

  protected render() {
    return html` <slot></slot>`;
  }
}
