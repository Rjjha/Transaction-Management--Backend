import Transaction from "../models/transactionModel";
import { ITransaction } from "../models/transactionModel";

export const createTransactionRepo = async (data: Partial<ITransaction>): Promise<ITransaction> => {
  const newTransaction = new Transaction(data);
  return await newTransaction.save();
};

export const getTransactionByIdRepo = async (transactionID: string): Promise<ITransaction | null> => {
  return await Transaction.findOne({ transactionID });
};
