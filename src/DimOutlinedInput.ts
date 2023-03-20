import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class DimOutlinedInput extends LitElement {
  //TODO look up Lit CssRule thingy to compbine multiple styles and extract style to shared file when we have multiple components
  static styles = css`
    :host {
      /* Elevation */
      --dim-elevation-0: #121212;
      --dim-elevation-1: #1d1d1d;
      --dim-elevation-2: #212121;
      --dim-elevation-3: #242424;
      --dim-elevation-4: #272727;
      --dim-elevation-6: #2c2c2c;
      --dim-elevation-8: #2d2d2d;
      --dim-elevation-12: #323232;
      --dim-elevation-16: #353535;
      --dim-elevation-24: #373737;

      /* Emphasis */
      --dim-emphais-high: #e0e0e0;
      --dim-emphasis-medium: #a0a0a0;
      --dim-emphasis-low: #6c6c6c;

      /* Primary color
         based on https://material.io/design/color/the-color-system.html#tools-for-picking-colors with FA52FA  */
      --dim-primary-50: #f9e5ea;
      --dim-primary-100: #f2becb;
      --dim-primary-200: #e996aa;
      --dim-primary-300: #e0708a;
      --dim-primary-400: #d85973;
      --dim-primary-500: #d1495e;
      --dim-primary-600: #c1445b;
      --dim-primary-700: #ab3f56;
      --dim-primary-800: #963a51;
      --dim-primary-900: #703246;
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
