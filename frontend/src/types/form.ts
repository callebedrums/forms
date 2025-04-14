export enum FieldType {
  text = 'text',
  textarea = 'textarea'
}

export type Field = TextField | TextareaField;

export interface BaseField {
  name: string;
  label: string;
  required?: boolean;
}

interface TextBaseField extends BaseField {
  placeholder?: string;
}

export interface TextField extends TextBaseField {
  type: FieldType.text;
}

export interface TextareaField extends TextBaseField {
  type: FieldType.textarea
}

export interface Form {
  id?: string;
  name: string;
  description?: string;
  fields: Array<Field>;
}

export interface Answer {
  name: string;
}

export interface TextAnswer extends Answer {
  value: string;
}

export interface BooleanAnswer extends Answer {
  value: boolean;
}

export interface MultipleAnswer extends Answer {
  value: Array<string>;
}

export type FieldAnswer = TextAnswer | BooleanAnswer | MultipleAnswer;

export interface FormAnswer {
  id?: string;
  formId: string;
  answers: Array<FieldAnswer>;
}