import React, { useState } from "react";
import { HeaderProps } from "../../../interfaces/Headers";
import { HeadersData } from "../../../headers";

const Headers = ({ apiData, updateApiData, next, updateLocalApiData }: any) => {
  const [newHeader, setNewHeader] = useState<HeaderProps>({
    name: "",
    samples: [],
  });
  const [selectedSample, setSelectedSample] = useState<string>("");

  const handleHeaderChange = (
    index: number,
    key: keyof HeaderProps,
    value: any
  ) => {
    const updatedHeaders = [...apiData.headers];
    updatedHeaders[index] = { ...updatedHeaders[index], [key]: value };
    updateApiData("headers", updatedHeaders);
    updateLocalApiData("headers", updatedHeaders);
  };

  const handleAddHeader = () => {
    if (newHeader.name && selectedSample) {
      const updatedHeader = { ...newHeader, samples: [selectedSample] };
      updateApiData("headers", [...apiData.headers, updatedHeader]);
      updateLocalApiData("headers", [...apiData.headers, updatedHeader]);
      setNewHeader({
        name: "",
        samples: [],
      });
      setSelectedSample("");
    }
  };

  const handleRemoveHeader = (index: number) => {
    const updatedHeaders = apiData.headers.filter(
      (_: HeaderProps, i: number) => i !== index
    );
    updateApiData("headers", updatedHeaders);
    updateLocalApiData("headers", updatedHeaders);
  };

  const availableHeaders = HeadersData.filter(
    (header) =>
      !apiData.headers.some(
        (addedHeader: HeaderProps) => addedHeader.name === header.name
      )
  );

  return (
    <div className="headers-container">
      <h2 style={{ marginBottom: "2rem" }}>Headers</h2>
      {apiData.headers.map((header: HeaderProps, index: number) => (
        <div
          key={index}
          className="input-flex"
          style={{ marginBottom: "6rem" }}
        >
          <div className="inputs">
            <label>Name:</label>
            <input
              type="text"
              value={header.name}
              onChange={(e) =>
                handleHeaderChange(index, "name", e.target.value)
              }
              disabled
            />
          </div>
          <div className="inputs">
            <label>Category:</label>
            <select
              value={header.samples[0]}
              onChange={(e) =>
                handleHeaderChange(index, "samples", e.target.value.split(", "))
              }
              disabled
            >
              <option value="">Select Sample</option>
              {header.samples.map((sample, i) => (
                <option key={i} value={sample}>
                  {sample}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => handleRemoveHeader(index)}
            className="header-btn"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="input-flex">
        <div className="inputs">
          <label htmlFor="headerName">Header Name</label>
          <select
            value={newHeader.name}
            onChange={(e) => {
              const selectedHeader = availableHeaders.find(
                (h) => h.name === e.target.value
              );
              setNewHeader({
                name: selectedHeader?.name || "",
                samples: selectedHeader?.samples || [],
              });
              setSelectedSample("");
            }}
            style={{ marginRight: "10px" }}
          >
            <option value="">Select Header Name</option>
            {availableHeaders.map((header) => (
              <option key={header.name} value={header.name}>
                {header.name}
              </option>
            ))}
          </select>
        </div>

        <div className="inputs">
          <label>Header Value</label>
          <select
            value={selectedSample}
            onChange={(e) => setSelectedSample(e.target.value)}
          >
            <option value="">Select Sample</option>
            {newHeader.samples.map((sample, index) => (
              <option key={index} value={sample}>
                {sample}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={handleAddHeader} className="header-btn">
        Add Header
      </button>

      <button
        onClick={next}
        className="header-btn"
        style={{ marginTop: "4rem" }}
      >
        Next
      </button>
    </div>
  );
};

export default Headers;
