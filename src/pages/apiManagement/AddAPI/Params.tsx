import React, { useState } from "react";

const Params = ({ apiData, updateApiData, onSave }: any) => {
  const [newParamKey, setNewParamKey] = useState("");
  const [newParamValue, setNewParamValue] = useState("");

  const handleAddParam = () => {
    if (newParamKey && newParamValue) {
      const updatedParams = {
        ...apiData.parameters,
        [newParamKey]: newParamValue,
      };
      updateApiData("parameters", updatedParams);
      setNewParamKey("");
      setNewParamValue("");
    }
  };

  const handleRemoveParam = (keyToRemove: any) => {
    const updatedParams = { ...apiData.parameters };
    delete updatedParams[keyToRemove];
    updateApiData("parameters", updatedParams);
  };

  return (
    <div className="params">
      <h2>Params</h2>
      <div className="input-flex">
        <div className="inputs">
          <label htmlFor="">Query Key</label>
          <input
            type="text"
            placeholder="Key"
            value={newParamKey}
            onChange={(e) => setNewParamKey(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label htmlFor="">Query Key</label>
          <input
            type="text"
            placeholder="Value"
            value={newParamValue}
            onChange={(e) => setNewParamValue(e.target.value)}
          />
        </div>
      </div>
      <button className="header-btn" onClick={handleAddParam}>
        Add Param
      </button>
      <div className="current-params">
        <h3>Current Params:</h3>
        <ul>
          {Object.keys(apiData.parameters || {}).map((key) => (
            <li key={key}>
              <span>
                {key}: {apiData.parameters[key]}
              </span>
              <button
                className="header-btn"
                onClick={() => handleRemoveParam(key)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onSave}
        className="header-btn"
        style={{ marginTop: "4rem" }}
      >
        Save API
      </button>
    </div>
  );
};

export default Params;
