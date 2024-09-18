import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Parent from "../components/ImageGallery/Parent";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div>
        <p>Welcome, {user?.email}!</p>
        <Parent />
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 inline-block ml-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
