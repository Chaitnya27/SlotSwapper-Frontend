import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-4">Oops! The page you are looking for does not exist.</p>
      <p className="text-gray-500">Please check the URL or go back to a valid page.</p>
    </div>
  );
}