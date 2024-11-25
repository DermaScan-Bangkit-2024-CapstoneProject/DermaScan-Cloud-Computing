import express from "express";
import userController from "../controller/user-controller.js";
import { userAuth } from "../middleware/auth-handler.js";
import articleController from "../controller/article-controller.js";
const privateRouter = new express.Router();

privateRouter.use(userAuth);
// User Endpoint
privateRouter.get("/api/users/:email", userController.getUser);
privateRouter.post("/api/auth/update", userController.update);
privateRouter.post("/api/auth/logout", userController.logout);

// Article Endpoint
privateRouter.post("/articles", articleController.postArticle); //development purpose
privateRouter.get("/articles", articleController.articles);
privateRouter.get("/articles/:article-id", articleController.articleById);

// Diagnosis Endpoint

export { privateRouter };
