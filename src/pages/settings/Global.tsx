import React from "react";

const Global = () => {
  return (
    <section className="global">
      <h1>Global Settings</h1>
      <div className="global-form">
        <form action="">
          <div className="inputs">
            <label>Base API URL</label>
            <input type="text" placeholder="Enter base URL" />
          </div>

          <div className="inputs">
            <label>Timeout Duration (seconds)</label>
            <input type="number" placeholder="Enter timeout duration" />
          </div>

          <div className="inputs">
            <label>Max API Call Limit</label>
            <input type="number" placeholder="Enter call limit" />
          </div>

          <div className="inputs">
            <label>Rate Limiting (requests per minute)</label>
            <input type="number" placeholder="Set rate limit" />
          </div>

          <div className="inputs">
            <label>Pagination Settings</label>
            <input type="number" placeholder="Enter default page size" />
          </div>

          <button>Save</button>
        </form>
      </div>
    </section>
  );
};

export default Global;
