export interface FieldValidation {
  required?: boolean;
}

export interface Field {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  default?: string;
  validation?: FieldValidation;
}