import articleService from "../service/article-service.js";

const articles = async (req, res, next) => {
    try {
        const results = await articleService.getArticles(req);
        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
};

const articleById = async (req, res, next) => {
    try {
    } catch (error) {}
};
const postArticle = async (req, res, next) => {
    try {
        const result = await articleService.postArticle(req);
        res.status(200).json({ message: "Article Successfully Created", data: result });
    } catch (error) {
        next(error);
    }
};
export default { articles, articleById, postArticle };
