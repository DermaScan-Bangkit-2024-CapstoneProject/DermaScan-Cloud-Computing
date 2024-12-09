import express from "express";
import userController from "../controller/user-controller.js";
// import { emailLimiter } from "../utils/rate-limiter.js";
const publicRouter = new express.Router();

publicRouter.get("/test", (req, res) => res.json("Hello World!")); //testing email limiter

publicRouter.post("/api/auth/signup", userController.signup);
publicRouter.post("/api/auth/login", userController.login);
publicRouter.post("/api/auth/forget-password", userController.getTokenforgetPassword);
publicRouter.patch("/api/auth/forget-password", userController.forgetPassword);
export { publicRouter };
