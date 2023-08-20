import { CSSResultGroup, LitElement, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';

export abstract class DimButton extends LitElement {
  @property({ type: Boolean })
  disabled: boolean = false;

  /**
   * We track if the icon is slotted to apply different styles based on that.
   * This is a workaround for not having a :hasSlotted() CSS selector yet.
   * (":has(::slotted(*))" does not work or causes weird behavior)
   * Track https://github.com/WICG/webcomponents/issues/936 for updates.
   */
  @state()
  private _isIconSlotted = false;

  #slotChanged(event: Event): void {
    if (
      !(event.target instanceof HTMLSlotElement) ||
      event.target.name !== 'icon'
    )
      return;

    this._isIconSlotted = event.target.assignedElements().length > 0;
  }

  render() {
    return html`<button ?disabled=${this.disabled}>
      <div>
        <slot
          name="icon"
          ?slotted=${this._isIconSlotted}
          @slotchange=${this.#slotChanged}
        ></slot>
        <slot @slotchange=${this.#slotChanged}></slot>
      </div>
    </button>`;
  }

  static styles = css`
    :host {
      display: inline-block;
    }

    /* Make touch target at least 48dp.
       Default otherwise at least 44dp.
       https://m3.material.io/foundations/accessible-design/accessibility-basics#28032e45-c598-450c-b355-f9fe737b1cd8
    */
    button {
      min-block-size: 44px;
      min-inline-size: 44px;
    }

    @media (any-pointer: coarse) {
      button {
        min-block-size: 48px;
        min-inline-size: 48px;
      }
    }

    button {
      outline: none;
      background-color: transparent;
      padding: 0;
      border: none;
      -webkit-tap-highlight-color: transparent;

      font-family: var(--md-sys-typescale-label-large-font-family-name);
      line-height: var(--md-sys-typescale-label-large-line-height);
      font-size: var(--md-sys-typescale-label-large-font-size);
      font-style: var(--md-sys-typescale-label-large-font-family-style);
      letter-spacing: var(--md-sys-typescale-label-large-letter-spacing);
      font-weight: var(--md-sys-typescale-label-large-font-weight);

      cursor: default;

      & div {
        text-align: center;
        /* Have to use display flex to remove funky space between inline elements. As of 2023 there is no other viable solution */
        display: flex;
        align-items: center;
        gap: 8px;

        height: 20px;
        padding-block: 10px;
        padding-inline: 24px;
        &:has(slot[name='icon'][slotted]) {
          padding-inline: var(--_padding-inline-icon, 16px 24px);
        }

        background-color: var(--_background-color);
        color: var(--_color);

        box-shadow: var(--_shadow--default);

        border-radius: 20px;
        border: var(--_border, none);

        & slot {
          &[name='icon'] {
            &::slotted(*) {
              display: inline-block;
              height: 18px;
              width: 18px;
            }
          }
        }
      }

      &:enabled {
        cursor: pointer;

        &:hover div {
          background-color: color-mix(
            in srgb,
            var(--_color) var(--md-sys-state-hover-state-layer-opacity),
            var(--_background-color)
          );
          box-shadow: var(--_shadow-elevated);
        }

        &:focus div {
          background-color: color-mix(
            in srgb,
            var(--_color) var(--md-sys-state-focus-state-layer-opacity),
            var(--_background-color)
          );
          border: var(--_border-focused, --_border, none);
        }

        &:active div {
          background-color: color-mix(
            in srgb,
            var(--_color) var(--md-sys-state-pressed-state-layer-opacity),
            var(--_background-color)
          );
        }
      }

      &:disabled div {
        background-color: var(
          --_background-color-disabled,
          color-mix(in srgb, var(--md-sys-color-on-surface) 12%, transparent)
        );
        color: color-mix(
          in srgb,
          var(--md-sys-color-on-surface) 38%,
          transparent
        );
        box-shadow: var(--_shadow-disabled, --md-sys-elevation-0-shadow);
        border: var(--_border-disabled, none);
      }
    }
  ` as CSSResultGroup;
}

declare global {
  interface HTMLElementTagNameMap {
    'dim-elevated-button': DimButton;
  }
}
