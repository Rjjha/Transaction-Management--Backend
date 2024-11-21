import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../models/userModel";
import { createUser, findUserByEmail } from "../repositories/userRepository";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: number;
}

/**
 * Register a new user
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<string>} - Success message
 */
export const registerUser = async (name: string, email: string, password: string): Promise<string> => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser({ name, email, password: hashedPassword, role: 0 } as IUser);

  return "User registered successfully.";
};

/**
 * Login a user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<string>} - JWT token
 */
export const loginUser = async (email: string, password: string): Promise<string> => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role } as CustomJwtPayload,
    process.env.JWT_SECRET!,
    { expiresIn: "5h" }
  );

  return token;
};
