import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleReset = async () => {

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {

      const res = await API.put("/auth/forgot-password", {
        email: form.email,
        password: form.password
      });

      alert(res.data.msg);

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.msg ||
        "Reset failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-teal-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="New Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword: e.target.value
            })
          }
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Reset Password
        </button>

      </div>
    </div>
  );
};

export default ForgotPassword;