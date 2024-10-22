import { useCallback } from "react";
import "./create.css";
import { Link, useParams } from "react-router-dom";
import { IoCheckmarkOutline } from "react-icons/io5";

export default function CreateAccount() {
  const { account_type } = useParams();
  const emoji = useCallback(() => {
    switch (account_type) {
      case "basic":
        return ":)";
      case "regular":
        return "'_)'";
      case "premium":
        return "_!_";
      default:
        return "not found";
    }
  }, [account_type]);

  return (
    <>
      {account_type}
      <Link to={`/loading?account_type=${account_type}`}>create {emoji()}</Link>

      <div className="create">
        <div className="create-form">
          <h1>Create {emoji()} account</h1>
          <p>It's free and only takes a minute</p>
          <form action="">
            <div className="inputs">
              <label htmlFor="">Username:</label>
              <input type="text" placeholder="Username" />
            </div>

            <div className="inputs">
              <label htmlFor="">Email:</label>
              <input type="text" placeholder="Email" />
            </div>

            <div className="inputs">
              <label htmlFor="">Password:</label>
              <input type="password" placeholder="Password" />
            </div>

            <div className="inputs">
              <label htmlFor="">Confirm Password</label>
              <input type="password" placeholder="Confirm Password" />
            </div>

            <button type="submit">Create {emoji()} account</button>
          </form>
        </div>
        <div className="create-package">
          <div className="register_package">
            <div className="package-type standard">
              <h1>Standard</h1>
              <p>$50,000</p>
            </div>
            <ul>
              <li>
                <IoCheckmarkOutline />
                <span>20 Endpoints</span>
              </li>
              <li>
                <IoCheckmarkOutline />
                <span>30 Api calls</span>
              </li>
              <li>
                <IoCheckmarkOutline />
                <span>Shareable</span>
              </li>
              <li>
                <IoCheckmarkOutline />
                <span>Create users</span>
              </li>
              <li>
                <IoCheckmarkOutline />
                <span>Generate authentication keys</span>
              </li>
            </ul>

            <button className="register-btn standard-btn">
              <Link to="/register/regular">Continue</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
