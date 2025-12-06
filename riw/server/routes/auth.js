import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already exists." });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashed });

    res.json({ message: "User created", user: { id: user._id, email } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    // If the useres Google account exists with no password
    if (!user.password) {
      return res.status(400).json({
        message: "This account was created using Google. Please sign in with Google."
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user: { id: user._id, email } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/firebase-login", async (req, res) => {
  const {
    uid,
    email,
    firstName,
    lastName,
    affiliation,
    researchArea,
    specificArea,
    name,
  } = req.body;

  try {
    // Try to find user in DB
    let user = await User.findOne({ email });

    // If user doesn't exist then create 
    if (!user) {
      user = await User.create({
        firebaseId: uid,
        email,
        firstName,
        lastName,
        name: name || "",
        affiliation,
        researchArea,
        specificArea,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    console.error("FIREBASE LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error." });
  }
});


router.post("/register-manual", async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      affiliation,
      researchArea,
      specificArea
    } = req.body;

    // Check if email is used
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashed,
      firstName,
      lastName,
      affiliation,
      researchArea,
      specificArea
    });

    // Create login token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Account created", token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
