import { LitElement, css, html } from 'lit';

export class DimLayout extends LitElement {
  static styles = css`
    slot:not([name]) {
      display: block;

      padding: 0 16px;
      box-sizing: border-box;
    }
  `;

  protected render() {
    return html`
      <dim-top-app-bar>
        <button slot="leading-navigation-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <h1 slot="headline">Dim Components</h1>
      </dim-top-app-bar>
      <slot></slot>
    `;
  }
}
