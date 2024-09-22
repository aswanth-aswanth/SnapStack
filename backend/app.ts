import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes";
import imageRoutes from "./routes/imageRoutes";
import { connectDB } from "./config/db";
import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();

connectDB();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);

app.use(errorMiddleware);

export default app;
