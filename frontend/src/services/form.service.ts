import type { Form, FormAnswer } from '@/types/form';
import { FieldType } from '@/types/form';

let forms: Array<Form> = [
  {
    id: '1',
    name: 'Form 1',
    description: 'Form 1 description',
    fields: [
      {
        type: FieldType.text,
        name: 'field_1',
        label: 'Field 1',
        required: true
      },
      {
        type: FieldType.textarea,
        name: 'field_2',
        label: 'Field 2',
        required: false
      }
    ]
  },
  {
    id: '2',
    name: 'Form 2',
    fields: []
  },
];

let answers: Array<FormAnswer> = [
  {
    id: 'a1',
    formId: '1',
    answers: [
      {
        name: 'field_1',
        value: 'Field 1 answer 1'
      },
      {
        name: 'field_2',
        value: 'Field 2 answer 1'
      }
    ]
  },
  {
    id: 'a2',
    formId: '1',
    answers: [
      {
        name: 'field_1',
        value: 'Field 1 answer 2'
      },
      {
        name: 'field_2',
        value: 'Field 2 answer 2'
      }
    ]
  }
];

let nextId = forms.length+1;
let nextAnswerId = answers.length+1;

export class FormService {
  /* *****
   * Public access
   *******/

  private api = `/api/forms`;

  async list(): Promise<Array<Form>> {
    return await fetch(this.api).then(response => response.json());
    // return forms;
  }

  async get(id: string): Promise<Form | undefined> {
    return await fetch(`${this.api}/${id}`).then(response => response.json());
    // return forms.find((form) => form.id === id);
  }

  async save(form: Form): Promise<Form> {    
    if (!form.id) return await this.post(form);
    return await this.update(form);
  }

  async deleteForm(form: Form): Promise<void> {
    if (!form.id) return;

    await fetch(`${this.api}/${form.id}`, { method: 'DELETE' });

    // forms = forms.filter(f => f.id !== form.id);
  }

  async getAnswers(formId: string): Promise<Array<FormAnswer>> {
    return await fetch(`${this.api}/${formId}/answers`).then(response => response.json());
    // return answers.filter(a => a.formId === formId);
  }

  async saveAnswer(answer: FormAnswer): Promise<FormAnswer> {
    if (!answer.id) return await this.postAnswer(answer);
    return await this.updateAnswer(answer);
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

    return await fetch(`${this.api}`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(form)
    }).then(response => response.json());

    // form.id = `${nextId++}`;
    // forms.push(form);
    // return form;
  }

  private async update(form: Form): Promise<Form> {
    return await fetch(`${this.api}/${form.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(form)
    }).then(response => response.json());

    // const index = forms.findIndex((f) => f.id === form.id);
    // forms[index] = form;
    // return form;
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

    // answer.id = `a${nextAnswerId++}`;
    // answers.push(answer);
    // return answer;
  }

  private async updateAnswer(answer: FormAnswer): Promise<FormAnswer> {
    return await fetch(`${this.api}/${answer.formId}/answers/${answer.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(answer)
    }).then(response => response.json());

    // const index = answers.findIndex((a) => a.id === answer.id);
    // answers[index] = answer;
    // return answer;
  }

  private static _instance: FormService | undefined = undefined;

  private constructor() {}
}
