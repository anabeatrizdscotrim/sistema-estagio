import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddlewave.js";
import { createTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, createTask);
// router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
// router.post("/activity/:id", protectRoute, postTaskActivity);

export default router;