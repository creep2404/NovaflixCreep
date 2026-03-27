import { Router } from "express";
import { register, login, logout } from "./auth.controller";
import { authMiddleware } from "@/common/middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

//protected route
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route",
    user: (req as any).user,
  });
});

router.post("/logout", authMiddleware, logout);

export default router;