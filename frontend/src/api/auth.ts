import axios from "axios";

const API_BASE_URL = "https://your-api-url.com";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
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
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
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
