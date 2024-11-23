import express from "express";
import userController from "../controller/user-controller.js";
const privateRouter = new express.Router();

privateRouter.get("/api/users/:email", userController.get);
privateRouter.post("/api/auth/update", userController.update);
privateRouter.post("/api/auth/logout", userController.logout);

export { privateRouter };
