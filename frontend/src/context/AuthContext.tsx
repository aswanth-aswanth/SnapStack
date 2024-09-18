import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

// Define user type
type User = {
  email: string;
  phone: string;
};

// Define context type
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const { token, userData } = await login(email, password);

    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));

    setUser(userData);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/");
  };

  // Check user session on initial load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      // Simulate token validation (replace with actual token validation logic)
      const isValidToken = token === "mocked-jwt-token"; // Replace with actual validation

      if (isValidToken) {
        setUser(JSON.parse(userData));
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
