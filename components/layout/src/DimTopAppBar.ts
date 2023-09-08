import { LitElement, css, html } from 'lit';

export class DimTopAppBar extends LitElement {
  static styles = css`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      all: unset;
    }

    @keyframes fill-color-and-elevate {
      to {
        background-color: var(--md-sys-color-surface-container);
        z-index: var(--md-sys-elevation-level-2-z-index);
        box-shadow: var(--md-sys-elevation-level-2-shadow);
      }
    }

    header {
      position: sticky;
      inset: 0 0 auto 0;

      --_bar-height: 64px;
      width: 100%;
      height: var(--_bar-height);

      z-index: var(--md-sys-elevation-level-0-z-index);

      box-sizing: border-box;
      padding: 8px 4px;
      display: grid;
      grid-template-columns: auto 1fr minmax(48px, auto);
      gap: 6px;

      /* TODO on scroll background-color: var(--md-sys-color-surface-container); */
      background-color: var(--md-sys-color-surface);
      /* TODO on scroll box-shadow: var(--md-sys-elevation-level-2); */
      box-shadow: var(--md-sys-elevation-level-0);
      color: var(--md-sys-color-on-surface);

      animation: fill-color-and-elevate linear both;
      animation-timeline: scroll();
      animation-range: 0 var(--_bar-height);

      & slot:not([name='headline'])::slotted(*) {
        all: unset;
        display: grid;
        align-content: center;
        justify-content: center;
        height: 48px;
        width: 48px;

        cursor: pointer;
      }

      & slot[name='headline'] {
        display: grid;
        justify-content: center;
        padding: 0;
        text-align: center;

        &::slotted(*) {
          /* Headline font */
          font-family: var(--md-sys-typescale-title-large-font-family-name);
          font-style: var(--md-sys-typescale-title-large-font-family-style);
          font-weight: var(--md-sys-typescale-title-large-font-weight);
          font-size: var(--md-sys-typescale-title-large-font-size);
          letter-spacing: var(--md-sys-typescale-title-large-tracking);
          line-height: var(--md-sys-typescale-title-large-height);
          text-transform: var(--md-sys-typescale-title-large-text-transform);
          text-decoration: var(--md-sys-typescale-title-large-text-decoration);
        }
      }

      & slot[name='trailing-icon'] {
        color: var(--md-sys-color-on-surface-variant);
      }
    }
  `;

  protected render() {
    return html`
      <!-- Top App Bar -->
      <header>
        <slot name="leading-navigation-icon"></slot>
        <slot name="headline"></slot>
        <slot name="trailing-icon"></slot>
      </header>
    `;
  }
}
