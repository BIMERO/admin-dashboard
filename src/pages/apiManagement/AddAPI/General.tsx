import React from "react";
import CustomSelect from "../../../components/customSelect/CustomSelect";

const General = ({ apiData, updateApiData, method, onMethodChange }: any) => {
  const handleEndpointChange = (e: any) => {
    updateApiData("endpoint", e.target.value);
  };

  const methodOptions = [
    { label: "GET", value: "GET" },
    { label: "POST", value: "POST" },
    { label: "PUT", value: "PUT" },
    { label: "DELETE", value: "DELETE" },
    { label: "PATCH", value: "PATCH" },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "2rem" }}>General</h2>
      <div className="inputs">
        <label>
          Base URL:
          {/* <select value={apiData.baseUrlId || ""} onChange={handleBaseUrlChange}>
          <option value="" disabled>
            Select a base URL
          </option>
          {baseUrls.map((url) => (
            <option key={url.id} value={url.id}>
              {url.url}
            </option>
          ))}
        </select> */}
        </label>
      </div>
      <div className="inputs">
        <label>Endpoint:</label>
        <input
          type="text"
          value={apiData.endpoint}
          onChange={handleEndpointChange}
          placeholder="/endpoint"
        />
      </div>

      <CustomSelect
        options={methodOptions}
        placeholder="Select Method"
        value={method}
        onSelect={onMethodChange}
      />

      <div className="inputs" style={{ marginTop: "1.25rem" }}>
        <label>Description:</label>
        <textarea
          value={apiData.description}
          rows={5}
          cols={5}
          onChange={(e) => updateApiData("description", e.target.value)}
        />
      </div>
    </div>
  );
};

export default General;
