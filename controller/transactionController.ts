import { Request, Response } from "express";
import { createTransaction, getTransactionById, searchTransactions,generateTransactionReport } from "../services/transactionService";
import slugify from "slugify";


export const createTransactionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, description, userId, userName} = req.body;

    if (!amount || !description || !userId || !userName) {
      res.status(400).json({ error: "Required fields: amount, description, userId, userName." });
      return; 
    }
    const timestamp = Date.now();
    const randomString = Math.random().toString(10).substring(2, 5).toUpperCase();
    const slug=slugify(description, { lower: true, strict: true });
    const newTransaction = {
      amount,
      description,
      userId,
      userName,
      transactionID :`TXN-${timestamp}-${randomString}`,
      slug: slug
    };

    const result = await createTransaction(newTransaction);
    res.status(201).json({ message: "Transaction created successfully.", data: result });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    res.status(500).json({ message: errorMessage });
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
        res.status(500).json({ message: errorMessage });
    }
  };

  export const searchTransactionsController = async (req: Request, res: Response) => {
    try {
      const { page, sortAmount, sortTime, userId, userName, dateStart, dateEnd } = req.query;
      const { description, minAmount, maxAmount } = req.body;
  
      // Convert query parameters to appropriate data types
      const pageNumber = parseInt(page as string, 10) || 1;
      const pageSizeNumber = 5; 
      const sortAmountValue = parseInt(sortAmount as string, 10); 
      const sortTimeValue = parseInt(sortTime as string, 10); 
  
      // Construct the filter query dynamically
      const filters: any = {};
      if (userId) filters.userId = userId;
      if (userName) filters.userName = { $regex: userName, $options: "i" };
      if (description) filters.slug = { $regex: description, $options: "i" };
      if (dateStart || dateEnd) {
        filters.dateTime = {
          ...(dateStart && { $gte: new Date(dateStart as string) }),
          ...(dateEnd && { $lte: new Date(dateEnd as string) }),
        };
      }
      if (minAmount || maxAmount) {
        filters.amount = {
          ...(minAmount && { $gte: parseFloat(minAmount) }),
          ...(maxAmount && { $lte: parseFloat(maxAmount) }),
        };
      }
  
      // Construct the sorting query dynamically
      const sorting: any = {};
      if (!isNaN(sortAmountValue)) sorting.amount = sortAmountValue === 0 ? 1 : -1;
      if (!isNaN(sortTimeValue)) sorting.dateTime = sortTimeValue === 0 ? 1 : -1;
  
      // Fetch transactions from the service
      const result = await searchTransactions(filters, sorting, pageNumber, pageSizeNumber);
  
      // Send response
      res.status(200).json({
        data: result.transactions,
        totalCount: result.totalCount,
        currentPage: pageNumber,
        totalPages: Math.ceil(result.totalCount / pageSizeNumber),
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      res.status(500).json({ message: errorMessage });
    }
  };

  export const generateTransactionReportController = async (req: Request, res: Response) => {
    try {
      const { totalAmount, dateTimeStart, dateTimeEnd } = req.query;
  
      // Construct filter based on query parameters
      const filters: any = {};
      if (dateTimeStart || dateTimeEnd) {
        filters.dateTime = {
          ...(dateTimeStart && { $gte: new Date(dateTimeStart as string) }),
          ...(dateTimeEnd && { $lte: new Date(dateTimeEnd as string) }),
        };
      }
  
      // Call the service to generate the report
      const report = await generateTransactionReport(filters, !!totalAmount);
  
      res.status(200).json({
        success: true,
        report,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      res.status(500).json({ message: errorMessage });
    }
  };
  