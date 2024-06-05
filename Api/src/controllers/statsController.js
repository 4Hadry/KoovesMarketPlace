import { myCache } from "../index.js";
import { TryCatch } from "../middleware/error.js";
import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";
import { calculatePercentage, getInventories } from "../utils/features.js";

export const getDashboardStats = TryCatch(async (req, res, next) => {
  let stats = {};
  if (myCache.has("admin-stats"))
    stats = JSON.parse(myCache.get("admin-stats"));
  else {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const thisMonth = {
      start: new Date(today.getFullYear(), today.getMonth(), 1),
      end: today,
    };

    const lastMonth = {
      start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
      end: new Date(today.getFullYear(), today.getMonth(), 0),
    };

    const thisMonthProductsPromise = Product.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });
    const lastMonthProductsPromise = Product.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });

    const thisMonthUsersPromise = User.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });
    const lastMonthUsersPromise = User.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });

    const thisMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });
    const lastMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });

    const lastSixMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: sixMonthsAgo,
        $lte: today,
      },
    });

    const latestTransactionsPromise = Order.find({})
      .select(["orderItems", "discount", "total", "status"])
      .limit(4);

    const [
      thisMonthProducts,
      thisMonthOrders,
      thisMonthUsers,
      lastMonthProducts,
      lastMonthOrders,
      lastMonthUsers,
      productsCount,
      allOrders,
      usersCount,
      lastSixMonthOrders,
      categories,
      sellerUsersCount,
      buyerUsersCount,
      latestTransactions,
    ] = await Promise.all([
      thisMonthProductsPromise,
      thisMonthOrdersPromise,
      thisMonthUsersPromise,
      lastMonthProductsPromise,
      lastMonthOrdersPromise,
      lastMonthUsersPromise,
      Product.countDocuments(),
      Order.find({}).select("total"),
      User.countDocuments(),
      lastSixMonthOrdersPromise,
      Product.distinct("category"),
      User.countDocuments({ role: "seller" }),
      User.countDocuments({ role: "buyer" }),
      latestTransactionsPromise,
    ]);

    const thisMonthRevenue = thisMonthOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );
    const lastMonthRevenue = lastMonthOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const changePercentage = {
      revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
      product: calculatePercentage(
        thisMonthProducts.length,
        lastMonthProducts.length
      ),
      order: calculatePercentage(
        thisMonthOrders.length,
        lastMonthOrders.length
      ),
      user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
    };

    const revenue = allOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );
    const count = {
      revenue: revenue,
      product: productsCount,
      order: allOrders.length,
      user: usersCount,
    };

    const OrderMonthCounts = new Array(6).fill(0);
    const OrderMonthlyRevenue = new Array(6).fill(0);

    lastSixMonthOrders.forEach((order) => {
      const creationDate = order.createdAt;
      const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
      if (monthDiff < 6) {
        OrderMonthCounts[5 - monthDiff] += 1;
        OrderMonthlyRevenue[5 - monthDiff] += order.total;
      }
    });

    const categoryCount = await getInventories({
      categories,
      productsCount,
    });

    const usersRatio = {
      buyer: buyerUsersCount,
      seller: sellerUsersCount,
    };

    const modifyLatestTransaction = latestTransactions.map((i) => ({
      _id: i._id,
      discount: i.discount,
      amount: i.total,
      quantity: i.orderItems.length,
      status: i.status,
    }));

    stats = {
      categoryCount,
      changePercentage,
      count,
      chart: {
        order: OrderMonthCounts,
        revenue: OrderMonthlyRevenue,
      },
      usersRatio,
      latestTransactions: modifyLatestTransaction,
    };

    myCache.set("admin-stats", JSON.stringify(stats));
  }

  return res.status(200).json({
    success: true,
    stats,
  });
});
