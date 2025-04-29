import type { Form, FormAnswer } from '@/types/form';
import { configuration } from '../configuration';
import { FormServiceInterface } from './form.service.interface';

export class FormServiceAPI extends FormServiceInterface {
  /* *****
   * Public access
   *******/

  // private api = `http://localhost:3000/forms`;
  private get api(): string {
    return configuration.get('FormsApi');
  };


  async list(): Promise<Array<Form>> {
    return await fetch(this.api).then(response => response.json());
  }

  async get(id: string): Promise<Form | undefined> {
    return await fetch(`${this.api}/${id}`).then(response => response.json());
  }

  async save(form: Form): Promise<Form> {    
    if (!form.id) return await this.post(form);
    return await this.update(form);
  }

  async deleteForm(form: Form): Promise<void> {
    if (!form.id) return;

    await fetch(`${this.api}/${form.id}`, { method: 'DELETE' });
  }

  async getAnswers(formId: string): Promise<Array<FormAnswer>> {
    return await fetch(`${this.api}/${formId}/answers`).then(response => response.json());
  }

  async saveAnswer(answer: FormAnswer): Promise<FormAnswer> {
    if (!answer.id) return await this.postAnswer(answer);
    return await this.updateAnswer(answer);
  }

  /* *****
   * Static Public access
   *******/

  static get instance(): FormServiceAPI {
    return this.getInstance();
  }

  static getInstance() {
    if (!this._instance) this._instance = new FormServiceAPI();
    return this._instance;
  }

  /* *****
   * Private access
   *******/

  private async post(form: Form): Promise<Form> {
    form = { ...form };
    delete form.id;

    return await fetch(`${this.api}`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(form)
    }).then(response => response.json());
  }

  private async update(form: Form): Promise<Form> {
    return await fetch(`${this.api}/${form.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(form)
    }).then(response => response.json());
  }

  private async postAnswer(answer: FormAnswer): Promise<FormAnswer> {
    answer = { ...answer};
    delete answer.id;

    return await fetch(`${this.api}/${answer.formId}/answers`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(answer)
    }).then(response => response.json());
  }

  private async updateAnswer(answer: FormAnswer): Promise<FormAnswer> {
    return await fetch(`${this.api}/${answer.formId}/answers/${answer.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(answer)
    }).then(response => response.json());
  }

  private static _instance: FormServiceAPI | undefined = undefined;

  private constructor() {
    super();
    console.log('constructing Form Service API');
  }
}
