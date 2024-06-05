import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/utils-class.js";
import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";

export const isAdmin = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  if (!id) return next(new ErrorHandler("Login First", 401));

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 401));

  if (user.role !== "admin")
    return next(new ErrorHandler("You are Not Admin", 403));

  next();
});

export const protect = TryCatch(async (req, res, next) => {
  let token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  }

  if (!token) {
    next(new ErrorHandler("Not authorized, no token", 401));
  }
});

// const admin = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(401);
//     throw new Error('Not authorized as an admin');
//   }
// };

export const seller = (req, res, next) => {
  if (req.user && req.user.role === "seller") {
    next();
  } else {
    next(new ErrorHandler("Not authorized as a seller", 401));
  }
};
