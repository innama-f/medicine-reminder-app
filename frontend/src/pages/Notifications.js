import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { Bell } from "lucide-react";

const Notifications = () => {
  const [meds, setMeds] = useState([]);

  useEffect(() => {
    fetchMeds();
  }, []);

  const fetchMeds = async () => {
    try {
      const res = await API.get("/medicine");
      setMeds(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ⏰ CURRENT TIME
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);

  // 🔥 FILTER UPCOMING MEDICINES
  const upcoming = meds.filter((med) => med.time >= currentTime);

  return (
    <div className="flex bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 min-h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* NAVBAR */}
        

        {/* TITLE */}
        <h1 className=" flex items-center gap-2 text-2xl font-semibold mb-4">Notifications <Bell size={25} /></h1>

        {/* STATUS BOX */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-4 rounded-2xl shadow-xl mb-6 flex justify-between items-center transition-all duration-300 hover:scale-[1.02]">
          <div>
            <h2 className="font-semibold">Notifications Active</h2>
            <p className="text-sm text-gray-500">
              You will receive medicine reminders
            </p>
          </div>

          <input type="checkbox" checked readOnly className="w-6 h-6" />
        </div>

        {/* REAL NOTIFICATIONS */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] mb-6">

          {upcoming.length === 0 ? (
            <p className="text-gray-500 text-center">
              No upcoming medicines 🎉
            </p>
          ) : (
            upcoming.map((med) => (
              <div
                key={med._id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <h3 className="font-semibold">{med.name}</h3>
                  <p className="text-sm text-gray-500">
                    Take {med.doseAmount} {med.doseUnit}
                  </p>
                </div>

                <span className="text-sm text-gray-400">
                  {med.time}
                </span>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
};

export default Notifications;