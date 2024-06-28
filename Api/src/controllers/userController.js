import { TryCatch } from "../middleware/error.js";
import { User } from "../models/userModel.js";
import { invalidateCaches } from "../utils/features.js";
import { generateToken } from "../utils/generateToken.js";
import ErrorHandler from "../utils/utils-class.js";

export const registerUser = TryCatch(async (req, res, next) => {
  const { _id, name, email, password, role, photo } = req.body;

  const userExists = await User.findById({ _id });

  if (userExists) {
    return res.status(200).json({
      success: true,
      message: `Welcome, ${userExists.name}`,
    });
  }

  const user = await User.create({
    _id,
    name,
    email,
    password,
    role,
    photo,
  });

  invalidateCaches({
    product: true,
    order: true,
    admin: true,
    userId: user._id,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    next(new ErrorHandler("Invalid User Data", 400));
  }
});

export const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  let token = generateToken(user._id);
  const options = {
    httpOnly: true,
    secure: true,
  };

  if (user && (await user.matchPassword(password))) {
    // console.log("Working");
    res.cookie("Token", token, options).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } else {
    next(new ErrorHandler("Invalid email or password", 401));
  }
});

export const allUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json({
    success: true,
    users,
  });
});

export const getUser = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid ID", 400));

  return res.status(200).json({
    success: true,
    user,
  });
});

export const delUser = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid ID", 400));

  await user.deleteOne();

  return res.status(200).json({
    success: true,
    message: "User Deleted successfully",
  });
});

export const EditUser = TryCatch(async (req, res, next) => {
  const { name, email, currentPassword, newPassword, newConfirmPassword } =
    req.body;
  if (
    !name ||
    !email ||
    !newPassword ||
    !currentPassword ||
    !newConfirmPassword
  ) {
    return next(new ErrorHandler("Fill in all required fields", 404));
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  // make sure new email doesn't already exist
  const emailExist = await User.findOne({ email });
  // we want to update other details with or without changing the email
  if (emailExist && emailExist._id !== req.user.id) {
    return next(new ErrorHandler("Email already exists.", 404));
  }
  // compare  current password to db password
  const validUserPassword = await user.matchPassword(currentPassword);
  if (!validUserPassword) {
    return next(new ErrorHandler("Invalid current password", 404));
  }
  // compare new password
  if (newPassword !== newConfirmPassword) {
    return next(new ErrorHandler("new passwords do not match", 404));
  }
  console.log(newPassword);
  const newInfo = await User.findByIdAndUpdate(
    req.user.id,
    { name, email, Password: newPassword },
    { new: true }
  );
  res.status(200).json(newInfo);
});
