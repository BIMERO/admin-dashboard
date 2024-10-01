import React, { useState } from "react";

const Queries = ({ apiData, updateApiData, next, updateLocalApiData }: any) => {
  const [queries, setQueries] = useState<
    { [key: string]: string } | Array<[string, string]>
  >(
    Array.isArray(apiData.queries)
      ? apiData.queries
      : Object.entries(apiData.queries || {})
  );

  const [newQueryKey, setNewQueryKey] = useState<string>("");
  const [newQueryValue, setNewQueryValue] = useState<string>("");

  // Handle changes in the query input fields
  const handleQueryChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
  };

  // Add a new query parameter and update the queries state
  const handleAddQuery = () => {
    if (newQueryKey && newQueryValue) {
      const newQueryEntry: [string, string] = [newQueryKey, newQueryValue];

      const updatedQueries = [
        ...(queries as Array<[string, string]>),
        newQueryEntry,
      ];
      setQueries(updatedQueries);

      const updatedEndpoint = `${apiData.endpoint}/{${newQueryKey}}`;
      updateApiData("queries", updatedQueries); // Save the queries array
      updateApiData("endpoint", updatedEndpoint); // Update the endpoint
      updateLocalApiData("endpoint", updatedEndpoint);
      updateLocalApiData("queries", updatedQueries);

      // Reset the input fields
      setNewQueryKey("");
      setNewQueryValue("");
    }
  };

  // Remove a query field
  const handleRemoveQuery = (index: number) => {
    const updatedQueries = (queries as Array<[string, string]>).filter(
      (_, i) => i !== index
    );
    setQueries(updatedQueries);

    // Update the endpoint
    const updatedEndpoint = updatedQueries.reduce(
      (acc, query) => acc.replace(`/{${query[0]}}`, ""),
      apiData.endpoint
    );
    updateApiData("queries", updatedQueries);
    updateApiData("endpoint", updatedEndpoint);
    updateLocalApiData("endpoint", updatedEndpoint);
    updateLocalApiData("queries", updatedQueries);
  };

  const handleSaveQueries = () => {
    const formattedQueries =
      queries instanceof Array ? Object.fromEntries(queries) : queries;
    updateApiData("queries", formattedQueries);
    updateLocalApiData("queries", formattedQueries);
    next(); // Move to the next step
  };

  return (
    <div className="queries-container">
      <h2 style={{ marginBottom: "2rem" }}>Queries</h2>

      {(queries as Array<[string, string]>).map((query, index) => (
        <div
          key={index}
          className="queries-add"
          style={{ marginBottom: "1.5rem" }}
        >
          <div className="inputs">
            <label>Name: {query[0]}</label>
            <label>Value: {query[1]}</label>
          </div>
          <button
            onClick={() => handleRemoveQuery(index)}
            className="header-btn"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="queries-add">
        <div className="queries-inputs">
          <div className="inputs">
            <label htmlFor="queryName">Query Name</label>
            <input
              type="text"
              value={newQueryKey}
              onChange={(e) =>
                handleQueryChange(setNewQueryKey, e.target.value)
              }
              style={{ marginRight: "10px" }}
            />
          </div>

          <div className="inputs">
            <label htmlFor="queryValue">Query Value</label>
            <input
              type="text"
              value={newQueryValue}
              onChange={(e) =>
                handleQueryChange(setNewQueryValue, e.target.value)
              }
            />
          </div>
        </div>

        <button onClick={handleAddQuery} className="header-btn">
          Add Query
        </button>
      </div>

      <button
        onClick={handleSaveQueries}
        className="header-btn"
        style={{ marginTop: "2rem" }}
      >
        Save and Next
      </button>
    </div>
  );
};

export default Queries;
