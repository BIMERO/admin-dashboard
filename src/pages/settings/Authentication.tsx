import React from "react";

const Authentication = () => {
  return (
    <section className="authentication">
      <h1>Authentication Setting</h1>
      <div className="global-form">
        <form action="">
          <div className="inputs">
            <label>Token Expiry (hours)</label>
            <input type="text" placeholder="Enter token expiry" />
          </div>

          <div className="inputs">
            <label>OAuth Settings</label>
            <input type="text" placeholder="Enter OAuth Providers" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Authentication;
