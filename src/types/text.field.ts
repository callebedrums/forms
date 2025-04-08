import { Field, FieldValidation } from "./field";

export interface TextFieldValidation extends FieldValidation {
  length?: {
    min?: number;
    max?: number;
  };
  format?: RegExp;
}

export interface TextField extends Field {
  type: 'text',
  validation?: TextFieldValidation
}