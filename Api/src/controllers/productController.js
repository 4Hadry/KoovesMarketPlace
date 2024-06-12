import { myCache } from "../index.js";
import { TryCatch } from "../middleware/error.js";
import { Product } from "../models/productModel.js";
import { invalidateCaches } from "../utils/features.js";
import ErrorHandler from "../utils/utils-class.js";
import { rm } from "fs";

export const getLatestProducts = TryCatch(async (req, res, next) => {
  let products;
  let key = "latest_products";
  if (myCache.has(key)) products = JSON.parse(myCache.get(key));
  else {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(8);
    myCache.set(key, JSON.stringify(products));
  }
  // throw new Error("sdf");
  return res.status(200).json({
    success: true,
    products,
  });
});

export const getCategories = TryCatch(async (req, res, next) => {
  let categories;
  let key = "categories";
  if (myCache.has(key)) categories = JSON.parse(myCache.get(key));
  else {
    categories = await Product.distinct("category");
    myCache.set(key, JSON.stringify(categories));
  }

  return res.status(200).json({
    success: true,
    categories,
  });
});
export const getAllProducts = TryCatch(async (req, res, next) => {
  let data;
  let key = "allProducts";
  if (myCache.has(key)) data = JSON.parse(myCache.get(key));
  else {
    data = await Product.find({});
    myCache.set(key, JSON.stringify(data));
  }

  // console.log("Hitttt");
  return res.status(200).json({
    success: true,
    data,
  });
});

export const getProducts = TryCatch(async (req, res) => {
  const { search, sort, category, price } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
  const skip = (page - 1) * limit;
  const baseQuery = {};

  if (search)
    baseQuery.name = {
      $regex: search,
      $options: "i",
    };
  if (price)
    baseQuery.price = {
      $lte: Number(price),
    };
  if (category) baseQuery.category = category;

  const [products, filteredOnly] = await Promise.all([
    Product.find(baseQuery)
      .sort(sort && { price: sort === "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip),
    Product.find(baseQuery),
  ]);

  const totalPage = Math.ceil(filteredOnly.length / limit);

  return res.status(200).json({
    success: true,
    totalPage,
    products,
  });
});

export const getProductById = TryCatch(async (req, res, next) => {
  let product;
  const id = req.params.id;
  let key = `product-${id}`;
  if (myCache.has(key)) product = JSON.parse(myCache.get(key));
  else {
    product = await Product.findById(id);
    if (!product) return next(new ErrorHandler("Product not found", 404));
    myCache.set(key, JSON.stringify(product));
  }

  return res.status(200).json({
    success: true,
    product,
  });
});

// Seller
export const createProduct = TryCatch(async (req, res, next) => {
  const { name, price, stock, category } = req.body;
  const photo = req.file;

  //   console.log(req.body);

  if (!photo) return next(new ErrorHandler("Please add Photo", 400));

  if (!name || !price || !stock || !category) {
    rm(photo.path, () => {
      console.log("Deleted");
    });

    return next(new ErrorHandler("All Fields are required", 400));
  }

  const product = await Product.create({
    name,
    price,
    stock,
    category: category.toLowerCase(),
    photo: photo.path,
  });
  await invalidateCaches({ product: true, admin: true });
  return res.status(201).json({
    success: true,
    message: "Product Created Successfully",
    product,
  });
});

export const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, category, brand } = req.body;
  const photo = req.file;

  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  if (photo) {
    rm(product.photo, () => {
      console.log("old photo Deleted");
    });
    product.photo = photo.path;
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;
  if (brand) product.brand = brand;

  await product.save();
  await invalidateCaches({ product: true, admin: true });

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
  });
});

export const deleteProduct = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  rm(product.photo, () => {
    console.log("Product Photo Deleted");
  });

  await product.deleteOne();
  await invalidateCaches({ product: true });

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
