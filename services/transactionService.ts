import { createTransactionRepo, getTransactionByIdRepo, searchTransactionsRepo, countTransactionsRepo} from "../repositories/transactionRepository";
import { ITransaction } from "../models/transactionModel";
import { SortOrder } from "mongoose";


export const createTransaction = async (data: Partial<ITransaction>): Promise<ITransaction> => {
  return await createTransactionRepo(data);
};

export const getTransactionById = async (transactionID: string): Promise<ITransaction | null> => {
  return await getTransactionByIdRepo(transactionID);
};

export const searchTransactions = async (
  filters: object,
  sorting: { [key: string]: SortOrder },
  page: number,
  pageSize: number
) => {
  const transactions = await searchTransactionsRepo(filters, sorting, page, pageSize);
  const totalCount = await countTransactionsRepo(filters);
  return { transactions, totalCount };
};
