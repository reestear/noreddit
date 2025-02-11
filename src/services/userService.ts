import { IUser, User } from '../models/userModel';

export const createUser = async (userData: IUser) => {
  const user = new User(userData);
  return await user.save();
};

export const getUserById = async (userId: string) => {
  return await User.findById(userId);
};

export const getAllUsers = async () => {
  return await User.find();
};
