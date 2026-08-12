import express from "express";
import MedicalReports from "../models/MedicalReports.js";
import upload from "../middleware/upload.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const reports = await MedicalReports.find().sort({
      reportDate: -1,
    });

    res.json(reports);
  } catch (error) {
    console.error("FETCH REPORTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch reports",
      error: error.message,
    });
  }
});

router.post("/", upload.single("report"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Report file is required",
      });
    }

    const report = await MedicalReports.create({
      title: req.body.title,
      reportType: req.body.reportType,
      reportDate: req.body.reportDate,
      fileName: req.file.originalname,
      filePath: req.file.path,
    });

    res.status(201).json({
      message: "Report uploaded successfully",
      report,
    });
  } catch (error) {
    console.error("UPLOAD REPORT ERROR:", error);

    res.status(500).json({
      message: "Failed to upload report",
      error: error.message,
    });
  }
});

export default router;