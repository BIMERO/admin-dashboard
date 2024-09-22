import React from "react";

const ErrorHandling = () => {
  return (
    <section className="error-handling">
      <h1>Error Handling</h1>
      <div className="global-form">
        <form action="">
          <div className="inputs">
            <label>Enable Custom Error Messages</label>
            <input type="checkbox" />
          </div>

          <div className="inputs">
            <label>Default Error Response Format</label>
            <input type="text" placeholder="Enter response format" />
          </div>

          <div className="inputs">
            <label>Error Codes Mapping</label>
            <input type="text" placeholder="Enter error code mapping" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ErrorHandling;
