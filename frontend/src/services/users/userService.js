import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

//   Create axios instance with base URL
const API = axios.create({
  baseURL: BASE_URL,
});

//   Add token to headers dynamically (instead of at import time)
const authHeaders = () => {
  const token = getUserFromStorage();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

//   Login
export const loginAPI = async ({ email, password }) => {
  const response = await API.post("/users/login", { email, password });
  return response.data;
};

//   Register
export const registerAPI = async ({ email, password, username }) => {
  const response = await API.post("/users/register", {
    email,
    password,
    username,
  });
  return response.data;
};

//   Change password
export const changePasswordAPI = async (newPassword) => {
  const response = await API.put(
    "/users/change-password",
    { newPassword },
    authHeaders()
  );
  return response.data;
};

//   Update profile
export const updateProfileAPI = async ({ email, username }) => {
  const response = await API.put(
    "/users/update-profile",
    { email, username },
    authHeaders()
  );
  return response.data;
};

//   Get profile
export const getProfileAPI = async () => {
  const response = await API.get("/users/profile", authHeaders());
  return response.data;
};
