// src/services/apiService.ts
import axios from "axios";
import { API_ENDPOINTS } from "./api";

const api = axios.create({
  baseURL: process.env.REACT_APP_ADMIN_BASE_URL,
});

// Fetch users
export const getUsers = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.getUsers);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Create user
export const createUser = async (credentials: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  type: string;
}) => {
  try {
    const response = await api.post(API_ENDPOINTS.createNewUser, credentials);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

//Edit User
export const getEditUser = async (id: number) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.editUser(id)}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

//Update user
export const updateUser = async (
  id: number,
  credentials: {
    first_name: string;
    last_name: string;
    email: string;
    // password: string;
    type: string;
  }
) => {
  try {
    const response = await api.post(
      `${API_ENDPOINTS.updateUser(id)}`,
      credentials
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

//Delete User
export const deleteUser = async (id: number) => {
  try {
    const response = await api.delete(`${API_ENDPOINTS.deleteUser(id)}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUserStatus = async (
  id: number,
  statusData: { status: string }
) => {
  try {
    const response = await api.post(`${API_ENDPOINTS.updateUserStatus(id)}`, {
      statusData,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const filterUsers = async (filterParams: {
  filterName?: string | "";
  filterStatus?: string | "";
  filterEmail?: string | "";
  filterType?: string | "";
}) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.filterUsers}`, {
      params: filterParams,
    });
    return response.data; // Assuming the response contains the users data
  } catch (error) {
    handleError(error); // Handle errors as needed
  }
};

//apis
export const getApis = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.getApis);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

//create new api
export const createAPI = async (credentials: {
  endpoint: string;
  method: string;
  description: string;
  status: string;
  headers: [];
  payload: [];
  parameters: [];
}) => {
  try {
    const response = await api.post(API_ENDPOINTS.createNewApi, credentials);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

//edit api
export const getEditApi = async (id: number) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.editApi(id)}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

//Update api
export const updateApi = async (
  id: number,
  credentials: {
    endpoint: string;
    method: string;
    description: string;
    status: string;
    headers: [];
    payload: [];
    parameters: [];
  }
) => {
  try {
    const response = await api.post(
      `${API_ENDPOINTS.updateApis(id)}`,
      credentials
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

//api call logs
export const getAllCallLogs = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.getAllCallLogs);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: any) => {
  console.log(error);
  console.error("API Error:", error.response?.data?.message || error.message);
  throw new Error(error.response?.data?.message || "Network Error");
};
