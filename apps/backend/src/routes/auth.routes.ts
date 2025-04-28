import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { login } from "../controllers/auth.controller";

const router = Router();

router.post("/register", (req, res) => {
  register(req, res);
});

router.post("/login", (req, res) => {
  login(req, res);
});

export default router;
