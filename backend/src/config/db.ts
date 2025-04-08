import mongoose from "mongoose";
const URI = process.env.ATLAS_URI;

export async function connectDB() {
  try {
    await mongoose.connect(URI);
    console.log("DB connected");
  } catch (error) {
    console.log("❌" + error);
  }
}
