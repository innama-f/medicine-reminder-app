import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { generateToken } from "./firebase";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ManageMedicines from "./pages/ManageMedicines";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";

function App() {

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
    generateToken();
    
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage" element={<ManageMedicines />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;