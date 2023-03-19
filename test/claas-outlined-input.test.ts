import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { DimOutlinedInput } from '../src/DimOutlinedInput.js';
import '../src/dim-outlined-input.js';

describe('ClaasOutlinedInput', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture<DimOutlinedInput>(
      html`<claas-outlined-input></claas-outlined-input>`
    );

    expect(el.value).to.equal('Hey there');
    expect(el.helperText).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<DimOutlinedInput>(
      html`<claas-outlined-input></claas-outlined-input>`
    );
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.helperText).to.equal(6);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture<DimOutlinedInput>(
      html`<claas-outlined-input
        header="attribute header"
      ></claas-outlined-input>`
    );

    expect(el.value).to.equal('attribute header');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<DimOutlinedInput>(
      html`<claas-outlined-input></claas-outlined-input>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
