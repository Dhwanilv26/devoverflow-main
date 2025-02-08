import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    console.log("MISSING MONGODB URL");
    return;
  }

  if (isConnected) {
    console.log("Mongodb is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Dev-Overflow",
    });
    isConnected = true;
    console.log("Mongodb is connected");
  } catch (error) {
    console.log("Mongodb connection failed", error);
  }
};
