import { useNavigate } from "react-router-dom";
import { FaHome, FaBell, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (

    <div className="w-64 bg-white shadow-lg p-5 rounded-r-3xl flex flex-col justify-between">

      <div>

        <h1 className="text-2xl font-bold text-teal-600 mb-10">
          MedTrack
        </h1>

        <div className="space-y-6">

          <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 cursor-pointer hover:text-teal-500"
          >
            <FaHome /> Dashboard
          </div>

          <div
            onClick={() => navigate("/notifications")}
            className="flex items-center gap-3 cursor-pointer hover:text-teal-500"
          >
            <FaBell /> Notifications
          </div>

          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 cursor-pointer hover:text-teal-500"
          >
            <FaUser /> Profile
          </div>

          <div
            onClick={() => navigate("/manage")}
            className="flex items-center gap-3 cursor-pointer hover:text-teal-500"
          >
            <FaCog /> Medicines
          </div>

        </div>

      </div>

      <div
        onClick={handleLogout}
        className="flex items-center gap-3 cursor-pointer text-red-500 hover:text-red-700 mt-10"
      >
        <FaSignOutAlt /> Logout
      </div>

    </div>
  );
}

export default Sidebar;