import { myCache } from "../index.js";
import { TryCatch } from "../middleware/error.js";
import { Order } from "../models/orderModel.js";
import { invalidateCaches, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utils-class.js";

export const addOrder = TryCatch(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    user,
    subtotal,
    tax,
    shippingCharges,
    discount,
    total,
  } = req.body;
  if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total) {
    return next(new ErrorHandler("All Fields are required", 400));
  }

  // let prevOrders = await Order.find({ orderItems });

  // prevOrders.forEach((prevOrder) => {
  //   prevOrder.orderItems.forEach((prevOrderItem) => {
  //     orderItems.forEach((currentItem) => {
  //       if (currentItem.productId === prevOrderItem.productId) {
  //         currentItem.quantity += prevOrderItem.quantity;
  //       }
  //     });
  //   });
  // });

  const order = await Order.create({
    shippingInfo,
    orderItems,
    user,
    subtotal,
    tax,
    shippingCharges,
    discount,
    total,
  });

  await reduceStock(orderItems);

  invalidateCaches({
    product: true,
    order: true,
    admin: true,
    userId: user,
  });

  return res.status(201).json({
    success: true,
    message: "Order Placed Successfully",
    order,
  });
});

export const myOrder = TryCatch(async (req, res, next) => {
  const { id: user } = req.query;
  let key = `my-orders-${user}`;
  let orders = [];

  if (myCache.has(key)) orders = JSON.parse(myCache.get(key));
  else {
    orders = await Order.find({ user });
    myCache.set(key, JSON.stringify(orders));
  }

  return res.status(200).json({
    success: true,
    orders,
  });
});

export const allOrder = TryCatch(async (req, res, next) => {
  const key = `all-orders`;

  let orders = [];

  if (myCache.has(key)) orders = JSON.parse(myCache.get(key));
  else {
    orders = await Order.find().populate("user", "name");
    myCache.set(key, JSON.stringify(orders));
  }

  return res.status(200).json({
    success: true,
    orders,
  });
});

export const getSingleOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const key = `order-${id}`;

  let order;

  if (myCache.has(key)) order = JSON.parse(myCache.get(key));
  else {
    order = await Order.findById(id).populate("user", "name");
    if (!order) return next(new ErrorHandler("Could not find", 404));
    myCache.set(key, JSON.stringify(order));
  }

  return res.status(200).json({
    success: true,
    order,
  });
});

export const processOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) return next(new ErrorHandler("Order not found", 404));

  switch (order.status) {
    case "Processing":
      order.status = "Shipped";
      break;
    case "Shipped":
      order.status = "Delivered";
      break;
    default:
      order.status = "Delivered";
      break;
  }

  await order.save();

  invalidateCaches({
    product: false,
    order: true,
    admin: true,
    userId: order.user,
    orderId: String(order._id),
  });

  return res.status(200).json({
    success: true,
    message: "Order Processed Successfully",
  });
});

export const deleteOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return next(new ErrorHandler("Order not found", 404));

  await order.deleteOne();

  invalidateCaches({
    product: false,
    order: true,
    admin: true,
    userId: order.user,
    orderId: String(order._id),
  });

  return res.status(200).json({
    success: true,
    message: "Order Deleted Successfully",
  });
});
