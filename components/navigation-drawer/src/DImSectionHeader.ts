import { consume } from '@lit-labs/context';
import { LitElement, css, html } from 'lit';
import { dimNavigationHostContext } from './DimNavigationHostContext.js';
import NavigationHost from './NavigationHost.js';

export class DimSectionHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 18px 16px;

      color: var(--md-sys-color-on-surface-variant);
      font-family: var(--md-sys-typescale-title-small-font-family-name);
      line-height: var(--md-sys-typescale-title-small-line-height);
      font-size: var(--md-sys-typescale-title-small-font-size);
      font-style: var(--md-sys-typescale-title-small-font-family-style);
      letter-spacing: var(--md-sys-typescale-title-small-letter-spacing);
      font-weight: var(--md-sys-typescale-title-small-font-weight);
    }
  `;

  @consume({ context: dimNavigationHostContext })
  private navigationHost?: NavigationHost;

  render() {
    // Headline should use h1-h6 but that is a user decision depending on layout
    return html`<slot></slot>`;
  }
}
