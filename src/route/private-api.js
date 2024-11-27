import express from "express";
import userController from "../controller/user-controller.js";
import { userAuth } from "../middleware/auth-handler.js";
import articleController from "../controller/article-controller.js";
import diagnosisController from "../controller/diagnosis-controller.js";

const privateRouter = new express.Router();

privateRouter.use(userAuth);
// User Endpoint
privateRouter.get("/api/users/:user_id", userController.getUser);
privateRouter.post("/api/auth/update", userController.update);
privateRouter.post("/api/auth/logout", userController.logout);

// Article Endpoint
privateRouter.post("/articles", articleController.postArticle); //development purpose
privateRouter.get("/articles/:article_id", articleController.articleById);
privateRouter.get("/articles", articleController.articles);

// Diagnosis Endpoint
privateRouter.post("/api/users/:user_id/history/diagnosis", diagnosisController.addDiagnosisHistory);
privateRouter.get("/api/users/:user_id/history/diagnosis", diagnosisController.getDiagnosisHistories);
privateRouter.get("/api/users/:user_id/history/diagnosis/:diag_id", diagnosisController.getDiagnosisHistoryById);
privateRouter.delete("/api/users/:user_id/history/diagnosis/:diag_id", diagnosisController.deleteDiagnosisHistory);

export { privateRouter };
