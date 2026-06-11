import mongoose from "mongoose";
import { isMockMode } from "@/utils/mockMode";

async function connectDB() {
  if (isMockMode()) return;
  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB.");
}

export default connectDB;
