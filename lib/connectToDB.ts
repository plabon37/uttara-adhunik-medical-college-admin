import mongoose from "mongoose";

export const connectDB = async () => {
  const dbUri = process.env.MONGODB_URI as string;
  if (!dbUri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }
  await mongoose
    .connect(dbUri)
    .then(() => {
      console.log("MongoDB connected");
      console.log("Database:", mongoose.connection.name);
      console.log("Host:", mongoose.connection.host);
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};