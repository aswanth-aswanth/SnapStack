import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/snapstack",
  JWT_SECRET: process.env.JWT_SECRET || "yourSecretKey",
};
