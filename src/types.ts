// src/types.ts

export interface FieldOption {
  label: string;
  value: string;
}

export type FieldType =
  | "numeric"
  | "string"
  | "multi-line"
  | "boolean"
  | "date"
  | "enum";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  value?: any;
  options?: FieldOption[];
}

export interface FormConfig {
  title: string;
  fields: FieldConfig[];
  buttons: { text: string; action: string }[];
}

export const defaultConfig: string = `{
  "title": "My Form",
  "fields": [
    {
      "name": "age",
      "label": "Age",
      "type": "numeric",
      "value": 30
    },
    {
      "name": "firstName",
      "label": "First Name",
      "type": "string",
      "value": "John"
    },
    {
      "name": "bio",
      "label": "Biography",
      "type": "multi-line",
      "value": "Enter your biography here..."
    },
    {
      "name": "subscribe",
      "label": "Subscribe",
      "type": "boolean",
      "value": true
    },
    {
      "name": "birthdate",
      "label": "Birthdate",
      "type": "date",
      "value": "2000-01-01"
    },
    {
      "name": "gender",
      "label": "Gender",
      "type": "enum",
      "options": [
        { "label": "Male", "value": "male" },
        { "label": "Female", "value": "female" }
      ],
      "value": "male"
    }
  ],
  "buttons": [
    { "text": "OK", "action": "ok" },
    { "text": "Cancel", "action": "cancel" },
    { "text": "Apply", "action": "apply" }
  ]
}`;
