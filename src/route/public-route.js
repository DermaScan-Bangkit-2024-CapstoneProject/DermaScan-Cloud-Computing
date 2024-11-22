import express from "express";
import userController from "../controller/user-controller.js";
const publicRouter = new express.Router();

publicRouter.post("/api/signup", userController.signup);
publicRouter.post("/api/login", userController.login);


export { publicRouter };
