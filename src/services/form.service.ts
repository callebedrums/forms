import type { Form } from '../types/form';

const forms: Array<Form> = [
  {
    id: '1',
    name: 'Form 1',
  },
  {
    id: '2',
    name: 'Form 2',
  },
];

let nextId = 3;

export class FormService {
  /* *****
   * Public access
   *******/

  async getForms(): Promise<Array<Form>> {
    return forms;
  }

  async getForm(id: string): Promise<Form | undefined> {
    return forms.find((form) => form.id === id);
  }

  saveForm(form: Form): Promise<Form> {
    if (!form.id) return this.postForm(form);
    return this.updateForm(form);
  }

  /* *****
   * Static Public access
   *******/

  static get instance(): FormService {
    return this.getInstance();
  }

  static getInstance() {
    if (!this._instance) this._instance = new FormService();
    return this._instance;
  }

  /* *****
   * Private access
   *******/

  private async postForm(form: Form): Promise<Form> {
    form = { ...form };
    delete form.id;

    form.id = `${nextId++}`;
    forms.push(form);
    return form;
  }

  private async updateForm(form: Form): Promise<Form> {
    const index = forms.findIndex((f) => f.id === form.id);
    forms[index] = form;
    return form;
  }

  private static _instance: FormService | undefined = undefined;

  private constructor() {}
}
