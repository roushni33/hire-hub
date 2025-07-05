import dotenv from "dotenv";
dotenv.config();

import connectDB from "../db/db.js";
import app from "./app.js";

await connectDB();

export default app;