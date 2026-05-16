import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { BriefcaseMedicalIcon, CalendarHeart, CheckCircle2, Clock3, Heart, LayoutDashboard,PackageCheckIcon,Pill, Sparkle } from "lucide-react";

const healthTips = [

  "🍊 Guava contains more Vitamin C than oranges and helps strengthen immunity naturally.",

  "🍇 Raisins are rich in iron and may help improve iron deficiency and low energy levels.",

  "🍌 Bananas help maintain healthy blood pressure because they are high in potassium.",

  "🥕 Carrots contain beta-carotene, which the body converts into Vitamin A for better eyesight.",

  "🥜 Almonds are rich in healthy fats and help improve memory and brain function.",

  "🍅 Tomatoes contain lycopene, a powerful antioxidant that supports heart health and skin protection.",

  "🧄 Garlic has natural antibacterial properties and may help boost immunity and heart health.",

  "🥬 Spinach is packed with iron, calcium, and vitamins that support strong bones and healthy blood.",

  "🍯 Honey has natural soothing properties and may help relieve sore throat and cough symptoms.",

  "🥛 Curd/Yogurt contains probiotics that improve digestion and support gut health.",

  "🌰 Walnuts are rich in omega-3 fatty acids which are beneficial for brain and heart health.",

  "🍎 Apples contain fiber that helps improve digestion and keeps you full for longer periods.",

  "☀️ Morning sunlight helps the body naturally produce Vitamin D for stronger bones.",

  "💧 Drinking enough water daily helps improve skin health, digestion, and energy levels.",

  "🍉 Watermelon helps keep the body hydrated because it contains over 90% water.",

  "🍋 Lemon water can help improve hydration and provides a natural source of Vitamin C.",

  "🥚 Eggs are a high-quality protein source and contain nutrients important for brain health.",

  "😴 Getting 7–8 hours of sleep daily improves memory, immunity, and overall health."

];
const Dashboard = () => {
  const navigate = useNavigate();
  const [meds, setMeds] = useState([]);
  const [tipIndex, setTipIndex] = useState(0);

 

  useEffect(() => {
    fetchMeds();
  }, []);

  useEffect(() => {

  const interval = setInterval(() => {

    setTipIndex((prev) =>
      (prev + 1) % healthTips.length
    );

  }, 5000);

  return () => clearInterval(interval);

}, []);

  const fetchMeds = async () => {
    try {
      const res = await API.get("/medicine");
      setMeds(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const markTaken = async (id) => {
  try {
    await API.put(`/medicine/${id}`, { status: "taken" });
    fetchMeds(); // refresh data
  } catch (err) {
    console.log(err);
  }
};

  const takenCount = meds.filter(m => m.status === "taken").length;
  const pendingCount = meds.length - takenCount;
   
  const getStockStatus = (daysLeft) => {

  if (daysLeft > 7) {
    return "✅ Plenty";
  }

  if (daysLeft >= 4) {
    return "⚠ Running Low";
  }

  return "❌ Refill Now";
};

  return (
    <div className="flex bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 min-h-screen">
      {/* ✅ SIDEBAR (same as other pages) */}
      <Sidebar />

      <div className="flex-1 p-6">

        {/* TOP NAVBAR */}
        

        {/* GREETING */}
        <div className="mb-6">
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            Hello! 
             <Sparkle size={25} />
          </h1>
          <p className="text-gray-600">
            Here’s what's happening with your health today.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mb-6">

          <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] mb-6">
            <p className=" flex items-center gap-2 text-gray-500">Today's Medicines <Pill size={20} /> </p>
            <h2 className="text-2xl font-bold">{meds.length}</h2>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] mb-6">
            <p className="flex items-center gap-2 text-gray-500">Taken <CheckCircle2 size={20} /></p>
            <h2 className="text-2xl font-bold text-green-600">
              {takenCount}
            </h2>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] mb-6">
            <p className="flex items-center gap-2 text-gray-500">Pending <Clock3 size={20} /></p>
            <h2 className="text-2xl font-bold text-yellow-500">
              {pendingCount}
            </h2>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] mb-6">
            <p className="flex items-center gap-2 text-gray-500">Total Medicines <BriefcaseMedicalIcon size={20} /></p>
            <h2 className="text-2xl font-bold">
              {meds.length}
            </h2>
          </div>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-3 gap-6">

          {/* LEFT SECTION */}
          <div className="col-span-2">

            {/* TODAY SCHEDULE */}
            <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] mb-6">

              <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                Today’s Schedule
                 <CalendarHeart size={20} />
                
              </h2>
{meds.map((med) => (
  <div
    key={med._id}
    className="flex justify-between items-center border-b py-3"
  >
    {/* LEFT */}
    <div>
      <p className="font-bold">{med.name}</p>
      <p className="text-sm text-gray-500">
        {med.doseAmount} {med.doseUnit} | {med.time}
      </p>
    </div>

    <div className="mt-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl p-3 shadow-sm">

  <p className="flex items-center gap-2 text-sm text-gray-500 mb-1">
    Medicine Availability
     <PackageCheckIcon size={22} />
  </p>

  <p
    className={`text-sm font-bold ${
      med.daysLeft > 7
        ? "text-emerald-600"
        : med.daysLeft >= 4
        ? "text-amber-500"
        : "text-red-500"
    }`}
  >
    {getStockStatus(med.daysLeft)}
  </p>

</div>
    

    {/* RIGHT */}
    <div className="flex items-center gap-3">

      {/* STATUS */}
      <span
        className={`px-3 py-1 rounded-full text-sm ${
          med.status === "taken"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        {med.status || "Pending"}
      </span>

      {/* ✅ BUTTON BACK */}
      {med.status !== "taken" && (
        <button
          onClick={() => markTaken(med._id)}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all"
        >
          Mark Taken
        </button>
      )}

    </div>
  </div>
   


))} 

              <button
  onClick={() => navigate("/manage")}
  className="mt-4 w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-50"
>
  + Add Medicine
</button>
            </div>

           
          </div>

          {/* RIGHT SECTION */}
          <div>

            {/* HEALTH TIP */}
            <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] mb-6">

              <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
                <Heart size={22} />
               Health Tip
              </h2>

              <p className="text-gray-600">
  {healthTips[tipIndex]}
</p>

            </div>

            {/* PROGRESS */}
            <div className="bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] mb-6">

              <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
                <LayoutDashboard size={22} />
          
                 Monthly Progress
                
              </h2>

              <p className="text-2xl font-bold mb-2">
                {meds.length
                  ? Math.round((takenCount / meds.length) * 100)
                  : 0}
                %
              </p>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{
                    width: `${
                      meds.length
                        ? (takenCount / meds.length) * 100
                        : 0
                    }%`
                  }}
                ></div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;