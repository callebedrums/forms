import { InjectionToken } from "@angular/core";
import { Form } from "../types/form";

export abstract class FormsService {
  
  abstract list(): Promise<Array<Form>>;

  abstract get(id: string): Promise<Form | undefined>;
  
  abstract save(form: Form): Promise<Form>;
  
  abstract deleteForm(form: Form): Promise<void>;
}

export const FormsServiceToken = new InjectionToken<FormsService>('Forms Service');
