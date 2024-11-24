import { Request, Response } from "express";
import { startCronJob, stopCronJob } from "../services/cronService";

export const controlCronJobController = async (req: Request, res: Response): Promise<void> => {
  const { program } = req.query;

  try {
    if (program === "1") {
      await startCronJob();
      res.status(200).json({ message: "CRON Job started successfully." });
    } else if (program === "0") {
      stopCronJob();
      res.status(200).json({ message: "CRON Job stopped successfully." });
    } else {
      res.status(400).json({ message: "Invalid program value. Use 1 to start or 0 to stop the CRON Job." });
    }
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred." });
  }
};
