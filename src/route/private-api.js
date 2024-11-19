import express from "express";
import userController from "../controller/user-controller.js";
const privateRouter = new express.Router();

privateRouter.get("/api/users/current", userController.get);
privateRouter.get("/api/update", userController.logout);
privateRouter.get("/api/logout", userController.logout);

export { privateRouter };
