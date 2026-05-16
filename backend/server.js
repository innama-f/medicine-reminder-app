require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("./cron");
require("./utils/cronJobs");

const app = express();
app.use(cors({
  origin: "https://medicine-reminder-app-ashen.vercel.app"
  credentials: true
}));
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const userRoutes = require("./routes/user");

app.use("/api/auth", authRoutes);
app.use("/api/medicine", medicineRoutes);
app.use("/api/user", userRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on 5000"));