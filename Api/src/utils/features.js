import { myCache } from "../index.js";
import { Product } from "../models/productModel.js";

export const invalidateCaches = async ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId,
}) => {
  if (product) {
    const productKeys = ["latest_products", "categories", "allProducts"];
    // `product-${id}`

    const products = await Product.find({}).select("_id");

    products.forEach((i) => {
      productKeys.push(`product-${i._id}`);
    });
    myCache.del(productKeys);
  }

  if (order) {
    const ordersKeys = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`,
    ];

    myCache.del(ordersKeys);
  }
  if (admin) {
  }
};

export const reduceStock = async (orderItems) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product not found ");
    product.stock -= order.quantity;
    await product.save();
  }
};
