import articleService from "../service/article-service.js";

const articles = async (req, res, next) => {
    try {
        const results = await articleService.getArticles(req);
        if (results.length === 0) {
            res.status(200).json({ message: "No article found." });
            return;
        }
        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
};

const articleById = async (req, res, next) => {
    try {
        const result = await articleService.getArticleById(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
const articleByTheme = async (req, res, next) => {
    try {
        const results = await articleService.getArticleByTheme(req);
        if (results.length === 0) {
            res.status(200).json({ message: "No article found." });
            return;
        }
        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
};

const postArticle = async (req, res, next) => {
    try {
        const result = await articleService.postArticle(req);
        res.status(200).json({ message: "Article Successfully Created", data: result });
    } catch (error) {
        next(error);
    }
};

export default { articles, articleById, postArticle, articleByTheme };
