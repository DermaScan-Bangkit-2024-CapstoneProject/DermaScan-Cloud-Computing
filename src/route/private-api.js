import express from "express";
import userController from "../controller/user-controller.js";
import { userAuth } from "../middleware/auth-handler.js";
const privateRouter = new express.Router();

privateRouter.use(userAuth);
privateRouter.get("/api/users/:email", userController.getUser);
privateRouter.post("/api/auth/update", userController.update);
privateRouter.post("/api/auth/logout", userController.logout);

export { privateRouter };
