import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import { AuthProvider } from "./context/AuthContext";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col ">
        <Header />
        <main className="flex-grow p-4 pb-20 mt-[100px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password/:token" element={<NewPassword />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
