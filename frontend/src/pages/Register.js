import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";



const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });


  const handleRegister = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     const mobileRegex = /^[0-9]{10}$/;

     if (!emailRegex.test(form.email)) {
     return alert("Invalid Email");
     }

     if (!mobileRegex.test(form.mobile)) {
     return alert("Invalid Mobile Number");
     }
      await API.post("/auth/register", form);
      alert("Registered Successfully ✅");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Error registering ❌");
    }
  };

  return (
    <div className="flex min-h-screen">

      {/* LEFT SIDE */}
      <div className="w-1/2 bg-gradient-to-r from-blue-700 to-blue-500 text-white flex flex-col justify-center p-16">

        <h1 className="text-4xl font-bold mb-4">
          MedTrack
        </h1>

        <h2 className="text-3xl font-semibold mb-6">
          Manage Your Medicines Easily 💊
        </h2>

        <p className="text-lg mb-6">
          Track medicines, get reminders, and stay healthy with smart notifications.
        </p>

        <ul className="space-y-2 text-sm">
          <li>✔ Smart reminders</li>
          <li>✔ Easy tracking</li>
          <li>✔ Health monitoring</li>
        </ul>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">

        <div className="bg-white p-8 rounded-xl shadow-lg w-96">

          <h2 className="text-2xl font-semibold mb-6 text-center">
            Create Account
          </h2>

          <input
            placeholder="Enter Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border p-2 mb-3 rounded"
          />

          <input
            placeholder="Enter Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full border p-2 mb-3 rounded"
          />  

           <input
           type="text"
           placeholder="Mobile Number"
           value={form.mobile}
            onChange={(e) =>
            setForm({ ...form, mobile: e.target.value })
           }
           className="w-full p-3 rounded-lg border mb-4"
            />


          <input
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full border p-2 mb-4 rounded"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Register;