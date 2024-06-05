import express from "express";
import mongoose from "mongoose";
import NodeCache from "node-cache";
import { config } from "dotenv";
import { ErrorMiddleware } from "./middleware/error.js";
import cors from "cors";
import cookieParser from "cookie-parser";
// routes importing
import UserRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

config({
  path: "./.env",
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(bodyparse.json());
// app.use(bodyparse.urlencoded({ extended: true }));

const PORT = process.env.PORT || 6000;
const MONGOURL = process.env.URL || "";

export const myCache = new NodeCache();

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server is Running on Port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);

app.use("/uploads", express.static("uploads"));
app.use(ErrorMiddleware);
