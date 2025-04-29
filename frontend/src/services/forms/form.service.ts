import { configuration } from '../configuration';
import type { FormServiceInterface } from './form.service.interface';
import { FormServiceAPI } from './form.service.api';
import { FormServiceMemory } from './form.service.memory';

export class FormService {
  static get instance(): FormServiceInterface {
    return this.getInstance();
  }

  static getInstance() {
    if (!this._instance) {
      if (configuration.get('FormsServiceType') === 'api') {
        this._instance = FormServiceAPI.getInstance();
      } else {
        this._instance = FormServiceMemory.getInstance();
      }
    }
    return this._instance;
  }

  private static _instance: FormServiceInterface | undefined = undefined;

  private constructor() {
    console.log('constructing Service');
  }
}
