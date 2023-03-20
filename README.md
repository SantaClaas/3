# Dim - because [claas](https://claas.dev) is not very bright
> _(It's a joke because...oh...ok...I ruined it...)_

A web component library because I am too lazy to write the same components over and over again in different flavors.

## Installation

> ⚠️ This is currently not possible. I haven't published it.
```bash
npm i dim-outlined-input
```

## Usage

```html
<script type="module">
  import 'dim-outlined-input/dim-outlined-input.js';
</script>

<dim-outlined-input></dim-outlined-input>
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

## Why not use existing component libraries

Because I like to make my life difficult and I like to have control and know the reasons for each tradeoff

## Principles

- Keep it simple
  - Behave like native HTML when possible
  - Prefer "pure" functions
  - Don't use unnecessary abbreviations without explaining them before e.g. "std" for "sexually transmittable disease"
- Web apps first, web pages second.
  - The intended usage is with web apps which influences things like navigation and other design decisions. But it should work with web pages because it is still native web technologies. Web pages just won't be a priority
  - In my experience web pages and web apps differ in some design decisions

## Things I am using or have used

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

## Things I want to use

- The components from [Open UI](https://open-ui.org/) to base my own on them for when there is something that native HTML does not provide.
- [Open Props](https://open-props.style/) seems to be a great base line for styling and will make things easier
- A calendar component based on [Making Calendars With Accessibility and Internationalization in Mind](https://css-tricks.com/making-calendars-with-accessibility-and-internationalization-in-mind/) by Mads Stoumann on CSS-Tricks

## Other related links

- [webcomponents.dev](https://webcomponents.dev/)
- [Modern Web](https://modern-web.dev/) like [Open Web Components](https://open-wc.org/)

## Native HTML Elements I want to use and remember

- date - for dates I believe...not sure
- article
- section
- header
- footer

## Naming (Work in Progress)

Things to consider for naming:

- How will the name appear in markup (HTML)?
- Web Components require a namespace seperated with a dash e.g. "ice-outlined-input"
  - Therefore the name has to be accompanied by a short namespace tag or the name is the tag
  - The tag/namespace should not be more than 3 letters. There needs to be a good reason for more than 3 letters (e.g. it's an awesome name).

That being said...

### Current contestants

_(basically a list of cool three letter words)_

<table>
  <thead>
    <tr>
      <th>
        Contestant
      </th>
      <th>
        Pros
      </th>
      <th>
        Cons
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>dim</td>
      <td colspan="2">
        THIS IS IT! WE FOUND IT! ✅ (might change opinion later)
        <ul>
          <li>
          it has 3 letters
          </li>
          <li>
          it is the opposite of "lit" which is a web components library, which is funny (at least to me)
          </li>
          <li>
          the theme I am going for is quite "dim"
          </li>
          <li>
          you could say I'm not the brightest or...pretty dim 🤡
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>bey</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>ice</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>tri</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>sue</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>iii</td>
      <td>
      <ul>
        <li>it's like "3" but in roman if I want to go with the "3" naming</li>
        <li>3 is my favorite number</li>
      </ul>
      </td>
      <td>
        <ul>
          <li>Sounds weird if you speak it out loud</li>
          <li>It sounds like the German equivalent of "eww"</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>flavor / flv / flr / fvr</td>
      <td>
      </td>
      <td></td>
    </tr>
    <tr>
      <td>claas</td>
      <td>
       <ul>
          <li>
          I'm a narcissist and my name is awesome (shoutout to my parents! you are awesome!)
          </li>
          <li>
          and it's basically my for use in my projects
          </li>
        </ul>
      </td>
      <td>
       <ul>
          <li>
          No one likes my name plastered all over their project when I am collaborating
          </li>
          <li>
          People think I'm a narcissist
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td colspan="3">"Do I want people to take me seriously"-ideas</td>
    </tr>
    <tr>
      <td>flu</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>sh-t</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>f-ck</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

