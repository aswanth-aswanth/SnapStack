import axios from "axios";
import { User } from "../types";

const API_URL =  "http://localhost:5000/api";

interface AuthResponse {
  user: User;
  token: string;
}

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const register = async (
  email: string,
  phoneNumber: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email,
    phoneNumber,
    password,
  });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axios.post(
    `${API_URL}/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const resetPassword = async (email: string): Promise<void> => {
  await axios.post(`${API_URL}/auth/reset-password`, { email });
};

export const verifyToken = async (): Promise<User> => {
  const response = await axios.get(`${API_URL}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
