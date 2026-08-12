import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import reportRoutes from './routes/reportRoutes.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reports",reportRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "AI Medical Records API is running",
  });
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});