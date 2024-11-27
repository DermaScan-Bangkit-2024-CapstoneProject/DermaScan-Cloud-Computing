import express from "express";
import userController from "../controller/user-controller.js";
import { userAuth } from "../middleware/auth-handler.js";
import articleController from "../controller/article-controller.js";
import readController from "../controller/read-controller.js";
const privateRouter = new express.Router();

privateRouter.use(userAuth);
// User Endpoint
privateRouter.get("/api/users/:user_id", userController.getUser);
privateRouter.patch("/api/users/:user_id", userController.updateUser);
privateRouter.patch("/api/user/reset-password", userController.resetPassword);
// privateRouter.post("/api/auth/update", userController.update);
privateRouter.post("/api/auth/logout", userController.logout);
privateRouter.post("/api/auth/forgot-password", userController.forgotPassword);

// Article Endpoint
privateRouter.post("/api/articles", articleController.postArticle); //development purpose
privateRouter.get("/api/articles/:article_id", articleController.articleById);
privateRouter.get("/api/articles", articleController.articles);

// History
// Read Hisotry Endpoint
privateRouter.post("/api/users/:user_id/history/read", readController.addReadHistory);
privateRouter.get("/api/users/:user_id/history/read", readController.getReadHistory);
privateRouter.delete("/api/users/:user_id/history/read/:read_id", readController.deleteReadHistory);

export { privateRouter };
