const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// GET PROFILE
router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

// UPDATE PROFILE
router.put("/profile", auth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { returnDocument: "after" } // ✅ MUST BE THERE
    );
    console.log("UPDATED USER:", updatedUser); // ✅ ADD THIS

    res.json(updatedUser); // ✅ return updated data
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
});

module.exports = router;