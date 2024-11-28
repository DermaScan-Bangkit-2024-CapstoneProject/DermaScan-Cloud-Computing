import express from "express";
import userController from "../controller/user-controller.js";
const publicRouter = new express.Router();

publicRouter.post("/api/auth/signup", userController.signup);
publicRouter.post("/api/auth/login", userController.login);
publicRouter.post("/api/auth/forget-password", userController.getTokenforgetPassword);
publicRouter.patch("/api/auth/forget-password", userController.forgetPassword);
export { publicRouter};
