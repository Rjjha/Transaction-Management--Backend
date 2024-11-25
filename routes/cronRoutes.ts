import express from "express";
import { controlCronJobController } from "../controller/cronController";
import { authMiddleware } from "../middleware/authMiddleware";
import { getCronStatus } from "../services/cronService";
const router = express.Router();

// GET : api/v1/program?pragram=0  stop the cron
// GET : api/v1/program?program=1  start the cron
router.get("/", authMiddleware, controlCronJobController);

router.get("/status", authMiddleware, (req, res) => {
  try {
    const status = getCronStatus();
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch CRON status" });
  }
});

export default router;
