import React, { useState } from "react";
import { resetPassword } from "../api/auth";

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setMessage("Failed to send password reset email.");
      console.log("error : ", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full py-2 text-white bg-red-500 rounded-md"
        >
          Send Reset Email
        </button>
      </form>
      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
