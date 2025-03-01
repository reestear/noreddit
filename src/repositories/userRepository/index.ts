import { IUser, User } from '../../models/userModel';

export const createUser = async (userData: IUser) => {
  const user = new User(userData);
  return await user.save();
};

export const getUserById = async (userId: string) => {
  return await User.findById(userId);
};

export const updateUserById = async (userId: string, userData: IUser) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  return await User.find();
};
