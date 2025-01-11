// pages/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-4">Page Not Found</p>
      <Link
        to="/"
        className="text-blue-500 underline hover:text-blue-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
