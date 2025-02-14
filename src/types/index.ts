export interface FieldOption {
    label: string;
    value: string;
}

export type FieldType = "numeric" | "string" | "multi-line" | "boolean" | "date" | "enum";

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