import { LitElement, css, html } from 'lit';
/**
 * The optional headline can be configured through a slot to allow users to define the appropriate semantic headline level (h1-h6)
 */
export class DimNavigationSection extends LitElement {
  static styles = css`
    :host {
      display: block;

      container-type: inline-size;
      height: 80px;
    }

    /* Media queries nested in :host don't work apparently (in Chrome) */
    /* Medium */
    @media (min-width: 600px) and (max-width: 840px) {
      :host {
        height: auto;
      }
    }

    /* Exapnded */
    @media (min-width: 840px) and (max-width: 1240px) {
      :host {
        height: auto;
      }
    }

    /* "Expandeder" special navigation case */
    @media (min-width: 1240px) {
      :host {
        height: auto;
      }
    }

    section {
      height: 100%;
      & ol {
        all: unset;

        height: 100%;
        list-style-type: none;
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
    }

    @media (min-width: 600px) {
      section ol {
        flex-direction: column;
        /* gap: 12px; */
        gap: 4px;

        padding: 5px;
      }
    }

    @media (min-width: 1240px) {
      section ol {
        padding: 0;
      }
    }

    /* Headline */
    slot[name='headline']::slotted(*) {
      /* Hide headline when not expanded */
      display: none;
    }

    @media (min-width: 1240px) {
      slot[name='headline']::slotted(*) {
        display: block;
        /* 18dp so we add up to 56 again due to no icon taking additional 2dp */
        padding: 18px 16px;

        margin: 0;

        color: var(--_color);

        font-family: var(--md-sys-typescale-title-small-font-family-name);
        line-height: var(--md-sys-typescale-title-small-line-height);
        font-size: var(--md-sys-typescale-title-small-font-size);
        font-style: var(--md-sys-typescale-title-small-font-family-style);
        letter-spacing: var(--md-sys-typescale-title-small-letter-spacing);
        font-weight: var(--md-sys-typescale-title-small-font-weight);
      }
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
