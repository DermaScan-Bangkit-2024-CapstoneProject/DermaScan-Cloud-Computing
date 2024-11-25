import crypto from "crypto"; //development only
import admin from "firebase-admin";
import db from "../database/connect-db.js";
import { ResponseError } from "../error/error.js";

const getArticles = async (req) => {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 6);
    // const startIndex = (page -1) * limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const articlesCollection = db.collection("articles");
    const articles = await articlesCollection.get();
    const datas = articles.docs.map((doc) => doc.data());
    datas.map((data) => {
        data.created_at = new Date(data.created_at._seconds * 1000).toLocaleString();
    });
    const results = {};
    const resultDatas = datas.slice(startIndex, endIndex);
    if (endIndex < datas.length) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        };
    }
    results.resultDatas = resultDatas;

    return results;
};

const getArticleById = async (req) => {
    const article_id = req.params.article_id;
    const articlesCollection = db.collection("articles");
    const articlesDoc = await articlesCollection.where("article_id", "=", article_id).get();
    if (articlesDoc.empty) {
        throw new ResponseError(404, "Article not found");
    }
    const result = articlesDoc.docs.map((doc) => doc.data());
    result[0].created_at = new Date(result[0].created_at._seconds * 1000).toLocaleString();
    return result[0];
};

const postArticle = async (req) => {
    //this api is not implemented on the client
    const article = req.body;
    const id = crypto.randomBytes(10).toString("hex");
    const articleData = {
        author: article.author,
        title: article.title,
        content: article.content,
        created_at: admin.firestore.Timestamp.now(),
        theme: article.theme,
        article_id: id,
    };
    const usersCollection = db.collection("articles");
    const result = await usersCollection.doc(id).set(articleData);

    return result;
};

export default { getArticles, getArticleById, postArticle };
