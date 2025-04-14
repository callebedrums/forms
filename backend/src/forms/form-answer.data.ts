import { FormAnswer } from "../types/form.js";

export interface FormAnswerData {
  add(answer: FormAnswer): Promise<FormAnswer>;
  
  update(answer: FormAnswer): Promise<FormAnswer>;

  list(formId: string): Promise<Array<FormAnswer>>;
}