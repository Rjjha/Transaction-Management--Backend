import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

/**
 * Register controller
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const message = await registerUser(name, email, password);
    res.status(201).json({ message });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    res.status(400).json({ message: errorMessage });
  }
};

/**
 * Login controller
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    res.status(400).json({ message: errorMessage });
  }
};
