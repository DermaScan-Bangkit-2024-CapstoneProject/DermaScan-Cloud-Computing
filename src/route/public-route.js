import express from "express";
import userController from "../controller/user-controller.js";
const publicRouter = new express.Router();

publicRouter.get("/api/signup", userController.signup);
publicRouter.get("/api/login", userController.login);


export { publicRouter };
