import React, { useEffect, useState } from "react";
import { User } from "../../../interfaces/User";
import CustomSelect from "../../components/customSelect/CustomSelect";

const EditUserForm = ({
  user,
  onSave,
  onClose,
}: {
  user: User;
  onSave: (updatedUser: User) => void;
  onClose: () => void;
}) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);

  useEffect(() => {
    setFullName(user.fullName);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status);
  }, [user]);

  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];
  const roleOptions = [
    { label: "Admin", value: "Admin" },
    { label: "User", value: "User" },
    { label: "Admin", value: "Admin" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, fullName, email, role, status };
    onSave(updatedUser);
  };

  return (
    <section className="edit-user">
      <div className="edit-user-modal">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="inputs">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <CustomSelect
            options={roleOptions}
            placeholder={role}
            value={role}
            onSelect={(value) => setRole(value)}
          />
          <CustomSelect
            options={statusOptions}
            placeholder={status}
            value={status}
            onSelect={(value) => setStatus(value)}
          />

          <div className="btns">
            <button type="submit" className="save-btn">
              Save Changes
            </button>
            <button type="button" onClick={onClose} className="save-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditUserForm;
