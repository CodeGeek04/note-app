"use client";

import React, { useState } from "react";
import { checkPassword } from "../../server/serverActions";
import Notes from "../../components/Notes";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (await checkPassword(username, password)) {
      setLoggedIn(true);
    }
  };

  const handleSignup = () => {
    window.location.href = "/signup";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!loggedIn ? (
        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-black w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="w-full px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Signup
          </button>
        </div>
      ) : (
        <Notes username={username} />
      )}
    </div>
  );
}
