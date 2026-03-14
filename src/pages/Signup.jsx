// src/pages/Signup.jsx
import React, { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const takenUsernames = ["herway", "admin", "demo"];

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (takenUsernames.includes(value.toLowerCase())) {
      setUsernameError("⚠ Username already exists, try something else");
    } else {
      setUsernameError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !name || !username || usernameError) {
      alert("Please fill all fields correctly!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("hw_users") || "[]");

    const newUser = {
      email: email.trim().toLowerCase(),
      password,
      name,
      username,
    };

    users.push(newUser);
    localStorage.setItem("hw_users", JSON.stringify(users));
    localStorage.setItem("hw_current_user", JSON.stringify(newUser));

    window.location.href = "/community";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-6">
          <img src="/logo.png" alt="HerWay Logo" className="h-14 mx-auto" />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Create your HerWay account 🚀
          </h2>
          <p className="text-gray-600 text-sm">
            Join the community and travel safer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-300"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-300"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-300"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-300"
              placeholder="Choose a username"
              required
            />

            {usernameError && (
              <p className="text-sm text-red-500 mt-1">{usernameError}</p>
            )}

            <p className="text-xs text-gray-500 mt-1">
              You can choose a random name if you want to stay anonymous.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Create Account
          </button>
        </form>

      </div>
    </div>
  );
}