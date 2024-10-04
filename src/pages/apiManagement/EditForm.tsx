import React, { useState } from "react";
import "./apimanagement.css";
import { APIs } from "../../interfaces/APIs";
import { HeaderProps } from "../../interfaces/Headers";

interface EditFormProps {
  row: APIs;
  onSave: (updatedRow: APIs) => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ row, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    endpoint: row.endpoint,
    method: row.method,
    description: row.description,
    status: row.status,
    headers: row.headers.map((header: any) => ({
      name: header.name,
      samples: header.samples, // or you can join them into a string: samples.join(', ')
    })),
    payload: row.payload.map((item: any) => ({
      key: item.key,
      value: item.value,
    })),
    parameters: row.parameters.map((param: any) => ({
      // map the parameters if they exist, assuming similar to payload structure
      key: param.key || "",
      value: param.value || "",
    })),
  });

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

  const handleHeaderChange = (
    index: number,
    key: keyof HeaderProps,
    value: any
  ) => {
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
      headers: [...prev.headers, { name: "", samples: [""] }],
    }));
  };

  const handleRemoveHeader = (index: number) => {
    const updatedHeaders = formData.headers.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      headers: updatedHeaders,
    }));
  };

  const handleParamsChange = (index: number, key: string, value: string) => {
    const updatedParams = [...formData.parameters];
    updatedParams[index] = { ...updatedParams[index], [key]: value };
    setFormData((prev) => ({
      ...prev,
      parameters: updatedParams,
    }));
  };

  const handleAddParam = () => {
    setFormData((prev) => ({
      ...prev,
      parameters: [...prev.parameters, { key: "", value: "" }],
    }));
  };

  const handleRemoveParam = (index: number) => {
    const updatedParams = formData.parameters.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      parameters: updatedParams,
    }));
  };

  const handlePayloadChange = (index: number, key: string, value: string) => {
    const updatedPayload = [...formData.payload];
    updatedPayload[index] = { ...updatedPayload[index], [key]: value };
    setFormData((prev) => ({
      ...prev,
      payload: updatedPayload,
    }));
  };

  const handleAddPayloadField = () => {
    setFormData((prev) => ({
      ...prev,
      payload: [...prev.payload, { key: "", value: "" }],
    }));
  };

  const handleRemovePayloadField = (index: number) => {
    const updatedPayload = formData.payload.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      payload: updatedPayload,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // onSave(formData);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <section className="edit-user" style={{ minHeight: "100vh" }}>
      <div className="edit-user-modal">
        <div className="edit-form">
          <h2 style={{ marginBottom: "2rem" }}>Edit API</h2>
          <form onSubmit={handleSave}>
            <div className="inputs">
              <label>Base Url</label>
              <input
                type="text"
                name="baseUrl"
                // value={baseUrl}
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
                <option value="get">GET</option>
                <option value="post">POST</option>
                <option value="put">PUT</option>
                <option value="delete">DELETE</option>
                <option value="patch">PATCH</option>
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
                      handleHeaderChange(index, "name", e.target.value)
                    }
                    style={{ marginBottom: "1rem" }}
                  />
                  <input
                    type="text"
                    placeholder="Header Sample"
                    value={header.samples[0]}
                    onChange={(e) =>
                      handleHeaderChange(index, "samples", [e.target.value])
                    }
                  />
                  <button
                    onClick={() => handleRemoveHeader(index)}
                    className="save-btn"
                  >
                    Remove Header
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddHeader}
                className="save-btn"
              >
                Add Header
              </button>
            </div>

            {/* Params Section */}
            <div className="inputs">
              <label>Params</label>
              {formData.parameters.map((param, index) => (
                <div key={index} className="param-pair">
                  <input
                    type="text"
                    placeholder="Param Key"
                    value={param.key}
                    onChange={(e) =>
                      handleParamsChange(index, "key", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Param Value"
                    value={param.value}
                    onChange={(e) =>
                      handleParamsChange(index, "value", e.target.value)
                    }
                  />
                  <button
                    onClick={() => handleRemoveParam(index)}
                    className="save-btn"
                  >
                    Remove Param
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddParam}
                className="save-btn"
              >
                Add Param
              </button>
            </div>

            {/* Payload Section */}
            {formData.method === "post" && (
              <div className="inputs">
                <label>Payload</label>
                {formData.payload.map((payloadField, index) => (
                  <div key={index} className="payload-pair">
                    <input
                      type="text"
                      placeholder="Payload Key"
                      value={payloadField.key}
                      onChange={(e) =>
                        handlePayloadChange(index, "key", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Payload Value"
                      value={payloadField.value}
                      onChange={(e) =>
                        handlePayloadChange(index, "value", e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleRemovePayloadField(index)}
                      className="save-btn"
                    >
                      Remove Payload Field
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddPayloadField}
                  className="save-btn"
                >
                  Add Payload Field
                </button>
              </div>
            )}

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
