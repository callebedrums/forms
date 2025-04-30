import { InjectionToken } from "@angular/core";

export enum FormsServiceType {
  memory = 'memory',
  api = 'api'
}

export const FORMS_SERVICE_TYPE = new InjectionToken<FormsServiceType>('Forms Service Type');
export const FORMS_API = new InjectionToken<string>('Forms API url');