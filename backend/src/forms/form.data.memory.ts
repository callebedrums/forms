import { v4 as uuidv4 } from 'uuid';
import { FieldType, Form } from "../types/form.js";
import { FormData } from './form.data.js';


export class FormDataMemory implements FormData {
  private forms: Array<Form> = [
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

  async add(form: Form): Promise<Form> {
    form = JSON.parse(JSON.stringify(form));
    form.id = uuidv4();
    
    this.forms.push(form);
    return form;
  }

  async update(form: Form): Promise<Form> {
    const index = this.forms.findIndex(f => f.id === form.id);

    if (index < 0) throw Error('Form not found');

    this.forms[index] = form;

    return form;
  }

  async get(id: string): Promise<Form | undefined> {
    return this.forms.find(f => f.id === id);
  }

  async remove(form: Form): Promise<void> {
    this.forms = this.forms.filter(f => f.id !== form.id);
  }

  async list(): Promise<Array<Form>> {
    return this.forms;
  }
}