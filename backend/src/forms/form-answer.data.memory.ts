import { v4 as uuidv4 } from 'uuid';
import { FormAnswer } from "../types/form.js";
import { FormAnswerData } from './form-answer.data.js';

export class FormAnswerDataMemory implements FormAnswerData {
  private answers: Array<FormAnswer> = [
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
  
  async add(answer: FormAnswer): Promise<FormAnswer> {
    answer = JSON.parse(JSON.stringify(answer));
    answer.id = uuidv4();
    this.answers.push(answer);
    return answer;
  }
  
  async update(answer: FormAnswer): Promise<FormAnswer> {
    const index = this.answers.findIndex(a => a.id === answer.id);
    if (index < 0) throw Error('FormAnswer not found');

    this.answers[index] = answer;
    return answer;
  }

  async list(formId: string): Promise<Array<FormAnswer>> {
    return this.answers.filter(answer => answer.formId === formId);
  }
}