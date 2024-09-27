import React, { useEffect, useState } from "react";

const Body = ({ apiData, updateApiData, next }: any) => {
  const [rawPayload, setRawPayload] = useState(
    JSON.stringify(apiData.payload, null, 2)
  );

  // Update rawPayload when apiData changes, like when switching between APIs
  useEffect(() => {
    setRawPayload(JSON.stringify(apiData.payload, null, 2));
  }, [apiData.payload]);

  const handlePayloadChange = (e: any) => {
    const value = e.target.value;
    setRawPayload(value);

    try {
      const parsedValue = JSON.parse(value);
      updateApiData("payload", parsedValue);
    } catch (error) {
      // Allow the user to keep typing even if the JSON isn't valid yet
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "2rem" }}>Body</h2>

      <div className="inputs">
        <label htmlFor="payload">Payload</label>
        <textarea
          value={rawPayload} // Formats JSON with indentation
          onChange={handlePayloadChange}
          rows={10}
          cols={50}
          id="payload"
          style={{
            fontFamily: "monospace",
            fontSize: "14px",

            backgroundColor: "#f9f9f9",
          }}
        />
      </div>

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

export default Body;
