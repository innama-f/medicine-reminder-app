import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");
      navigate("/dashboard");

    } catch (err) {
      alert("Wrong email or password ❌");
    }
  };

 

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* LEFT SIDE */}
      <div className="w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-12 flex flex-col justify-between rounded-r-3xl">

        <div>
          <h1 className="text-3xl font-bold mb-2">💊 MedTrack</h1>
          <p className="text-sm opacity-80">Your Health, Our Reminder ❤️</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold mb-4">
            Never Miss <br /> A Medicine Again
          </h2>

          <p className="opacity-80 mb-6">
            MedTrack helps you manage your medicines, set reminders,
            and stay healthy every day.
          </p>

          <div className="space-y-4">

            <div>🔔 Smart Reminders</div>
            <div>💊 Manage Medicines</div>
            <div>📊 Health Dashboard</div>
            <div>🔒 Secure & Private</div>

          </div>
        </div>

        <div className="text-sm opacity-70">
          Your health data is safe with us
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex items-center justify-center">

        <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">

          <h2 className="text-3xl font-bold mb-2 text-center">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-center mb-6">
            Please login to your account
          </p>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-3 w-full mb-4 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter your password"
            className="border p-3 w-full mb-4 rounded-lg"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>

        <p
  onClick={() => navigate("/forgot-password")}
  className="text-blue-600 mt-4 cursor-pointer hover:underline text-center"
>
  Forgot Password?
</p>

          {/* SIGNUP */}
          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Sign up
            </span>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;