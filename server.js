require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const jobRoutes = require("./routes/jobs");
const recommendationRoutes = require("./routes/recommendations");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.get("/", (req, res) => {
  res.send("Job Match API is running");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
