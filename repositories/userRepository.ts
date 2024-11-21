import User, { IUser } from "../models/userModel";

/**
 * Create a new user
 * @param {IUser} userData - User data
 * @returns {Promise<IUser>} - Newly created user
 */
export const createUser = async (userData: IUser): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};

/**
 * Find a user by email
 * @param {string} email - User email
 * @returns {Promise<IUser | null>} - User or null if not found
 */
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};
