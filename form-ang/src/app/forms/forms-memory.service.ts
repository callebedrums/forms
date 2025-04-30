import { Injectable } from '@angular/core';
import { FieldType, Form, FormAnswer } from '../types/form';
import { FormsService } from './forms-service.class';

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

@Injectable({
  providedIn: 'root'
})
export class FormsMemoryService extends FormsService {

  constructor() { super(); }
 
  async list(): Promise<Array<Form>> {
    return forms;
  }

  async deleteForm(form: Form): Promise<void> {
    if (!form.id) return;
    forms = forms.filter(f => f.id !== form.id);
  }

  async get(id: string): Promise<Form | undefined> {
    return forms.find((form) => form.id === id);
  }

  async save(form: Form): Promise<Form> {    
    if (!form.id) return await this.post(form);
    return await this.update(form);
  }

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
}
