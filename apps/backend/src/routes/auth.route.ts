import { Router } from "express";
import { SignInController, SignUpController } from "../controller/auth.controller";

const router = Router();

router.post("/signup", SignUpController)
router.post("/signin", SignInController)

export default router