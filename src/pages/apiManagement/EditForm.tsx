import React, { useState } from "react";
import "./apimanagement.css";
import { Endpoints, EndpointParameter } from "../../interfaces/Endpoint";

interface EditFormProps {
  row: Endpoints;
  onSave: (updatedRow: Endpoints) => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ row, onSave, onClose }) => {
  const [formData, setFormData] = useState<Endpoints>(row);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleHeadersChange = (index: number, key: string, value: string) => {
    const updatedHeaders = [...formData.headers];
    updatedHeaders[index] = { ...updatedHeaders[index], [key]: value };
    setFormData((prev) => ({
      ...prev,
      headers: updatedHeaders,
    }));
  };

  const handleAddHeader = () => {
    setFormData((prev) => ({
      ...prev,
      headers: [...prev.headers, { name: "", samples: [] }],
    }));
  };

  const handleRemoveHeader = (index: number) => {
    const updatedHeaders = formData.headers.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      headers: updatedHeaders,
    }));
  };

  const handleParamsChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      queries: {
        ...(prev.queries as { [key: string]: string }), // Assert the type
        [key]: value, // Update the key-value pair in the object
      },
    }));
  };

  const handleAddParam = () => {
    setFormData((prev) => ({
      ...prev,
      queries: {
        ...(prev.queries || {}),
        newParam: "", // Add a new query param with an empty value
      },
    }));
  };

  const handleRemoveParam = (key: string) => {
    // Ensure queries is treated as an object
    if (
      typeof formData.queries === "object" &&
      !Array.isArray(formData.queries)
    ) {
      const { [key]: _, ...updatedQueries } = formData.queries;
      setFormData((prev) => ({
        ...prev,
        queries: updatedQueries as { [key: string]: string }, // Cast to correct type
      }));
    } else {
      // If queries are an array, handle that case here
      // Assuming a different approach might be needed for array type
      console.error("Cannot remove param from array-based queries.");
    }
  };

  const handlePayloadChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      payload: { ...prev.payload, [key]: value },
    }));
  };

  const handleAddPayloadField = () => {
    setFormData((prev) => ({
      ...prev,
      payload: {
        ...(prev.payload || {}),
        [`field${Object.keys(prev.payload || {}).length + 1}`]: "",
      },
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleCancel = () => {
    formData.endpoint = "";
    formData.method = "";
    formData.queries = {};
    formData.payload = {};
    onClose();
  };

  return (
    <section className="edit-user">
      <div className="edit-user-modal">
        <div className="edit-form">
          <h2 style={{ marginBottom: "2rem" }}>Edit API</h2>
          <form onSubmit={handleSave}>
            <div className="inputs">
              <label>Base Url</label>
              <input
                type="text"
                name="baseUrl"
                value={formData.baseUrl}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="inputs">
              <label>Endpoint</label>
              <input
                type="text"
                name="endpoint"
                value={formData.endpoint}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="inputs">
              <label>Method</label>
              <select
                name="method"
                value={formData.method}
                className="select"
                onChange={handleChange}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>

            <div className="inputs">
              <label>Description</label>
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>

            {/* Headers Section */}
            <div className="inputs">
              <label>Headers</label>
              {formData.headers.map((header, index) => (
                <div key={index} className="header-pair">
                  <input
                    type="text"
                    placeholder="Header Name"
                    value={header.name}
                    onChange={(e) =>
                      handleHeadersChange(index, "name", e.target.value)
                    }
                    style={{ marginBottom: "1rem" }}
                  />
                  <button onClick={() => handleRemoveHeader(index)}>
                    Remove Header
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddHeader}>
                Add Header
              </button>
            </div>

            {/* Conditional Payload Section for POST requests */}
            {formData.method === "POST" && (
              <div className="inputs">
                <label>Payload</label>
                {Object.entries(formData.payload || {}).map(([key, value]) => (
                  <div key={key} className="payload-pair">
                    <input type="text" placeholder="Key" value={key} readOnly />
                    <input
                      type="text"
                      placeholder="Value"
                      value={value}
                      onChange={(e) => handlePayloadChange(key, e.target.value)}
                    />
                  </div>
                ))}
                <button type="button" onClick={handleAddPayloadField}>
                  Add Payload Field
                </button>
              </div>
            )}

            {/* Query Parameters Section */}
            <div className="inputs">
              <label>Query Parameters</label>
              {formData.queries &&
                typeof formData.queries === "object" &&
                !Array.isArray(formData.queries) &&
                Object.entries(formData.queries).map(([key, value], index) => (
                  <div key={index} className="param-pair">
                    <input
                      type="text"
                      placeholder="Query Name"
                      value={key}
                      onChange={(e) => {
                        const newKey = e.target.value;
                        const updatedQueries = {
                          ...(formData.queries as { [key: string]: string }),
                        }; // Assert the type
                        delete updatedQueries[key]; // Remove the old key
                        updatedQueries[newKey] = value; // Add the new key with the old value
                        setFormData((prev) => ({
                          ...prev,
                          queries: updatedQueries,
                        }));
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Query Value"
                      value={value}
                      onChange={(e) => handleParamsChange(key, e.target.value)}
                    />
                    <button onClick={() => handleRemoveParam(key)}>
                      Remove Query
                    </button>
                  </div>
                ))}

              <button type="button" onClick={handleAddParam}>
                Add Query Parameter
              </button>
            </div>

            <div className="btns" style={{ marginTop: "0px" }}>
              <button type="submit" className="save-btn">
                Save
              </button>
              <button className="save-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditForm;
