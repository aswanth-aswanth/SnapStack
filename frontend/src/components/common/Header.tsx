import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl">SnapStack</h1>
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => navigate("/login")}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
