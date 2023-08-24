import { LitElement, css, html } from 'lit';
import { DimNavigationItem } from './DimNavigationItem.js';
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

  static #slotChanged(event: Event): void {
    if (!(event.target instanceof HTMLSlotElement)) return;

    const assignedElements = event.target.assignedElements();

    // This approach does not account for dynamic updates to href
    for (let index = 0; index < assignedElements.length; index++) {
      const element = assignedElements[index];

      if (
        !(element instanceof DimNavigationItem) ||
        element.href !== window.location.href
      )
        continue;

      element.isActive = true;
      break;
      // Only the first item is marked as active as multiple items being active is unwanted behavior
    }
  }

  protected render() {
    return html`
      <section>
        <slot name="headline"></slot>
        <ol>
          <slot @slotchange=${DimNavigationSection.#slotChanged}></slot>
        </ol>
      </section>
    `;
  }
}
