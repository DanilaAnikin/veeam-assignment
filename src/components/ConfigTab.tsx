// src/components/ConfigTab.tsx

import React, { useState } from "react";
import { FormConfig } from "../types";

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
      />
      <br />
      <button onClick={handleParse}>Apply Configuration</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ConfigTab;
