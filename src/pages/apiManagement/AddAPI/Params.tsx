import React, { useState } from "react";

const Params = ({ apiData, updateApiData, onSave }: any) => {
  const [newParamKey, setNewParamKey] = useState("");
  const [newParamValue, setNewParamValue] = useState("");

  // const handleAddParam = () => {
  //   if (newParamKey && newParamValue) {
  //     const updatedParams = {
  //       ...apiData.parameters,
  //        { key: newParamKey, value: newParamValue },
  //     };
  //     updateApiData("parameters", updatedParams);
  //     setNewParamKey("");
  //     setNewParamValue("");
  //   }
  // };

  const handleAddParam = () => {
    if (newParamKey && newParamValue) {
      const updatedParams = [
        ...apiData.parameters,
        { key: newParamKey, value: newParamValue },
      ];
      updateApiData("parameters", updatedParams);
      setNewParamKey("");
      setNewParamValue("");
    }
  };

  const handleRemoveParam = (indexToRemove: number) => {
    const updatedParams = apiData.parameters.filter(
      (_: any, index: number) => index !== indexToRemove
    );
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
          {apiData.parameters &&
            apiData.parameters.map((param: any, index: number) => (
              <li key={index}>
                <span>
                  {param.key}: {param.value}
                </span>
                <button
                  className="header-btn"
                  onClick={() => handleRemoveParam(index)}
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
