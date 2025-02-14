import React, { useState } from "react";
import { FieldConfig, FieldType, FieldOption, FormConfig } from "./types";
import { defaultConfig } from "./defaultConfig.tsx";

// --- Config Tab Component ---
interface ConfigTabProps {
  configText: string;
  setConfigText: (text: string) => void;
  setParsedConfig: (config: FormConfig | null) => void;
}

const ConfigTab: React.FC<ConfigTabProps> = ({
  configText,
  setConfigText,
  setParsedConfig,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConfigText(e.target.value);
  };

  const handleParse = () => {
    try {
      const parsed = JSON.parse(configText) as FormConfig;
      setParsedConfig(parsed);
      setError(null);
    } catch (err) {
      setError("Invalid JSON configuration.");
      setParsedConfig(null);
    }
  };

  return (
    <div>
      <h2>Config</h2>
      <textarea
        style={{ width: "100%", height: "300px" }}
        value={configText}
        onChange={handleChange}
      ></textarea>
      <br />
      <button onClick={handleParse}>Apply Configuration</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

// --- Result Tab Component ---
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
            onChange={(e) =>
              onFieldChange(field.name, e.target.value)
            }
          />
        );
      case "multi-line":
        return (
          <textarea
            value={field.value}
            onChange={(e) =>
              onFieldChange(field.name, e.target.value)
            }
          ></textarea>
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
            onChange={(e) =>
              onFieldChange(field.name, e.target.value)
            }
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

// --- Main App Component ---
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"config" | "result">("config");
  const [configText, setConfigText] = useState<string>(defaultConfig);
  const [parsedConfig, setParsedConfig] = useState<FormConfig | null>(null);

  // Update both parsedConfig and configText when a field changes in the form.
  const handleFieldChange = (name: string, newValue: any) => {
    if (!parsedConfig) return;
    const updatedFields = parsedConfig.fields.map((field) =>
      field.name === name ? { ...field, value: newValue } : field
    );
    const updatedConfig = { ...parsedConfig, fields: updatedFields };
    setParsedConfig(updatedConfig);
    setConfigText(JSON.stringify(updatedConfig, null, 2));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("config")}>Config</button>
        <button
          onClick={() => setActiveTab("result")}
          style={{ marginLeft: "10px" }}
        >
          Result
        </button>
      </div>
      {activeTab === "config" && (
        <ConfigTab
          configText={configText}
          setConfigText={setConfigText}
          setParsedConfig={setParsedConfig}
        />
      )}
      {activeTab === "result" && (
        <ResultTab config={parsedConfig} onFieldChange={handleFieldChange} />
      )}
    </div>
  );
};

export default App;
