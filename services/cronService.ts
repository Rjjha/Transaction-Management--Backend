import cron from "node-cron";
import { createTransactionRepo } from "../repositories/transactionRepository";
import slugify from "slugify";

let isCronRunning = false; // Tracks if the CRON job is active
let cronHitCount = 0; // Tracks the number of times the CRON job has executed
const CRON_HIT_LIMIT = 30; // Limit for CRON job executions
let cronTask: any = null; // Reference to the CRON task

// Generate random transaction payload
const generateRandomPayload = () => {
  const randomAmount = Math.floor(Math.random() * 1000) + 100; // Random amount between 100 and 1100
  const descriptions = ["for pens", "for groceries", "for books", "for rent"];
  const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
  const userIds = ["user1", "user2", "user3"];
  const userNames = ["Alice", "Bob", "Charlie"];
  const timestamp = Date.now();
  const randomString = Math.random().toString(10).substring(2, 5).toUpperCase();
  const slug=slugify(randomDescription , { lower: true, strict: true });
  return {
    amount: randomAmount,
    description: randomDescription,
    userId: userIds[Math.floor(Math.random() * userIds.length)],
    userName: userNames[Math.floor(Math.random() * userNames.length)],
    transactionID :`TXN-${timestamp}-${randomString}`,
    slug: slug
  };
};

// Start the CRON job
export const startCronJob = async () => {
  if (isCronRunning) {
    throw new Error("CRON Job is already running");
  }

  cronTask = cron.schedule("* * * * * *", async () => {
    try {
      if (cronHitCount >= CRON_HIT_LIMIT) {
        stopCronJob();
        console.log("CRON hit limit reached. Stopping the CRON job.");
        return;
      }

      const payload = generateRandomPayload();
      await createTransactionRepo(payload); 
      cronHitCount++;
      console.log(`CRON Job executed. Hit count: ${cronHitCount}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      console.error(errorMessage);
    }
  });

  isCronRunning = true;
  console.log("CRON Job started successfully.");
};

// Stop the CRON job
export const stopCronJob = () => {
  if (cronTask) {
    cronTask.stop();
    cronTask = null;
  }

  isCronRunning = false;
  cronHitCount = 0; // Reset the hit count
  console.log("CRON Job stopped successfully.");
  return;
};