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
  fields?: Array<Field>;
}
