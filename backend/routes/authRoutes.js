const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ================= REGISTER =================

router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      mobile,
      password: hashedPassword   // 🔥 IMPORTANT
    });

    await user.save();

    res.json({ msg: "Registered ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // 🔍 DEBUG LOGS (ADD HERE)
    console.log("Entered password:", password);
    console.log("Stored password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const token = require("jsonwebtoken").sign(
      { user: { id: user._id } },
      "secret",
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/forgot-password", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        msg: "Email not found"
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    await user.save();

    res.json({
      msg: "Password updated successfully ✅"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server Error"
    });
  }
});
module.exports = router;