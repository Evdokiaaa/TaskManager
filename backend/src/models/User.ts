import mongoose from "mongoose";

const userScheme = new mongoose.Schema(
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
