import mongoose from "mongoose";
import colors from "colors";

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL is not defined in environment variables.");
    }

    await mongoose.connect(process.env.DB_URL);
    console.log(`Database is connected `);
  } catch (error: any) {
    console.error(`Error occurred at MongoDB: ${error.message}`);
  }
};

export default connectDB;
