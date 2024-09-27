import React, { useState } from "react";
import "./apimanagement.css";
import { HeaderProps } from "../../../interfaces/Headers";

interface APIManagementProps {
  id: number;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  description: string;
  headers: HeaderProps[];
  payload: Record<string, any>;
  parameters: {
    limit?: number;
    offset?: number;
    [key: string]: any;
  };
  enabled: boolean;
  baseUrlId: string;
}

interface EditFormProps {
  row: APIManagementProps;
  onSave: (updatedRow: APIManagementProps) => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ row, onSave, onClose }) => {
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
    <section className="edit-user">
      <div className="edit-user-modal">
        <div className="edit-form">
          <h2 style={{ marginBottom: "1.5rem", alignItems: "center" }}>
            Edit User
          </h2>
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
                    // value={value}
                    onChange={(e) =>
                      handleHeadersChange(index, key, e.target.value)
                    }
                  />
                </div>
              ))}

              {/* {formData.headers.map((header, index) => (
                <div key={index} className="header-pair">
                  <input
                    type="text"
                    placeholder="Header Key"
                    value={header.name}
                    style={{ marginBottom: "1rem" }}
                    onChange={(e) =>
                      handleHeadersChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Header Value"
                    value={header.example} // Assuming 'example' is used as the value in the headers
                    onChange={(e) =>
                      handleHeadersChange(index, "example", e.target.value)
                    }
                  />
                </div>
              ))} */}
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
              {Object.entries(formData.parameters).map(
                ([key, value], index) => (
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
                )
              )}
            </div>
            <button type="submit" className="save-btn">
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditForm;
