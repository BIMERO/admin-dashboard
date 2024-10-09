import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import Users from "./Users";
import { User } from "../../interfaces/User";
import { getUsers } from "../../config/apiService";

const UserManagement = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [addUser, setAddUser] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const userData = await getUsers();
        setAllUsers(userData.data);
        console.log(userData.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
        <AddUser back={back} />
      ) : (
        <Users
          allusers={allUsers}
          onAddUser={handleAddUser}
          setAllUsers={setAllUsers}
        />
        // <></>
      )}
    </div>
  );
};

export default UserManagement;
