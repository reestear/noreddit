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

export const joinCommunity = async (userId: string, communityId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.communities) user.communities.push(communityId);

  await user.populate('communities');

  return await user.save();
};
