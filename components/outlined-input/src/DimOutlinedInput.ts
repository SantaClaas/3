import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('dim-outlined-input')
export class DimOutlinedInput extends LitElement {
  @property({ type: String })
  label: string | undefined = undefined;

  @property({ type: String })
  value: string = '';

  @property({ type: String })
  placeholder: string | undefined = undefined;

  @property({ type: Boolean })
  disabled: boolean = false;

  #oninput(event: Event) {
    // Keep the value up to date to be read by external event listeners through the event.target.value property
    // And this is also needed to keep the value up to date for the empty attribute
    this.value = (event.target as HTMLInputElement).value;
    // The input event is composed so we don't need to refire it
  }

  #onchange(event: Event) {
    // Need to refire the event because the event is not composed
    const newEvent = new Event('change', {
      bubbles: event.bubbles,
      composed: event.composed,
      cancelable: event.cancelable,
    });
    this.dispatchEvent(newEvent);
  }

  render() {
    return html`
      <div>
        <div class="group">
          <input
            id="input"
            .value=${this.value}
            .placeholder=${this.placeholder ?? ' '}
            ?autofocus=${this.autofocus}
            ?disabled=${this.disabled}
            @input=${this.#oninput}
            @change=${this.#onchange}
          />
          <div class="fillers">
            <!-- Filler start -->
            <div class="filler-start"></div>
            ${
              // The label is technically not optional by spec as far as I can tell but we can't control how users use
              // our component so we need to handle the case where the label is not provided
              this.label
                ? html`
                    <!-- Filler middle -->
                    <div class="filler-middle">
                      <label for="input">${this.label}</label>
                    </div>
                  `
                : nothing
            }
            <!-- Filler end -->
            <div class="filler-end"></div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    * {
      box-sizing: border-box;
      border-width: 0;
      border-style: solid;
    }

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
          /* The width should default to 16px but for the label to align with the input we need to substract the label
           padding of 4px */
          width: 12px;
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
            padding: 0 4px;

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

    /* States: (This is going to be a great binary tree)
      - empty -> :placeholder-shown (not empty -> :not(:placeholder-shown)
      - focus -> :focus-within
      - hover -> :hover
      - disabled -> :disabled
      - error
      - placeholder -> :not([placeholder=" "]) (no placeholder -> [placeholder=" "])
      (- supporting text)
      (- character count)
      (- character limit)
      (- leading icon)
      (- trailing icon)
      (- autofilled -> :autofill )
      (- AND ALL THE DIFFERENT TYPES OF INPUT ) */

    /* NOT EMPTY, FOCUS, NO PLACEHOLDER */
    /*              |-NO-PLACEHOLDER||-NOT-EMPTY------------| |-FOCUS-------| */
    .group:has(input[placeholder=" "]:not(:placeholder-shown)):focus-within,
    /* NOT EMPTY, FOCUS, PLACEHOLDER */
    /*              |-PLACEHOLDER--------| |-NOT-EMPTY------------| |-FOCUS-----| */
    .group:has(input:not([placeholder=" "]):not(:placeholder-shown)):focus-within,
    /* EMPTY,     FOCUS, PLACEHOLDER */
    /*              |-PLACEHOLDER--------| |-EMPTY----------| |-FOCUS-------| */
    .group:has(input:not([placeholder=" "]):placeholder-shown):focus-within,
    /* EMPTY,     FOCUS, NO PLACEHOLDER */
    /*              |-NO-PLACEHOLDER||-EMPTY----------| |-FOCUS-------| */
    .group:has(input[placeholder=" "]:placeholder-shown):focus-within {
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
          padding-top: 1px;
          border-width: 0 0 2px 0;
          border-top-color: transparent;

          & label {
            translate: 0 -50%;
            padding: 0 4px;
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

    /* When placeholder is filled (:not([placeholder=" "])) and it is shown, and the it is empty, move label up */
    .group:has(input:not([placeholder=' ']):placeholder-shown) {
      & .fillers {
        & .filler-middle {
          /* border-top-color: transparent; */
          padding-top: 1px;
          border-width: 0 0 1px 0;
          & label {
            translate: 0 -50%;
            padding: 0 4px;
            font-size: var(--md-sys-typescale-body-small-font-size);
            line-height: var(--md-sys-typescale-body-small-line-height);
          }
        }
      }
    }

    /* We check if input is empty with a dirty trick that looks for the placeholder not being shown when the placeholder
      is a space character that looks to the user as if there was no placeholder */
    /* NOT EMPTY, NOT FOCUS */
    .group:has(input:not(:placeholder-shown)):not(:focus-within) {
      & .fillers .filler-middle {
        border-top-color: transparent;
        padding-top: 1px;
        border-width: 0 0 1px 0;
        & label {
          translate: 0 -50%;
          padding: 0 4px;
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
    .group:hover:not(:focus-within):has(input:not(:disabled)) {
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
    'dim-outlined-input': DimOutlinedInput;
  }
}
