import React, { useState } from "react";
import { usersData } from "./userData";
import AddUser from "./AddUser";
import Users from "./Users";

const UserManagement = () => {
  const [allUsers, setAllUsers] = useState(usersData);
  const [addUser, setAddUser] = useState(false);

  const handleAddUser = () => {
    setAddUser(true);
  };

  const handleSaveUser = (newUser: any) => {
    setAllUsers([...allUsers, newUser]);
    setAddUser(false);
  };

  const back = () => {
    setAddUser(false);
  };

  return (
    <div>
      {addUser ? (
        <AddUser back={back} saveUser={handleSaveUser} />
      ) : (
        <Users allusers={allUsers} onAddUser={handleAddUser} />
      )}
    </div>
  );
};

export default UserManagement;
