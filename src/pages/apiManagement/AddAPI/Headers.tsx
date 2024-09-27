import React, { useState } from "react";
import { HeaderProps } from "../../../../interfaces/Headers";
import { HeadersData } from "../../../headers";

const Headers = ({ apiData, updateApiData, next }: any) => {
  const [newHeader, setNewHeader] = useState<HeaderProps>({
    name: "",
    description: "",
    example: "",
    category: "",
    samples: [],
  });

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
    if (newHeader.name && newHeader.category) {
      updateApiData("headers", [...apiData.headers, newHeader]);
      setNewHeader({
        name: "",
        description: "",
        example: "",
        category: "",
        samples: [],
      });
    }
  };

  const handleRemoveHeader = (index: number) => {
    const updatedHeaders = apiData.headers.filter(
      (_: HeaderProps, i: number) => i !== index
    );
    updateApiData("headers", updatedHeaders);
  };

  return (
    <div className="headers-container">
      <h2 style={{ marginBottom: "2rem" }}>Headers</h2>
      {apiData.headers.map((header: HeaderProps, index: number) => (
        <div key={index} className="inputs" style={{ marginBottom: "1.5rem" }}>
          <label>Name:</label>
          <input
            type="text"
            value={header.name}
            onChange={(e) => handleHeaderChange(index, "name", e.target.value)}
            style={{ marginBottom: "1.25rem" }}
          />
          <label>Category:</label>
          <input
            type="text"
            value={header.category}
            onChange={(e) =>
              handleHeaderChange(index, "category", e.target.value)
            }
            style={{ marginBottom: "1.25rem" }}
          />
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
              const selectedHeader = HeadersData.find(
                (h) => h.name === e.target.value
              );
              setNewHeader({
                name: selectedHeader?.name || "",
                description: selectedHeader?.description || "",
                example: selectedHeader?.example || "",
                category: selectedHeader?.category || "",
                samples: selectedHeader?.samples || [],
              });
            }}
            style={{ marginRight: "10px" }}
          >
            <option value="">Select Header Name</option>
            {HeadersData.map((header) => (
              <option key={header.name} value={header.name}>
                {header.name}
              </option>
            ))}
          </select>
        </div>

        <div className="inputs">
          <label>Header Value</label>
          <select
            value={newHeader.samples.join(", ")}
            onChange={(e) =>
              setNewHeader({
                ...newHeader,
                samples: e.target.value.split(", "),
              })
            }
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
