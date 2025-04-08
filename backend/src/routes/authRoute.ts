import { Router } from "express";
import { registerUser } from "../controllers/authController";
const router = Router();

router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.route("/profile", next).get(getProfile).update(updateProfile);
export default router;
