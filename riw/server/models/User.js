import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firebaseId: String,

  name: String,
  firstName: String,
  lastName: String,

  affiliation: String,
  researchArea: String,
  specificArea: String,

  role: { type: String, default: "user" },

  createdAt: { type: Date, default: Date.now },
});


export default mongoose.model("User", userSchema);
