import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops!BC Page not found.</p>
        <a href="/"><button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Go Home
        </button></a>
      </div>
    </div>
  );
};

export default NotFound;
