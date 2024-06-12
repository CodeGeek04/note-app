"use client";

import { useState } from "react";
import { createUser } from "../../../server/serverActions";

export default function SignupPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);
    try {
      await createUser(userName, password);
      alert("User created");
      window.location.href = "/"; // Redirect to the homepage
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Sign up</h1>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="text-black w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" text-black w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onSubmit}
          className="w-full px-4 py-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sign up
        </button>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
    </div>
  );
}
