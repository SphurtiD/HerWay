// src/pages/Signup.jsx
import React, { useState } from "react";
import Stepper, { Step } from "../components/Stepper";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  // dummy usernames for check (later replace with API call)
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

  const handleComplete = () => {
    if (!email || !password || !username || usernameError) {
      alert("Please fill all fields correctly before proceeding!");
      return;
    }
    // ✅ Signup complete → now redirect to StartSurvey
    window.location.href = "/startsurvey";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-6">
      <div className="mb-6 text-center">
        <img src="/logo.png" alt="HerWay Logo" className="h-16 mx-auto" />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          Create your HerWay account 🚀
        </h2>
        <p className="text-gray-600">Just 2 quick steps and you're in!</p>
      </div>

      <Stepper
        onFinalStepCompleted={handleComplete}
        nextButtonText="Next"
        backButtonText="Back"
      >
        {/* Step 1: Email + Password */}
        <Step>
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-400 focus:ring focus:ring-pink-200"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-400 focus:ring focus:ring-pink-200"
                placeholder="••••••••"
                required
              />
            </label>
          </div>
        </Step>

        {/* Step 2: Username */}
        <Step>
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Choose a username</span>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-400 focus:ring focus:ring-pink-200"
                placeholder="Enter unique username"
                required
              />
              {usernameError && (
                <p className="mt-1 text-sm text-red-500">{usernameError}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                You can also choose a random name if you want to stay anonymous.
              </p>
            </label>
          </div>
        </Step>
      </Stepper>
    </div>
  );
}
