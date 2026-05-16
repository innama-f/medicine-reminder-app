const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");
const auth = require("../middleware/auth");

// 📥 GET ALL MEDICINES
router.get("/", auth, async (req, res) => {
  const meds = await Medicine.find({ user: req.user.id });
  res.json(meds);
});

// ➕ ADD MEDICINE
router.post("/", auth, async (req, res) => {
  try {
    const newMed = new Medicine({
      name: req.body.name,
      doseAmount: req.body.doseAmount,
      doseUnit: req.body.doseUnit,
      frequency: req.body.frequency,
      time: req.body.time,
      daysLeft: req.body.daysLeft,
      status: "pending",
      reminder: true,
      token: req.body.token,
      user: req.user.id   // 🔥 CRITICAL
    });

    const saved = await newMed.save();
    res.json(saved);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error adding medicine" });
  }
});


// ❌ DELETE MEDICINE
router.delete("/:id", auth, async (req, res) => {
  await Medicine.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// ✅ UPDATE (MARK TAKEN / MISSED)
router.put("/:id", auth, async (req, res) => {
  const updated = await Medicine.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updated) return res.status(404).json({ msg: "Not found" });
  if (req.body.status === "taken") {

  updated.lastReminder = null;

  await updated.save();
}

  res.json(updated);
});

module.exports = router;