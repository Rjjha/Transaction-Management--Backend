import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import transactionRoutes from "./routes/transactionRoute";
import programRoutes from "./routes/cronRoutes";
import connectDB from "./config/dbConfig";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config(); 
connectDB(); 

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Authorization routes
app.use("/api/v1", authRoutes);

//transaction routes
app.use("/api/v1/transaction",transactionRoutes);

app.use("/api/v1/program",programRoutes);



// REST  API for root testing
app.get("/", (req: Request, res: Response) => {
  res.send("This is flagright assignment");
});

// Start server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
