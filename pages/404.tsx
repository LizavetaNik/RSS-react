import Link from "next/link";
import React from 'react';

export default function NotFound() {
 
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold mb-4">404 - Page Not Found</h1>
      <div>PageNotFound</div>
      <Link
        href="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go back to home
      </Link>
    </div>
  );
}
