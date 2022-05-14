const { findArticleBySlug, createArticle, getArticles } = require('../service/article.service');
const { metaPagination } = require('../utils/formater');

exports.newArticle = async (req, res, next) => {
    try {
        const article = await createArticle(req.body);
        return res.json(article);
    } catch (error) {
        next(error);
    }
};

exports.getDetailArticle = async (req, res, next) => {
    try {
        const article = await findArticleBySlug(req.params.slug);
        if (article) {
            return res.json(article);
        } else {
            throw new Error('Article Not Found');
        }
    } catch (error) {
        next(error);
    }
};

exports.fetchArticles = async (req, res, next) => {
    try {
        const articles = await getArticles(req.offset, req.perPage, req.sortBy, req.sortType, req.query.search);
        const metaData = metaPagination(req.page, req.perPage, articles.total, articles.data.length)

        return res.json({
            data: articles.data,
            meta: metaData
        })
    } catch (error) {
        next(error);
    }
}