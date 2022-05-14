const express = require('express');
const router = express.Router();
const articleController = require('../controller/article.controller');
const authMiddleware = require('../middleware/token.middleware');
const paginationMiddleware = require('../middleware/pagination.middleware');

router.post('/create', authMiddleware.verifyToken ,articleController.newArticle);
router.get('/:slug', articleController.getDetailArticle);
router.get('/', paginationMiddleware.pagination, articleController.fetchArticles);

module.exports = router;