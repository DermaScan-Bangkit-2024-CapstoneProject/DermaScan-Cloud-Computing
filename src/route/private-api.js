import express from "express";
import userController from "../controller/user-controller.js";
import { userAuth } from "../middleware/auth-handler.js";
import articleController from "../controller/article-controller.js";
import diagnosisController from "../controller/diagnosis-controller.js";
import readController from "../controller/read-controller.js";

const privateRouter = new express.Router();

privateRouter.use(userAuth);

// User Endpoint
privateRouter.get("/api/users/:user_id", userController.getUser);
privateRouter.patch("/api/users/:user_id", userController.updateUser);
privateRouter.patch("/api/user/reset-password", userController.resetPassword);
privateRouter.post("/api/auth/logout", userController.logout);



// Article Endpoint
privateRouter.post("/api/articles", articleController.postArticle); //development purpose
privateRouter.get("/api/articles/:article_id", articleController.articleById);
privateRouter.get("/api/articles", articleController.articles);

// Diagnosis Endpoint
privateRouter.post("/api/users/:user_id/history/diagnosis", diagnosisController.addDiagnosisHistory);
privateRouter.get("/api/users/:user_id/history/diagnosis", diagnosisController.getDiagnosisHistories);
privateRouter.get("/api/users/:user_id/history/diagnosis/:diag_id", diagnosisController.getDiagnosisHistoryById);
privateRouter.delete("/api/users/:user_id/history/diagnosis/:diag_id", diagnosisController.deleteDiagnosisHistory);

// History

// Read Hisotry Endpoint
privateRouter.post("/api/users/:user_id/history/read", readController.addReadHistory);
privateRouter.get("/api/users/:user_id/history/read", readController.getReadHistory);
privateRouter.delete("/api/users/:user_id/history/read/:read_id", readController.deleteReadHistory);

export { privateRouter };
