 import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "../routes/user.route.js";
import companyRouter from "../routes/company.route.js";
import jobRouter from "../routes/job.route.js";
import applicationRouter from "../routes/application.route.js";
import errorHandler from "../middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Error Handler
app.use(errorHandler);

export default app;