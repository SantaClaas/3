import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("dim-outlined-input")
export class DimOutlinedInput extends LitElement {
  @property({ type: String })
  value: string = "";

  @property({ type: Boolean })
  autofocus: boolean = false;

  #oninput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }

  render() {
    return html`<div>
      <div class="group">
        <input
          id="input"
          @input=${this.#oninput}
          ?empty=${!this.value}
          .value=${this.value}
          ?autofocus=${this.autofocus}
        />
        <div class="fillers">
          <!-- Filler start -->
          <div class="filler-start"></div>
          <!-- Filler middle -->
          <div class="filler-middle">
            <label for="input">Label text 1</label>
          </div>
          <!-- Filler end -->
          <div class="filler-end"></div>
        </div>
      </div>
    </div>`;
  }

  static styles = css`
    :host {
      display: block;
    }
    * {
      box-sizing: border-box;
      border-width: 0;
      border-style: solid;
      /* border-color: var(--md-sys-color-outline); */
    }

    /* normalize
        input {
      font-family: inherit;
      font-size: 100%;
      font-weight: inherit;
      line-height: inherit;
      color: inherit;
      margin: 0;
      padding: 0;
       Using invisible border so label text and content text are on same height
      border-width: 1px 0;
      border-color: transparent;
    }
    */

    .group {
      position: relative;
      border-radius: 0.375rem;

      & input {
        all: unset;
        box-sizing: border-box;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
        background-color: var(--md-sys-color-surface);

        /* outline-none */
        outline: 2px solid transparent;
        outline-offset: 2px;

        /* leading-none */
        line-height: 1;

        padding: 16px;

        border-radius: 0.375rem;

        touch-action: manipulation;

        width: 100%;

        /* Styling text (and caret) */
        caret-color: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-surface);
        font-family: var(--md-sys-typescale-body-large-font-family-name);
        line-height: var(--md-sys-typescale-body-large-line-height);
        font-size: var(--md-sys-typescale-body-large-font-size);
        font-weight: var(--md-sys-typescale-body-large-font-weight);
        letter-spacing: var(--md-sys-typescale-body-large-letter-spacing);
        border-width: 1px 0;
      }

      & .fillers {
        touch-action: manipulation;

        width: 100%;

        height: 100%;

        display: flex;

        position: absolute;
        top: 0;
        left: 0;

        /* pointer-events-none */
        pointer-events: none;

        /* Define this to be inherited by filler segments */
        --border-color: var(--md-sys-color-outline);

        & .filler-start {
          border-width: 1px 0 1px 1px;
          border-radius: 0.375rem 0 0 0.375rem;
          width: 16px;
          border-color: var(--border-color);
        }

        & .filler-middle {
          padding: 3px 0 0 0;
          width: auto;
          border-width: 1px 0;
          border-color: var(--border-color);

          & label {
            /* Allow users to copy code and inputs divert focus to their input on click.
               The other elements have no pointer events because they don't have text and overlap the input that should be selected */
            pointer-events: auto;
            display: block;
            color: var(--md-sys-color-on-surface-variant);

            white-space: nowrap;

            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;

            translate: 0 50%;

            font-family: var(--md-sys-typescale-body-large-font-family-name);
            line-height: var(--md-sys-typescale-body-large-line-height);
            font-size: var(--md-sys-typescale-body-large-font-size);
            font-weight: var(--md-sys-typescale-body-large-font-weight);
            letter-spacing: var(--md-sys-typescale-body-large-letter-spacing);
          }
        }

        & .filler-end {
          border-width: 1px 1px 1px 0;
          border-radius: 0 0.375rem 0.375rem 0;
          border-color: var(--border-color);
          flex-grow: 1;
        }
      }
    }

    /* States:
      - empty
      - focus
      - hover
      - disabled
      - error */

    /* EMPTY, FOCUS */
    /* Only remove border top when label moves up e.g focus, not-empty, placeholder shown */
    .group:has(input[empty]):focus-within,
    /* NOT EMPTY, FOCUS */
    .group:has(input:not([empty])):focus-within {
      & input {
        color: var(--md-sys-color-primary);
      }

      & .fillers {
        /* Overwrite border color */
        --border-color: var(--md-sys-color-primary);

        & .filler-start {
          border-width: 2px 0 2px 2px;
        }

        & .filler-middle {
          /* Padding to account for border size increase. This avoids the label layout shift */
          padding-top: 2px;
          border-width: 0 0 2px 0;
          border-top-color: transparent;

          & label {
            translate: 0 -50%;
            color: var(--md-sys-color-primary);
            font-size: var(--md-sys-typescale-body-small-font-size);
            line-height: var(--md-sys-typescale-body-small-line-height);
          }
        }

        & .filler-end {
          border-width: 2px 2px 2px 0;
        }
      }
    }

    /* NOT EMPTY, NOT FOCUS */
    .group:has(input:not([empty])):not(:focus-within) {
      & .fillers .filler-middle {
        border-top-color: transparent;
        padding-top: 2px;
        border-width: 0 0 1px 0;
        & label {
          translate: 0 -50%;
          font-size: var(--md-sys-typescale-body-small-font-size);
          line-height: var(--md-sys-typescale-body-small-line-height);
        }
      }
    }

    /* DISABLED */
    .group:has(input:disabled) {
      --disable-color: color-mix(
        in srgb,
        var(--md-sys-color-on-surface) 38%,
        transparent
      );

      & input {
        color: var(--disable-color);
      }

      & .fillers {
        --border-color: color-mix(
          in srgb,
          var(--md-sys-color-on-surface) 12%,
          transparent
        );

        & .filler-middle label {
          color: var(--disable-color);
        }
      }
    }

    /* HOVER (Focus should overwrite hover) */
    .group:hover:not(:focus-within) {
      & .fillers {
        --border-color: var(--md-sys-color-on-surface);

        & .filler-middle input {
          color: var(--md-sys-color-on-surface);
        }
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "dim-outlined-input": DimOutlinedInput;
  }
}
