import { Schema, model } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  avatarUrl?: string;
  online: boolean;
  verified: boolean;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    trim: true,
    required: true,
    max: 32,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: "",
  },
  online: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const User = model<IUser>("User", UserSchema);

export default User
