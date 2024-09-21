import React, { useState } from "react";
import "./apimanagement.css";

interface APIManagementProps {
  id: number;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  description: string;
  headers: {
    "Content-Type": string;
    [key: string]: string;
  };
  payload: Record<string, any>;
  parameters: {
    limit?: number;
    offset?: number;
    [key: string]: any;
  };
  enabled: boolean;
}
interface EditFormProps {
  row: APIManagementProps;
  onSave: (updatedRow: APIManagementProps) => void;
}

const EditForm: React.FC<EditFormProps> = ({ row, onSave }) => {
  const [formData, setFormData] = useState<APIManagementProps>(row);

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
    const updatedHeaders = { ...formData.headers, [key]: value };
    setFormData((prev) => ({
      ...prev,
      headers: updatedHeaders,
    }));
  };

  const handleParamsChange = (key: string, value: string) => {
    const updatedParams = { ...formData.parameters, [key]: value };
    setFormData((prev) => ({
      ...prev,
      parameters: updatedParams,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="edit-form">
      <form onSubmit={handleSave}>
        <div className="inputs">
          <label className="">Endpoint</label>
          <input
            type="text"
            name="endpoint"
            value={formData.endpoint}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        <div className="inputs">
          <label className="">Method</label>
          {/* <input
            type="text"
            name="method"
            value={formData.method}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded"
          /> */}
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
          <label className="">Description</label>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        <div className="inputs">
          <label>Headers</label>
          {Object.entries(formData.headers).map(([key, value], index) => (
            <div key={index} className="header-pair">
              <input
                type="text"
                placeholder="Header Key"
                value={key}
                style={{ marginBottom: "1rem" }}
              />
              <input
                type="text"
                placeholder="Header Value"
                value={value}
                onChange={(e) =>
                  handleHeadersChange(index, key, e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <div className="inputs">
          <label>Payload (JSON/XML)</label>
          <textarea
            name="payload"
            value={JSON.stringify(formData.payload, null, 2)}
            onChange={handleChange}
            rows={5}
            cols={5}
          />
        </div>
        <div className="inputs">
          <label>Parameters</label>
          {Object.entries(formData.parameters).map(([key, value], index) => (
            <div key={index} className="param-pair">
              <input
                type="text"
                placeholder="Parameter Key"
                value={key}
                readOnly
              />
              <input
                type="text"
                placeholder="Parameter Value"
                value={value}
                onChange={(e) => handleParamsChange(key, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button type="submit" className="save-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditForm;
