import { LitElement, css, html } from 'lit';
/**
 * The optional headline can be configured through a slot to allow users to define the appropriate semantic headline level (h1-h6)
 */
export class DimNavigationSection extends LitElement {
  static styles = css`
    ol {
      all: unset;
      list-style-type: none;
    }

    slot[name='headline']::slotted(*) {
      padding-inline: 16px;
      /* 18dp so we add up to 56 again due to no icon taking additional 2dp */
      padding-block: 18px;

      margin: 0;

      color: var(--_color);

      font-family: var(--md-sys-typescale-title-small-font-family-name);
      line-height: var(--md-sys-typescale-title-small-line-height);
      font-size: var(--md-sys-typescale-title-small-font-size);
      font-style: var(--md-sys-typescale-title-small-font-family-style);
      letter-spacing: var(--md-sys-typescale-title-small-letter-spacing);
      font-weight: var(--md-sys-typescale-title-small-font-weight);
    }
  `;

  protected render() {
    return html`
      <section>
        <!-- Optional headline (would use h1-h6 but that should be a user decision with slots) -->
        <slot name="headline"></slot>
        <ol>
          <slot></slot>
        </ol>
      </section>
    `;
  }
}
