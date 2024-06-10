import express from "express";

import { isAdmin } from "../middleware/auth.js";
import {
  addOrder,
  allOrder,
  deleteOrder,
  getSingleOrder,
  myOrder,
  processOrder,
} from "../controllers/orderController.js";

const app = express.Router();

app.post("/add", addOrder);
app.get("/my", myOrder);
app.get("/all", isAdmin, allOrder);
app
  .route("/:id")
  .get(getSingleOrder)
  .put(isAdmin, processOrder)
  .delete(isAdmin, deleteOrder);

export default app;
