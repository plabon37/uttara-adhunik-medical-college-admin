import mongoose from "mongoose";

export const connectToDB = async () => {
  const dbUri = process.env.MONGODB_URI;

  if (!dbUri) {
    throw new Error("MONGODB_URI is missing");
  }

  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(dbUri);

  console.log("✅ MongoDB Connected");
};