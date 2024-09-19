import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FaHome, FaSignOutAlt, FaSignInAlt, FaChartLine } from "react-icons/fa";
import { FaHome, FaSignOutAlt, FaSignInAlt, FaChartLine } from "react-icons/fa";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center fixed left-0 right-0 z-50 shadow-md">
      <Link to="/" className="hover:text-gray-300 transition duration-300">
        <h1 className="text-2xl font-bold">SnapStack</h1>
      </Link>
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-2 hover:text-gray-300 transition duration-300"
            >
              <FaHome size={20} />
              <span>Home</span>
            </Link>
          </li>
          {isAuthenticated ? (
          {isAuthenticated ? (
            <>
              <li>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300 flex items-center space-x-2 shadow-md"
                >
                  <FaChartLine size={18} />
                  <span>Dashboard</span>
                  <FaChartLine size={18} />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300 flex items-center space-x-2 shadow-md"
                >
                  <FaSignOutAlt size={18} />
                  <span>Logout</span>
                  <FaSignOutAlt size={18} />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => navigate("/login")}
                className="bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300 flex items-center space-x-2 shadow-md"
              >
                <FaSignInAlt size={18} />
                <span>Login</span>
                <FaSignInAlt size={18} />
                <span>Login</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
