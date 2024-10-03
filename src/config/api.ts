const BASE_URL = process.env.REACT_APP_ADMIN_BASE_URL;

export const API_ENDPOINTS = {
  getUsers: `${BASE_URL}/users`,
  createNewUser: `${BASE_URL}/users/store`,
  editUser: (id: Number) => `${BASE_URL}/users/edit/${id}`,
  updateUser: (id: Number) => `${BASE_URL}/users/update/${id}`,
  deleteUser: (id: Number) => `${BASE_URL}/users/delete/${id}`,
  updateUserStatus: (id: Number) => `${BASE_URL}/users/status/${id}`,
  filterUsers: `${BASE_URL}/users/filter`,

  //apis
  getApis: `${BASE_URL}/apis`,
  createNewApi: `${BASE_URL}/apis/store`,
};
