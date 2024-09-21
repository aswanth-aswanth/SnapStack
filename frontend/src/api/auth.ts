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

export const resetPassword = async (email: string) => {
  try {
    await apiClient.post(`/api/auth/forgot-password`, { email });
  } catch (error) {
    console.error("Reset Password API error:", error);
    throw new Error("Failed to send reset password email.");
  }
};

export const submitNewPassword = async (token: string, newPassword: string) => {
  try {
    await apiClient.post(`/api/auth/reset-password/${token}`, { newPassword });
  } catch (error) {
    console.error("Submit New Password API error:", error);
    throw new Error("Failed to reset password.");
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

export const sendResetLink = async (email: string) => {
  try {
    await apiClient.post(`/api/auth/send-reset-link`, { email });
  } catch (error) {
    console.error("error:", error);
    throw new Error("Failed to send reset link");
  }
};

export const changePassword = async (token: string, newPassword: string) => {
  try {
    await apiClient.post(`/api/auth/reset-password/${token}`, { newPassword });
  } catch (error) {
    console.error("error:", error);
    throw new Error("Failed to reset password");
  }
};
