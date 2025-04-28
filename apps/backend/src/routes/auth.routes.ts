import { Router } from "express";
import { register, login, getUsers } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", (req, res) => {
  register(req, res);
});

router.post("/login", (req, res) => {
  login(req, res);
});

router.get("/users", protect, (req, res) => {
  getUsers(req, res);
});

export default router;
