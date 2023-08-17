import { LitElement, css, html } from 'lit';

export class DimElevatedButton extends LitElement {
  render() {
    return html`<button
      @click=${() => {
        console.log('click');
      }}
    >
      <svg
        height="48"
        width="48"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" />
      </svg>
      <slot></slot>
    </button>`;
  }

  static styles = css`
    :host {
      /* Based on figma community kit */
      --md-sys-elevation-light-1-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15),
        0px 1px 2px 0px rgba(0, 0, 0, 0.3);
      --md-sys-elevation-light-2-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15),
        0px 1px 2px 0px rgba(0, 0, 0, 0.3);
      --md-sys-elevation-light-3-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3),
        0px 4px 8px 3px rgba(0, 0, 0, 0.15);
      --md-sys-elevation-light-4-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3),
        0px 6px 10px 4px rgba(0, 0, 0, 0.15);
      --md-sys-elevation-light-5-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3),
        0px 8px 12px 6px rgba(0, 0, 0, 0.15);

      --md-sys-elevation-dark-1-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
        0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      --md-sys-elevation-dark-2-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
        0px 2px 6px 2px rgba(0, 0, 0, 0.15);
      --md-sys-elevation-dark-3-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3),
        0px 4px 8px 3px rgba(0, 0, 0, 0.15);
      --md-sys-elevation-dark-4-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3),
        0px 6px 10px 4px rgba(0, 0, 0, 0.15);
      --md-sys-elevation-dark-5-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3),
        0px 8px 12px 6px rgba(0, 0, 0, 0.15);
    }

    @media (prefers-color-scheme: light) {
      :host {
        --md-sys-elevation-1-shadow: var(--md-sys-elevation-light-1-shadow);
        --md-sys-elevation-2-shadow: var(--md-sys-elevation-light-2-shadow);
        --md-sys-elevation-3-shadow: var(--md-sys-elevation-light-3-shadow);
        --md-sys-elevation-4-shadow: var(--md-sys-elevation-light-4-shadow);
        --md-sys-elevation-5-shadow: var(--md-sys-elevation-light-5-shadow);
      }
    }

    @media (prefers-color-scheme: dark) {
      :host {
        --md-sys-elevation-1-shadow: var(--md-sys-elevation-dark-1-shadow);
        --md-sys-elevation-2-shadow: var(--md-sys-elevation-dark-2-shadow);
        --md-sys-elevation-3-shadow: var(--md-sys-elevation-dark-3-shadow);
        --md-sys-elevation-4-shadow: var(--md-sys-elevation-dark-4-shadow);
        --md-sys-elevation-5-shadow: var(--md-sys-elevation-dark-5-shadow);
      }
    }

    button {
      border: none;
      background-color: var(--md-sys-color-surface-container-low);
      box-shadow: var(--md-sys-elevation-1-shadow);

      color: var(--md-sys-color-primary);
      font-family: var(--md-sys-typescale-label-large-font-family-name);
      line-height: var(--md-sys-typescale-label-large-line-height);
      font-size: var(--md-sys-typescale-label-large-font-size);
      letter-spacing: var(--md-sys-typescale-label-large-letter-spacing);
      font-weight: var(--md-sys-typescale-label-large-font-weight);

      padding-inline: 16px 24px;
      padding-block: 10px;
      height: 40px;
      border-radius: 20px;
      text-align: center;
    }

    svg,
    slot {
      vertical-align: middle;
      text-align: center;
    }
    svg,
    slot[name='icon'] {
      display: inline-block;
      /* Adding 8 so we get to 24 with or without icon */
      margin-inline-end: 8px;
      /* height: 100%; */
      height: 20px;
      width: 20px;
      aspect-ratio: 1;
      /* color: var(--md-sys-color-primary); */
    }

    ::slotted(*) {
      display: inline-block;
      /* height: 100%; */
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'dim-elevated-button': DimElevatedButton;
  }
}
