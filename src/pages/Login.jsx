import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// adjust logo path if needed
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simple localStorage-based auth check (dev only).
  // Your backend / auth provider should replace this.
  const findUser = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("hw_users") || "[]");
      return users.find((u) => u.email === email && u.password === password);
    } catch {
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill both email and password.");
      return;
    }

    const user = findUser(email.trim().toLowerCase(), password);
    if (user) {
      // Save "session" (dev-only). Replace with real auth token later.
      localStorage.setItem("hw_current_user", JSON.stringify(user));
      // redirect to main protected area (change as needed)
      navigate("/community");
    } else {
      setError("No account found with these credentials. Please sign up first.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center gap-4 mb-4">
          {logo && <img src={logo} alt="Logo" className="h-14 w-auto" />}
          <h1 className="text-3xl font-bold mt-2">Hey there! Welcome back to HerWay</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition"
          >
            Log in
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          New here?{" "}
          <Link
            to="/signup"
            className="font-medium text-gray-700 hover:text-pink-500 hover:underline"
          >
            Get started here!
          </Link>
        </p>
      </div>
    </div>
  );
}
