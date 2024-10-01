import React, { useEffect, useState } from "react";
import { Endpoints } from "../../../interfaces/Endpoint";

const Body = ({ apiData, updateApiData, next, updateLocalApiData }: any) => {
  const [payloadFields, setPayloadFields] = useState<{ [key: string]: string }>(
    apiData.payload || {}
  );

  const [newKey, setNewKey] = useState(""); // State for the new key
  const [newValue, setNewValue] = useState(""); // State for the new value

  // Handle the change of the payload field value
  const handlePayloadChange = (key: string, value: string) => {
    setPayloadFields((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Add the new key-value pair to the payload fields
  const handleAddPayloadField = () => {
    if (newKey.trim() && newValue.trim()) {
      setPayloadFields((prev) => ({
        ...prev,
        [newKey]: newValue,
      }));
      setNewKey(""); // Clear the input after adding
      setNewValue(""); // Clear the input after adding
    }
  };

  // Remove a payload field by its key
  const handleRemovePayloadField = (key: string) => {
    const updatedPayloadFields = { ...payloadFields };
    delete updatedPayloadFields[key];
    setPayloadFields(updatedPayloadFields);
  };

  // Save the payload and move to the next step
  const handleSavePayload = () => {
    updateApiData("payload", payloadFields); // Update the parent state with the current payload
    updateLocalApiData("payload", payloadFields); // Update the local state with the current payload
    next(); // Call the next step function to move forward
  };

  return (
    <div>
      <h2 style={{ marginBottom: "2rem" }}>Body</h2>

      <div className="payloads-container">
        <h2 style={{ marginBottom: "2rem" }}>Add Payload for POST Request</h2>

        {/* Input fields for new key and value */}
        <div style={{ marginBottom: "1.5rem" }}>
          <input
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="Field Name"
            style={{ marginRight: "1rem" }}
          />
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Field Value"
            style={{ marginRight: "1rem" }}
          />
          <button onClick={handleAddPayloadField} className="header-btn">
            Add Payload
          </button>
        </div>

        {Object.entries(payloadFields).map(([key, value]) => (
          <div key={key} className="inputs" style={{ marginBottom: "1.5rem" }}>
            <span style={{ marginRight: "1rem" }}>
              <strong>{key}: </strong>
              {value}
            </span>
            <button
              onClick={() => handleRemovePayloadField(key)}
              className="header-btn"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={handleSavePayload}
          className="header-btn"
          style={{ marginTop: "2rem" }}
        >
          Save and Next
        </button>
      </div>
    </div>
  );
};

export default Body;
