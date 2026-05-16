import React, { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import { CircleUserRound, Pencil } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    blood: "",
    height: "",
    weight: "",
    disease: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/user/profile");
      setUser({ ...res.data});

      setForm({
        name: res.data.name || "",
        dob: res.data.dob || "",
        gender: res.data.gender || "",
        blood: res.data.blood || "",
        height: res.data.height || "",
        weight: res.data.weight || "",
        disease: res.data.disease || ""
      });

    } catch (err) {
      console.log(err);
    }
  };

  const updateProfile = async () => {
  try {
    const res = await API.put("/user/profile", form);
    console.log("FRONTEND RECEIVED:", res.data);

    setUser({ ...res.data});   // ✅ UPDATE UI IMMEDIATELY
    setEdit(false);

    alert("Profile Updated ✅");

  } catch (err) {
    console.log(err);
    alert("Error updating profile ❌");
  }
};

  if (!user) {
    return <h2 className="p-5">Loading profile...</h2>;
  }

  return (
    <div className="flex bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">
        

        <h1 className=" flex items-center gap-2 text-2xl mb-6 font-semibold">My Profile <CircleUserRound size={25} /></h1>

         <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02]">
          {!edit ? (
            <>
              {/* NAME */}
              <h2 className="text-2xl font-bold mb-6">{user.name}</h2>

              {/* PERSONAL INFO */}
              <h3 className="text-blue-600 font-semibold mb-2">
                Personal Information
              </h3>

              <div className="space-y-2 mb-6 text-gray-700">
                <p><b>Email:</b> {user.email}</p>
                <p><b>Date of Birth:</b> {user.dob || "-"}</p>
                <p><b>Gender:</b> {user.gender || "-"}</p>
                <p><b>Blood Group:</b> {user.blood || "-"}</p>
              </div>

              {/* HEALTH INFO */}
              <h3 className="text-green-600 font-semibold mb-2">
                Health Details
              </h3>

              <div className="space-y-2 text-gray-700 mb-6">
                <p><b>Height:</b> {user.height || "-"} cm</p>
                <p><b>Weight:</b> {user.weight || "-"} kg</p>
                <p><b>Health Condition:</b> {user.disease || "-"}</p>
              </div>

              <button
                onClick={() => setEdit(true)}
                className=" flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all"
              >
                Edit Profile
                <Pencil size={20} />
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="border p-2 w-full mb-2 rounded"
              />

              <input
                type="date"
                value={form.dob}
                onChange={(e) =>
                  setForm({ ...form, dob: e.target.value })
                }
                className="border p-2 w-full mb-2 rounded"
              />

              <select
                value={form.gender}
                onChange={(e) =>
                  setForm({ ...form, gender: e.target.value })
                }
                className="border p-2 w-full mb-2 rounded"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <input
                placeholder="Blood Group"
                value={form.blood}
                onChange={(e) =>
                  setForm({ ...form, blood: e.target.value })
                }
                className="border p-2 w-full mb-2 rounded"
              />

              <input
                placeholder="Height (cm)"
                value={form.height}
                onChange={(e) =>
                  setForm({ ...form, height: e.target.value })
                }
                className="border p-2 w-full mb-2 rounded"
              />

              <input
                placeholder="Weight (kg)"
                value={form.weight}
                onChange={(e) =>
                  setForm({ ...form, weight: e.target.value })
                }
                className="border p-2 w-full mb-2 rounded"
              />

              <input
                placeholder="Health Condition"
                value={form.disease}
                onChange={(e) =>
                  setForm({ ...form, disease: e.target.value })
                }
                className="border p-2 w-full mb-4 rounded"
              />

              <button
                onClick={updateProfile}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>

              <button
                onClick={() => setEdit(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;