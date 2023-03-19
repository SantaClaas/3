// Dim as in my attempt to make a component without lit to see if it is easier.
// Lit is cool but might be overkill for what I need. This is an evaluation.
const template = document.createElement('template');
const input = document.createElement('input');
template.appendChild(input);

export class Component extends HTMLElement {
  #shadowRoot;

  constructor() {
    super();

    this.#shadowRoot = this.attachShadow({ mode: 'open' });
    this.#shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
