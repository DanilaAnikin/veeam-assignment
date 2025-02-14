// src/components/ResultTab.tsx

import React from "react";
import { FormConfig, FieldConfig } from "../types";

interface ResultTabProps {
  config: FormConfig | null;
  onFieldChange: (fieldName: string, newValue: any) => void;
}

const ResultTab: React.FC<ResultTabProps> = ({ config, onFieldChange }) => {
  if (!config) {
    return <div>Please enter a valid configuration in the Config tab.</div>;
  }

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case "numeric":
        return (
          <input
            type="number"
            value={field.value}
            onChange={(e) =>
              onFieldChange(field.name, e.target.valueAsNumber)
            }
          />
        );
      case "string":
        return (
          <input
            type="text"
            value={field.value}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
          />
        );
      case "multi-line":
        return (
          <textarea
            value={field.value}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
          />
        );
      case "boolean":
        return (
          <input
            type="checkbox"
            checked={field.value}
            onChange={(e) =>
              onFieldChange(field.name, e.target.checked)
            }
          />
        );
      case "date":
        return (
          <input
            type="date"
            value={field.value}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
          />
        );
      case "enum":
        return (
          <div>
            {field.options?.map((option) => (
              <label key={option.value} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={option.value === field.value}
                  onChange={() => onFieldChange(field.name, option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>{config.title}</h2>
      <form>
        {config.fields.map((field) => (
          <div key={field.name} style={{ marginBottom: "10px" }}>
            <label style={{ marginRight: "10px" }}>{field.label}: </label>
            {renderField(field)}
          </div>
        ))}
        <div style={{ marginTop: "20px" }}>
          {config.buttons.map((button, index) => (
            <button key={index} type="button" style={{ marginRight: "10px" }}>
              {button.text}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default ResultTab;
