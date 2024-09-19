import axios from "axios";
import apiClient from "./apiClient";

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(`/api/auth/login`, {
      email,
      password,
    });

    const { token, user } = response.data;

    return { token, user };
  } catch (error) {
    console.error("Login API error:", error);
    throw new Error(
      "Login failed. Please check your credentials and try again."
    );
  }
};

export const register = async (
  email: string,
  phone: string,
  password: string
) => {
  try {
    const response = await apiClient.post(`/api/auth/register`, {
      email,
      phone,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Register API error:", error);
    throw new Error("Registration failed. Please try again.");
  }
};
