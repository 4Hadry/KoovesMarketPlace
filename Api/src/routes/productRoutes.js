import express from "express";

import { isAdmin, protect, seller } from "../middleware/auth.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getCategories,
  getLatestProducts,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { singleUpload } from "../middleware/multer.js";

const app = express.Router();

app
  .route("/")
  .get(isAdmin, getAllProducts)
  .post(isAdmin, singleUpload, createProduct);
app.get("/latest", getLatestProducts);
app.get("/categories", getCategories);
app.get("/search", getProducts);
app
  .route("/:id")
  .get(getProductById)
  .put(protect, seller, singleUpload, updateProduct)
  .delete(protect, seller, deleteProduct);

export default app;
