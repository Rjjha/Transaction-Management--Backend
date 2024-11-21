import { Request, Response } from "express";
import { createTransaction, getTransactionById } from "../services/transactionService";
import slugify from "slugify";


export const createTransactionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, description, receiver } = req.body;

    if (!amount || !description || !receiver) {
      res.status(400).json({ error: "Required fields: amount, description, receiver." });
      return; // Ensure we stop execution after sending the response
    }
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
    const slug=slugify(description, { lower: true, strict: true });
    const newTransaction = {
      amount,
      description,
      receiver,
      transactionID :`TXN-${timestamp}-${randomString}`,
      slug: slug
    };

    const result = await createTransaction(newTransaction);
    res.status(201).json({ message: "Transaction created successfully.", data: result });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    res.status(400).json({ message: errorMessage });
  }
};

export const getTransactionByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { transactionID } = req.params;
  
      const result = await getTransactionById(transactionID);
  
      if (!result) {
        res.status(404).json({ error: "Transaction not found." });
        return; 
      }
  
      res.status(200).json({ data: result });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        res.status(400).json({ message: errorMessage });
    }
  };
  