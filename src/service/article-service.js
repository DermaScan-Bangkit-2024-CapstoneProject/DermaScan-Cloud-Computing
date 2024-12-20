import crypto from "crypto"; //development only
import admin from "firebase-admin";
import db from "../database/connect-db.js";
import { ResponseError } from "../error/error.js";
import { getDataFromDb } from "../utils/get-data.js";

const getArticles = async (req) => {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 6);
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
    const articleId = req.params.article_id;
    const articlesCollection = db.collection("articles");
    const articlesDoc = await articlesCollection.where("article_id", "==", articleId).get();

    if (articlesDoc.empty) {
        throw new ResponseError(404, "Article not found");
    }
    const result = articlesDoc.docs.map((doc) => doc.data());
    result[0].created_at = new Date(result[0].created_at._seconds * 1000).toLocaleString();
    const articleHistory = await getDataFromDb("read_histories", "article_id", articleId);
    if (articleHistory) {
        if (articleHistory.article_id === articleId) {
            result[0].is_added_to_history = true;
        }
    } else {
        result[0].is_added_to_history = false;
    }
    return result[0];
};

const getArticleByTheme = async (req) => {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 6);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const articleTheme = req.params.article_theme;

    const articlesCollection = db.collection("articles");
    const articles = await articlesCollection.get();
    const datas = articles.docs.map((doc) => doc.data());
    datas.map((data) => {
        data.created_at = new Date(data.created_at._seconds * 1000).toLocaleString();
    });
    const filterDatas = datas.filter((data) => data.theme === articleTheme);
    const results = { currentPage: page };
    const resultDatas = filterDatas.slice(startIndex, endIndex);
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

//this api is not implemented on the client
const postArticle = async (req) => {
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

export default { getArticles, getArticleById, getArticleByTheme, postArticle };
