import dotenv from "dotenv";
dotenv.config();

import connectDB from "../db/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});