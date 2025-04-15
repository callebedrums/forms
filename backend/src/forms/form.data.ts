import { Form } from "../types/form.js";

export interface FormData {
  add(form: Form): Promise<Form>;

  update(form: Form): Promise<Form>;

  get(id: string): Promise<Form | undefined>;

  remove(id: string): Promise<void>;

  list(): Promise<Array<Form>>;
}