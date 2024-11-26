import db from "../database/connect-db.js";
import admin from "firebase-admin";
import { ResponseError } from "../error/error.js";
import crypto from "crypto";
import { getDataFromDb } from "../utils/get-data.js";
import { title } from "process";

const addReadHistory = async (req, res) => {
    if (req.params.user_id !== req.userData) {
        throw new ResponseError(401, "Unauthorized");
    }
    const userId = req.params.user_id;
    const articleId = req.body.article_id;
    if (!userId || userId !== req.userData || !articleId) {
        throw new ResponseError(400, "Bad Request");
    }
    const readId = crypto.randomBytes(13).toString("hex");

    const readHistoryCollection = db.collection("read_histories");
    const article = await getDataFromDb("articles", "article_id", articleId);
    const readHistoryData = await getDataFromDb("read_histories", "article_id", articleId);
    if (!article) {
        throw new ResponseError(404, "Article not found");
    }
    if (readHistoryData && readHistoryData.user_id === userId) {
        throw new ResponseError(409, "This article has already added to your history");
    }

    const result = await readHistoryCollection.doc(article.article_id).set({
        user_id: userId,
        article_id: article.article_id,
        read_id: readId,
        read_at: admin.firestore.Timestamp.now(),
        title: article.title,
    });
    return result;
};
const getReadHistory = async (req, res) => {
    if (req.params.user_id !== req.userData) {
        throw new ResponseError(401, "Unauthorized");
    }
    const userId = req.params.user_id;

    const readHistories = await db.collection("read_histories").where("user_id", "==", userId).get();
    const result = readHistories.docs.map((doc) => doc.data());
    if (!readHistories) {
        return [];
    }
    result.map((data) => (data.read_at = new Date(data.read_at._seconds * 1000).toLocaleString()));
    return result;
};
const deleteReadHistory = async (req, res) => {};

export default { addReadHistory, getReadHistory, deleteReadHistory };
