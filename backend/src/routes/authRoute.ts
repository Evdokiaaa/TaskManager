import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/authController";
import { requireAuth } from "../middlewares/authMiddleware";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router
  .route("/profile")
  .get(requireAuth(), getUserProfile)
  .put(requireAuth(), updateUserProfile);
export default router;
