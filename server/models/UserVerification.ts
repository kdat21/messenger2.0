import { Schema, model } from "mongoose";

interface IUser {
  userId: string;
  uniqueString: string;
  createdAt: Date;
  expireAt: Date;
}

const UserVerificationSchema = new Schema<IUser>({
  userId: {
    type: String,
    required: true,
  },
  uniqueString: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expireAt: {
    type: Date,
    required: true,
  },
});

const UserVerification = model("UserVerification", UserVerificationSchema);

export default UserVerification;
