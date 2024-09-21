import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changePassword } from "../api/auth";

const NewPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(token || "", newPassword);
      setMessage("Password reset successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Failed to reset password:", error);
      setMessage("Failed to reset password.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Set New Password</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full py-2 text-white bg-red-500 rounded-md"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
};

export default NewPassword;
