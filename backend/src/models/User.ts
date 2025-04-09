import mongoose from "mongoose";

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
  profileImage?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const userScheme = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
    profileImage: { type: String, default: null },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userScheme);
