import express from "express";

// import { isAdmin } from "../middleware/auth.js";
import {
  getDashboardStats,
  //   getBarCharts,
  //   getLineCharts,
  //   getPieCharts,
} from "../controllers/statsController.js";
import { isAdmin } from "../middleware/auth.js";

const route = express.Router();
// api/v1/dashboard/stats
route.get("/stats", isAdmin, getDashboardStats);

// api/v1/dashboard/pie
// route.get("/pie", isAdmin, getPieCharts);

// api/v1/dashboard/bar
// route.get("/bar", isAdmin, getBarCharts);

// api/v1/dashboard/line
// route.get("/line", isAdmin, getLineCharts);

export default route;
