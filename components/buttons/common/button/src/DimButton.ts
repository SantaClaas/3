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
      <slot
        name="icon"
        ?slotted=${this._isIconSlotted}
        @slotchange=${this.#slotChanged}
      ></slot>
      <slot @slotchange=${this.#slotChanged}></slot>
    </button>`;
  }

  static styles = css`
    :host {
      /* Tokens listed in docs but not provided with theme builder and extracted from Material Figma community kit */
      /* Use --md-sys-color-shadow maybe? */
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

      --md-sys-elevation-0-shadow: none;

      /* Tokens listed in docs but not provided with theme builder and extracted from Material Documentation */
      /* https://m3.material.io/foundations/interaction/states/state-layers#bf9b84b2-690c-44b2-8429-8c42dc012d43 (there is a list for the states) */
      --md-sys-state-hover-state-layer-opacity: 8%;
      --md-sys-state-focus-state-layer-opacity: 12%;
      --md-sys-state-pressed-state-layer-opacity: 12%;
      --md-sys-state-drag-state-layer-opacity: 16%;

      display: inline-block;
      /* box-sizing: border-box;
      min-height: 48px;
      padding-block: 4px; */
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
      outline: none;
      font-family: var(--md-sys-typescale-label-large-font-family-name);
      line-height: var(--md-sys-typescale-label-large-line-height);
      font-size: var(--md-sys-typescale-label-large-font-size);
      font-style: var(--md-sys-typescale-label-large-font-family-style);
      letter-spacing: var(--md-sys-typescale-label-large-letter-spacing);
      font-weight: var(--md-sys-typescale-label-large-font-weight);

      padding-inline: var(--_padding-inline, 24px);
      padding-block: 10px;
      height: 40px;
      min-width: 48px;
      border-radius: 20px;
      text-align: center;
      /* Have to use display flex to remove funky space between inline elements. As of 2023 there is no other viable solution */
      display: flex;
      align-items: center;
      gap: 8px;

      &:has(slot[name='icon'][slotted]) {
        padding-inline: var(--_padding-inline-icon, 16px 24px);
      }

      & [name='icon']::slotted(*) {
        display: inline-block;
        height: 18px;
        width: 18px;
      }

      &:enabled {
        border: var(--_border, none);
        background-color: var(--_background-color);
        color: var(--_color);
        box-shadow: var(--_shadow-default);
        cursor: pointer;

        &:hover {
          background-color: color-mix(
            in srgb,
            var(--_color) var(--md-sys-state-hover-state-layer-opacity),
            var(--_background-color)
          );
          box-shadow: var(--_shadow-elevated);
        }

        &:focus {
          background-color: color-mix(
            in srgb,
            var(--_color) var(--md-sys-state-focus-state-layer-opacity),
            var(--_background-color)
          );
          border: var(--_border-focused, --_border, none);
        }

        &:active {
          background-color: color-mix(
            in srgb,
            var(--_color) var(--md-sys-state-pressed-state-layer-opacity),
            var(--_background-color)
          );
        }
      }

      &:disabled {
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
