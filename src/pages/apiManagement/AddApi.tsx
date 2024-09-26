import React, { useState } from "react";

interface APIManagementProps {
  id: number;
  endpoint: string;
  method: ""; // restrict to common HTTP methods
  description: string;
  headers: {
    "Content-Type": string;
    [key: string]: string; // allows additional header fields if needed
  };
  payload: Record<string, any>; // flexible type for payload (can be empty or contain data)
  parameters: {
    limit?: number;
    offset?: number;
    [key: string]: any; // allows additional parameters if needed
  };
  enabled: boolean;
}

const AddApi = ({
  onBack,
  saveAPI,
}: {
  onBack: () => void;
  saveAPI: (user: any) => void;
}) => {
  const [endpointData, setEndpointData] = useState<APIManagementProps>({
    id: Date.now(),
    endpoint: "",
    method: "",
    description: "",
    headers: { "Content-Type": "application/json" },
    payload: {},
    parameters: { limit: 10, offset: 0 },
    enabled: true,
  });

  const handleKeyValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "headers" | "payload" | "parameters",
    key: string
  ) => {
    const { value } = e.target;
    setEndpointData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: value,
      },
    }));
  };

  const handleNewKeyValue = (type: "headers" | "payload" | "parameters") => {
    setEndpointData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        "": "", // Add an empty key-value pair
      },
    }));
  };

  const handleDeleteKeyValue = (
    type: "headers" | "payload" | "parameters",
    key: string
  ) => {
    const updatedData = { ...endpointData[type] };
    delete updatedData[key];
    setEndpointData((prev) => ({
      ...prev,
      [type]: updatedData,
    }));
  };

  // Handle general input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEndpointData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveAPI(endpointData);
    setEndpointData({ ...endpointData, id: Date.now() }); // Reset form
  };

  return (
    <div>
      <div className="user-header">
        <h1>Add API</h1>
        <button onClick={onBack}>Back</button>
      </div>

      <div>
        <form action="submit" onSubmit={handleSubmit}>
          <div className="inputs">
            <label>Endpoint:</label>
            <input
              type="text"
              name="endpoint"
              value={endpointData.endpoint}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApi;
