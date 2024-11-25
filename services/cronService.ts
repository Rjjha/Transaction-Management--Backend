import { CronJob } from "cron";
import { createTransactionRepo } from "../repositories/transactionRepository";
import slugify from "slugify";

let cronJob: CronJob | null = null;
let requestCount = 0;
const CRON_HIT_LIMIT = 6;

const generateRandomPayload = () => {
  const randomAmount = Math.floor(Math.random() * 1000) + 100;
  const descriptions = ["for pens", "for groceries", "for books", "for rent"];
  const randomDescription =
    descriptions[Math.floor(Math.random() * descriptions.length)];
  const userIds = ["user1", "user2", "user3"];
  const userNames = ["Alice", "Bob", "Charlie"];
  const timestamp = Date.now();
  const randomString = Math.random().toString(10).substring(2, 5).toUpperCase();
  const slug = slugify(randomDescription, { lower: true, strict: true });
  return {
    amount: randomAmount,
    description: randomDescription,
    userId: userIds[Math.floor(Math.random() * userIds.length)],
    userName: userNames[Math.floor(Math.random() * userNames.length)],
    transactionID: `TXN-${timestamp}-${randomString}`,
    slug: slug,
  };
};

export const startCronJob = () => {
  if (cronJob) {
    console.log("CRON Job is already running.");
    return;
  }

  requestCount = 0;

  cronJob = new CronJob(
    "* * * * * *",
    async () => {
      if (requestCount >= CRON_HIT_LIMIT) {
        console.log("CRON Job limit exceeded. Stopping the job.");
        stopCronJob();
        return;
      }

      try {
        const payload = generateRandomPayload();
        await createTransactionRepo(payload);
        requestCount++;
        console.log(`CRON Job executed. Request count: ${requestCount}`);
      } catch (error) {
        console.error(
          "Error in CRON job execution:",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    },
    null,
    true,
    "America/Los_Angeles"
  );

  console.log("CRON Job started successfully.");
};

export const stopCronJob = () => {
  if (!cronJob) {
    console.log("No CRON Job is currently running.");
    return;
  }

  cronJob.stop();
  cronJob = null;
  requestCount = 0;
  console.log("CRON Job stopped successfully.");
};

// Get the current status of the CRON job
export const getCronStatus = () => {
  return {
    isRunning: cronJob ? true : false,
    hitCount: requestCount,
    remainingExecutions: Math.max(CRON_HIT_LIMIT - requestCount, 0),
  };
};
