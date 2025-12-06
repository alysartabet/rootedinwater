import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import searchRoute from "./routes/search.js";
import latestRoute from "./routes/latest.js";
import authRoute from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

// Routes
app.use("/api/search", searchRoute);
app.use("/api/latest", latestRoute);
app.use("/api/auth", authRoute);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
