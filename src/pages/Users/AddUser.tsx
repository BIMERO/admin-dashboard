import moment from "moment";
import React, { useState } from "react";
import { User } from "../../interfaces/User";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { FaCircleArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6";
import { createUser } from "../../config/apiService";

const roles = ["admin", "developer", "viewer"] as const;

const AddUser = ({ back }: { back: () => void }) => {
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    type: "",
  });
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };
  const handleRoleSelect = (type: User["type"]) => {
    setNewUser({ ...newUser, type });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isPasswordMatch = newUser.password === confirmPassword;

  const handleReset = () => {
    setNewUser({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      type: "",
    });
    setConfirmPassword("");
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordMatch) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    const createNewUsers = async () => {
      setLoading(true);
      try {
        const response = await createUser(newUser);
        console.log(response.data);
        setLoading(false);
        window.location.reload();
      } catch (err) {
        setError("Failed to create new user");
        setLoading(false);
      }
    };
    createNewUsers();
  };

  return (
    <div className="add-user">
      <div className="user-header">
        <FaCircleArrowLeft className="icon" onClick={back} />
        <h1>Add User</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex-inputs">
          <div className="inputs">
            <label className="">First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter First Name"
              value={newUser.first_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputs">
            <label className="">Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Enter Last Name"
              value={newUser.last_name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="flex-inputs">
          <div className="inputs">
            <label className="">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
            />
          </div>
          <div className="inputs">
            <label className="">Address</label>
            <input type="text" name="address" placeholder="Home Address" />
          </div>
        </div>

        <div className="flex-inputs">
          <div className="password_inputs">
            <label className="">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
              <span onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="password_inputs">
            <label className="">Confirm Password</label>
            <div className="password-input">
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={handleConfirmPasswordChange}
              />
              <span onClick={toggleConfirmPasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
        </div>

        <div className="custom-dropdown">
          <label>Role</label>
          <div
            className="dropdown-header"
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
          >
            {newUser.type ? newUser.type : "Selected role"}
            <span>
              {roleDropdownOpen ? (
                <MdOutlineKeyboardArrowUp style={{ fontSize: "1.125rem" }} />
              ) : (
                <MdOutlineKeyboardArrowDown style={{ fontSize: "1.125rem" }} />
              )}
            </span>
          </div>
          {roleDropdownOpen && (
            <ul className="dropdown-list">
              {roles.map((role) => (
                <li
                  key={role}
                  onClick={() => {
                    setRoleDropdownOpen(false);
                    handleRoleSelect(role);
                  }}
                >
                  {role}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="btns">
          <button type="submit" className="save-btn">
            {loading ? <span>Creating User....</span> : <span>Save</span>}
          </button>

          <button type="reset" className="save-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      <p>{error}</p>
    </div>
  );
};

export default AddUser;
