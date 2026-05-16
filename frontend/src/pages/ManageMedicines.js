import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { messaging, getToken } from "../firebase";
import { ClipboardPlus,Pill, Plus, Trash2 } from "lucide-react";

const ManageMedicines = () => {
  const [meds, setMeds] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    doseAmount: "",
    doseUnit: "",
    frequency: "",
    time: "",
    daysLeft: "",
  });

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

  const addMedicine = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BKcXwEyF1keeo2pAcVlU3hPQ1vQ1hMnjorPR8HkGu4Th24PuG0-QrDX0MEhUHKXjZ5PEV1SgDPHfbdQaB8yqZEk"
      
    });

    console.log("TOKEN:", token); // ✅ check

    await API.post("/medicine", {
      ...form,
      token: token   // ✅ SEND TOKEN
    });

    alert("Medicine added");
    fetchMeds();

  } catch (err) {
    console.log(err);
  }
};

  const deleteMedicine = async (id) => {
    try {
      await API.delete(`/medicine/${id}`);
      fetchMeds();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleReminder = async (id, current) => {
    try {
      await API.put(`/medicine/${id}`, { reminder: !current });
      fetchMeds();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 min-h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-6">
        <Navbar search={search} setSearch={setSearch} />

        <h1 className="text-2xl font-semibold mb-6">Manage Medicines</h1>

        {/* ADD MEDICINE CARD */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] mb-6">

          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">Add New Medicine  <ClipboardPlus size={22} /></h2>

          <div className="grid grid-cols-2 gap-4">

            <input
              placeholder="Medicine Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="border p-3 rounded-lg"
            />
            <div className="flex gap-3 mb-4">

  <input
    type="number"
    placeholder="Dose Amount"
    value={form.doseAmount}
    onChange={(e) =>
      setForm({
        ...form,
        doseAmount: e.target.value
      })
    }
    className="border p-3 rounded-lg w-1/2"
  />

  <select
    value={form.doseUnit}
    onChange={(e) =>
      setForm({
        ...form,
        doseUnit: e.target.value
      })
    }
    className="border p-3 rounded-lg w-1/2"
  >
    <option value="">
      Select Unit
    </option>

    <option value="mg">mg</option>

    <option value="ml">ml</option>

    <option value="drops">drops</option>

    <option value="units">units</option>

    <option value="tablets">tablets</option>

  </select>

</div>

            <select
              value={form.frequency}
              onChange={(e) =>
                setForm({ ...form, frequency: e.target.value })
              }
              className="border p-3 rounded-lg"
            >
              <option value="">Select Frequency</option>
              <option>Once a day</option>
              <option>Twice a day</option>
              <option>Thrice a day</option>
            </select>
            <input
  type="number"
  placeholder="Days Medicine Available"
  value={form.daysLeft}
  onChange={(e) =>
    setForm({
      ...form,
      daysLeft: e.target.value
    })
  }
  className="border border-gray-200 bg-white/70 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
/>

            <input
              type="time"
              value={form.time}
              onChange={(e) =>
                setForm({ ...form, time: e.target.value })
              }
              className="border p-3 rounded-lg"
            />
          </div>

          <button
            onClick={addMedicine}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all"
          >
             <Plus size={18} />
            Add Medicine
          </button>
        </div>

        {/* MEDICINE LIST */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02]">

          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">Your Medicines <Pill size={22} /></h2>

          {meds.length === 0 ? (
            <p className="text-gray-500">No medicines added</p>
          ) : (
            meds
  .filter(
    (med) =>
      med.name.toLowerCase().includes(search.toLowerCase()) ||
     `${med.doseAmount} ${med.doseUnit}`
  .toLowerCase()
  .includes(search.toLowerCase())
  )
  .map((med) => (
              <div
                key={med._id}
                className="flex justify-between items-center border-b py-4"
              >
                {/* LEFT */}
                <div>
                  <p className="font-bold">{med.name}</p>
                  <p className="text-sm text-gray-500">
                    {med.doseAmount} {med.doseUnit} • {med.frequency}
                  </p>
                  <p className="text-sm text-gray-400">
                    Time: {med.time}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

                  {/* TOGGLE */}
                  <button
                    onClick={() =>
                      toggleReminder(med._id, med.reminder)
                    }
                    className={`px-4 py-2 rounded-lg text-white ${
                      med.reminder
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {med.reminder ? "ON" : "OFF"}
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteMedicine(med._id)}
                    className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-red-500 text-white px-4 py-2 rounded-xl shadow-md hover:opacity-90 transition-all duration-300"
                  >
                    Delete
                     <Trash2 size={18} />
                  </button>

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMedicines;