import express from "express";
import {
  EditUser,
  allUsers,
  delUser,
  getUser,
  login,
  registerUser,
} from "../controllers/userController.js";
import { isAdmin, protect } from "../middleware/auth.js";

const app = express.Router();

app.post("/reg", registerUser);
app.post("/login", login);
app.get("/all", allUsers);
app.put("/edit", protect, EditUser);
app.route("/:id").get(getUser).delete(isAdmin, delUser);

export default app;
