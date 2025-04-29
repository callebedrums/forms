import type { Form, FormAnswer } from '@/types/form';

export abstract class FormServiceInterface {
  abstract list(): Promise<Array<Form>>;
  abstract get(id: string): Promise<Form | undefined>;
  abstract save(form: Form): Promise<Form>;
  abstract deleteForm(form: Form): Promise<void>;
  abstract getAnswers(formId: string): Promise<Array<FormAnswer>>;
  abstract saveAnswer(answer: FormAnswer): Promise<FormAnswer>;
}