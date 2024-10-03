import React, { useEffect, useState } from "react";
import { User } from "../../interfaces/User";
import CustomSelect from "../../components/customSelect/CustomSelect";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { updateUser } from "../../config/apiService";

const EditUserForm = ({
  user,
  onSave,
  onClose,
  allUsers,
}: {
  user: User;
  onSave: (updatedUser: User) => void;
  onClose: () => void;
  allUsers: any;
}) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: "",
    type: user.type,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: any) => {
    setFormData({
      ...formData,
      password: e.target.value, // Set password in form data
    });
  };

  useEffect(() => {
    formData.first_name = user.first_name;
    formData.last_name = user.last_name;
    formData.email = user.email;
    formData.type = user.type;
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateUser(user.id, formData); // Call POST /users/update/{id}
      setLoading(false);
      onClose();

      // Optionally, update the users list in the parent component
      allUsers((prevUsers: any) =>
        prevUsers.map((u: any) =>
          u.id === user.id ? { ...u, ...response.data } : u
        )
      );
    } catch (error) {
      setLoading(false);
      console.error("Error updating user:", error);
    }
  };

  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Viewer", value: "viewer" },
    { label: "Developer", value: "developer" },
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSelectChange = (selectedRole: string) => {
    setFormData({ ...formData, type: selectedRole });
  };

  const handleCancel = () => {
    formData.first_name = "";
    formData.last_name = "";
    formData.email = "";
    formData.type = "";

    onClose();
  };

  return (
    <section className="edit-user">
      <div className="edit-user-modal" style={{ padding: "2rem" }}>
        <div className="modal-header">
          <h2>Edit User </h2>
          <div className="btns">
            <button type="submit" onClick={handleSubmit} className="save-btn">
              Save Changes
            </button>
            <button type="button" onClick={handleCancel} className="save-btn">
              Cancel
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label htmlFor="fullName">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputs">
            <label htmlFor="fullName">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputs">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="password_inputs">
            <label className="">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="passwords"
                id="passwords"
                value={formData.password}
                onChange={handlePasswordChange}
                placeholder="Password"
              />
              <span onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <CustomSelect
            options={roleOptions}
            placeholder={formData.type}
            value={formData.type}
            onSelect={handleSelectChange}
          />
        </form>
      </div>
    </section>
  );
};

export default EditUserForm;
