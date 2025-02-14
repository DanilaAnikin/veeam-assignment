// src/App.tsx

import React, { useState } from "react";
import ConfigTab from "./components/ConfigTab.tsx";
import ResultTab from "./components/ResultTab.tsx";
import { FormConfig, defaultConfig } from "./types.ts";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"config" | "result">("config");
  const [configText, setConfigText] = useState<string>(defaultConfig);
  const [parsedConfig, setParsedConfig] = useState<FormConfig | null>(null);

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
      {activeTab === "config" ? (
        <ConfigTab
          configText={configText}
          setConfigText={setConfigText}
          setParsedConfig={setParsedConfig}
        />
      ) : (
        <ResultTab config={parsedConfig} onFieldChange={handleFieldChange} />
      )}
    </div>
  );
};

export default App;
