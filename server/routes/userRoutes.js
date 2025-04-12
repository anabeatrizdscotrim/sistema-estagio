import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddlewave.js";
import { registerUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";
import { logoutUser } from "../controllers/userController.js";
import { getTeamList } from "../controllers/userController.js";
import { getNotificationsList } from "../controllers/userController.js";
import { updateUserProfile } from "../controllers/userController.js";
import { markNotificationRead } from "../controllers/userController.js";
import { changeUserPassword } from "../controllers/userController.js";
import { activateUserProfile } from "../controllers/userController.js";
import { deleteUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/get-team", protectRoute, isAdminRoute, getTeamList);
router.get("/notifications", protectRoute, getNotificationsList);

router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, markNotificationRead);
router.put("/change-password", protectRoute, changeUserPassword);

// //   para administrador - ADMIN ROUTES
router
  .route("/:id")
  .put(protectRoute, isAdminRoute, activateUserProfile)
  .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;