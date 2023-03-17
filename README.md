# Web Components Library looking for a name

## Installation

```bash
npm i claas-outlined-input
```

## Usage

```html
<script type="module">
  import 'claas-outlined-input/claas-outlined-input.js';
</script>

<claas-outlined-input></claas-outlined-input>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

A web component library for me to reuse components I otherwise often duplicate in different projects
3, because 3 is my favorite number.

## Things I am using or used

_...and want to give credit to_

- [material.io](https://material.io) by Google because it is a great design system resource to get starting and base the design on.
- The different specifications that make up web components like custom elements' ["what is a valid custom element name"](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)
- [HTML with Superpowers](https://htmlwithsuperpowers.netlify.app/) by Dave Rupert
- [Open Web Components](https://open-wc.org/) to scaffold this project (the recommedations are pretty alright)
- [Lit](https://list.dev/) to make it easier writing web components
- Great YouTube videos that I found very informative
  - [Design at scale with Web Components (and ducks)](https://youtu.be/DBcz_bGcHgk) presented by Liz Mitchell and Rody Davis on Google Chrome Developers
  - [GUI Challenges](https://youtube.com/playlist?list=PLNYkxOF6rcIAaV1wwI9540OC_3XoIzMjQ) presented by Adam Argyle on Google Chrome Developers
  - [Creating Web Components - With Special Guest Dave Rupert!](https://youtu.be/Sq5oiHjwFxI) presented by Dave Rupert and Kevin Powell

## Things I want to try

- The components from [Open UI](https://open-ui.org/) to base my own on them for when there is something that native HTML does not provide.
- [Open Props](https://open-props.style/) seems to be a great base line for styling and will make things easier

## Other related links

- [webcomponents.dev](https://webcomponents.dev/)
- [Modern Web](https://modern-web.dev/) like [Open Web Components](https://open-wc.org/)
