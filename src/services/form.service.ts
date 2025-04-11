import type { Form } from '../types/form';

let forms: Array<Form> = [
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

  async list(): Promise<Array<Form>> {
    return forms;
  }

  async get(id: string): Promise<Form | undefined> {
    return forms.find((form) => form.id === id);
  }

  async save(form: Form): Promise<Form> {
    if (!form.id) return await this.post(form);
    return await this.update(form);
  }

  async deleteForm(form: Form): Promise<void> {
    if (!form.id) return;

    forms = forms.filter(f => f.id !== form.id);
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

  private async post(form: Form): Promise<Form> {
    form = { ...form };
    delete form.id;

    form.id = `${nextId++}`;
    forms.push(form);
    return form;
  }

  private async update(form: Form): Promise<Form> {
    const index = forms.findIndex((f) => f.id === form.id);
    forms[index] = form;
    return form;
  }

  private static _instance: FormService | undefined = undefined;

  private constructor() {}
}
