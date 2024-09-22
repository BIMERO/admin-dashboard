import React from "react";

const Security = () => {
  return (
    <section className="security">
      <h1>Security Setting</h1>

      <div className="global-form">
        <form action="">
          <div className="inputs">
            <label>Allowed IPs</label>
            <input type="text" placeholder="Enter allowed IPs" />
          </div>

          <div className="inputs">
            <label>Blocked IPs</label>
            <input type="text" placeholder="Enter blocked IPs" />
          </div>

          <div className="inputs">
            <label>Allowed CORS Origins</label>
            <input type="text" placeholder="Enter allowed origins" />
          </div>

          <div className="inputs">
            <label>Allowed Methods</label>
            <input type="checkbox" /> GET
            <input type="checkbox" /> POST
            <input type="checkbox" /> PUT
          </div>
        </form>
      </div>
    </section>
  );
};

export default Security;
