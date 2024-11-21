import mongoose, { Schema, Document } from "mongoose";
import slugify from "slugify";

// Define an interface for the transaction model that extends Mongoose's Document
export interface ITransaction extends Document {
  transactionID: string;
  amount: number;
  description: string;
  slug: string;
  dateTime: Date;
  userId:string;
  userName:string;
}

// Defining the Mongoose schema for transactions
const transactionSchema = new Schema<ITransaction>(
  {
    transactionID: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true },
    dateTime: { type: Date, default: Date.now },
    userId: { type: String, required: true },
    userName : { type: String, required: true }
  },
  { timestamps: true }
);


// Adding indexes to the schema
transactionSchema.index({ transactionID: 1 }, { unique: true });
transactionSchema.index({ dateTime: -1 });
transactionSchema.index({ slug: "text" }); 

// Exporting the Mongoose model
const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
