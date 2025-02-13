import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  communities?: string[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  communities: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Community' }],
    default: [],
  },
});

export const User = model<IUser>('User', userSchema);
