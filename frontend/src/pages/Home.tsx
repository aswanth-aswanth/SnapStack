import React from "react";
import { Link } from "react-router-dom";
import Parent from "../components/ImageGallery/Parent";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to the Image Management App
      </h1>
      <div className="w-full">
        <Parent />
      </div>
      <div className="space-x-4 mt-10">
        <Link
          to="/dashboard"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
