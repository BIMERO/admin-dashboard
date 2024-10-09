import React, { useState } from "react";
import { HeaderProps } from "../../../interfaces/Headers";
import { HeadersData } from "../../../headers";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";

const Headers = ({ apiData, updateApiData, next }: any) => {
  const [newHeader, setNewHeader] = useState<HeaderProps>({
    name: "",
    samples: [], // Use an array to display the available options
  });
  const [selectedSample, setSelectedSample] = useState<string>(""); // For storing the selected value
  const [error, setError] = useState("");

  const handleHeaderChange = (
    index: number,
    key: keyof HeaderProps,
    value: any
  ) => {
    const updatedHeaders = [...apiData.headers];
    updatedHeaders[index] = { ...updatedHeaders[index], [key]: value };
    updateApiData("headers", updatedHeaders);
  };

  const handleAddHeader = () => {
    if (newHeader.name && selectedSample) {
      const updatedHeader = { ...newHeader, samples: selectedSample }; // Store selectedSample as a string
      updateApiData("headers", [...apiData.headers, updatedHeader]);
      setNewHeader({
        name: "",
        samples: [], // Reset samples to an empty array
      });
      setSelectedSample("");
    }
  };

  const handleRemoveHeader = (index: number) => {
    const updatedHeaders = apiData.headers.filter(
      (_: HeaderProps, i: number) => i !== index
    );
    updateApiData("headers", updatedHeaders);
  };

  const availableHeaders = HeadersData.filter(
    (header) =>
      !apiData.headers.some(
        (addedHeader: HeaderProps) => addedHeader.name === header.name
      )
  );

  const handleNextClick = () => {
    if (apiData.headers.length > 0) {
      next();
    } else {
      setError("Please add at least one header");
    }
  };

  return (
    <div className="headers-container">
      <h2 style={{ marginBottom: "2rem" }}>Headers</h2>
      {apiData.headers.map((header: HeaderProps, index: number) => (
        <div
          key={index}
          className="add-header"
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
              value={header.samples} // No longer an array
              onChange={(e) =>
                handleHeaderChange(index, "samples", e.target.value)
              }
              disabled
            >
              <option value="">Select Sample</option>
              <option value={header.samples}>{header.samples}</option>
            </select>
          </div>
          <FaRegTrashCan
            onClick={() => handleRemoveHeader(index)}
            className="header_remove_icon"
          />
        </div>
      ))}

      <div className="add-header">
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
                samples: selectedHeader?.samples || [], // Reset samples to available options
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
            onChange={(e) => setSelectedSample(e.target.value)} // Store selected value
          >
            <option value="">Select Sample</option>
            {newHeader.samples.map((sample: string, index: number) => (
              <option key={index} value={sample}>
                {sample}
              </option>
            ))}
          </select>
        </div>
        <FaPlus onClick={handleAddHeader} className="header_add_icon" />
      </div>

      <p style={{ textAlign: "center", color: "red" }}>{error}</p>

      <button
        onClick={handleNextClick}
        className="header-btn"
        style={{ marginTop: "4rem" }}
      >
        Next
      </button>
    </div>
  );
};

export default Headers;
