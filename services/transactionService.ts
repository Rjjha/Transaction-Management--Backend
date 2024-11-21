import { createTransactionRepo, getTransactionByIdRepo } from "../repositories/transactionRepository";
import { ITransaction } from "../models/transactionModel";

export const createTransaction = async (data: Partial<ITransaction>): Promise<ITransaction> => {
  return await createTransactionRepo(data);
};

export const getTransactionById = async (transactionID: string): Promise<ITransaction | null> => {
  return await getTransactionByIdRepo(transactionID);
};
