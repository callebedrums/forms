import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import style from "./forms.style.scss";

@customElement('my-forms')
export class Forms extends LitElement {
  static styles = [style];

  protected render() {
    return html`<div><h1>Forms</h1></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-forms": Forms
  }
}