import Transaction from "../models/transactionModel";
import { ITransaction } from "../models/transactionModel";
import { SortOrder } from "mongoose";

export const createTransactionRepo = async (data: Partial<ITransaction>): Promise<ITransaction> => {
  const newTransaction = new Transaction(data);
  return await newTransaction.save();
};

export const getTransactionByIdRepo = async (transactionID: string): Promise<ITransaction | null> => {
  return await Transaction.findOne({ transactionID });
};


export const searchTransactionsRepo = async (
  filterQuery: object,
  sortQuery: { [key: string]: SortOrder },
  page: number,
  pageSize: number
): Promise<ITransaction[]> => {
  return await Transaction.find(filterQuery)
    .sort(sortQuery)
    .skip((page - 1) * pageSize)
    .limit(pageSize);
};

// Count the total number of documents matching the filter query
export const countTransactionsRepo = async (filterQuery: object): Promise<number> => {
  return await Transaction.countDocuments(filterQuery);
};