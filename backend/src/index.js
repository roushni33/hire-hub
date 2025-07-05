import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../db/db.js";
import userRouter from "../routes/user.route.js";
import companyRouter from "../routes/company.route.js";
import jobRouter from "../routes/job.route.js";
import applicationRouter from "../routes/application.route.js";
import errorHandler from "../middlewares/errorHandler.js";


dotenv.config({ path: './.env' });

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
    origin: process.env.CORS_ORIGIN,
    credentials: true
}
app.use(cors(corsOption));

const PORT = process.env.PORT || 3000;
app.use("/" ,(req,res) => {
    res.send("working");
})
app.use("/api/v1/user" , userRouter);
app.use("/api/v1/company" , companyRouter);
app.use("/api/v1/job" , jobRouter);
app.use("/api/v1/application", applicationRouter);


// error Handler
app.use(errorHandler)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
