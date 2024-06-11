import express from "express";
import mongoose from "mongoose";
import NodeCache from "node-cache";
import { config } from "dotenv";
import { ErrorMiddleware } from "./middleware/error.js";
import Stripe from "stripe";
import cors from "cors";
import cookieParser from "cookie-parser";
// routes importing
import UserRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dashboardRoutes from "./routes/statRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

config({
  path: "./.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
// app.use(bodyparse.json());
// app.use(bodyparse.urlencoded({ extended: true }));

const PORT = process.env.PORT || 6000;
const MONGOURL = process.env.URL || "";
const stripeKey = process.env.STRIPE_KEY || "";

export const stripe = new Stripe(stripeKey);
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
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.use("/uploads", express.static("uploads"));
app.use(ErrorMiddleware);
