import React from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { IoCheckmarkOutline } from "react-icons/io5";

const Register = () => {
  return (
    <div className="register">
      <div className="register_package">
        <div className="package-type">
          <h1>Basic</h1>
          <p>$25,000</p>
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

        <button className="register-btn">
          <Link to="/register/basic">Continue</Link>
        </button>
      </div>

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

      <div className="register_package">
        <div className="package-type premium">
          <h1>Premium</h1>
          <p>$75,000</p>
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

        <button className="register-btn premium-btn">
          <Link to="/register/premium">Continue</Link>
        </button>
      </div>
    </div>
  );
};

export default Register;
