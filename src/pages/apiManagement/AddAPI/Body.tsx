import React, { useEffect, useState } from "react";
import { Endpoints } from "../../../interfaces/Endpoint";

const Body = ({ apiData, updateApiData, next, updateLocalApiData }: any) => {
  const [payloadFields, setPayloadFields] = useState<
    { key: string; value: string }[]
  >(apiData.payload || []);
  const [error, setError] = useState("");

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
      setPayloadFields((prev) => [...prev, { key: newKey, value: newValue }]); // Add the new key-value pair to the payload fields
      setNewKey(""); // Clear the input after adding
      setNewValue(""); // Clear the input after adding
      setError(""); // Clear any previous error
    } else {
      setError("Please enter a valid key and value");
    }
  };

  // Remove a payload field by its key
  const handleRemovePayloadField = (index: number) => {
    setPayloadFields((prev) => prev.filter((_, i) => i !== index));
  };

  // Save the payload and move to the next step
  const handleNextClick = () => {
    if (payloadFields.length > 0) {
      updateApiData("payload", payloadFields); // Update the parent state with the current payload
      next(); // Call the next step function to move forward
    } else {
      setError("Please add a payload for your POST request");
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "2rem" }}>Body</h2>

      <div className="payloads-container">
        <h2 style={{ marginBottom: "2rem" }}>Add Payload for POST Request</h2>

        {/* Input fields for new key and value */}
        <div style={{ marginBottom: "1.5rem" }} className="add-header">
          <div className="inputs" style={{ marginBottom: "0" }}>
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="Field Name"
              style={{ marginRight: "1rem" }}
            />
          </div>
          <div className="inputs" style={{ marginBottom: "0" }}>
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Field Value"
              style={{ marginRight: "1rem" }}
            />
          </div>
          <button onClick={handleAddPayloadField} className="header-btn">
            Add Payload
          </button>
        </div>

        {payloadFields.map((field, index) => (
          <div
            key={index}
            className="inputs"
            style={{ marginBottom: "1.5rem" }}
          >
            <div className="add-header">
              <span style={{ marginRight: "1rem" }}>
                <strong>{field.key}: </strong>
                {field.value}
              </span>
              <button
                onClick={() => handleRemovePayloadField(index)}
                className="header-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

        <button
          onClick={handleNextClick}
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
