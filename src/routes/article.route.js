const express = require('express');
const router = express.Router();
const articleController = require('../controller/article.controller');
const authMiddleware = require('../middleware/token.middleware');
const paginationMiddleware = require('../middleware/pagination.middleware');

/**
 * @swagger
 * components:
 *    schemas:
 *      Article:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id.
 *          title:
 *            type: string
 *            description: title article.
 *          slug:
 *            type: string
 *            description: The name of user.
 *          description:
 *            type: string
 *            description: content article.
 *          image:
 *            type: string
 *            description: image.
 *          categoryId:
 *            type: string
 *            description: category article.
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *          updatedAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           id: 901283-1231238-1231-123123
 *           title: Kemacetan parah
 *           slug: kemacetan-parah
 *           description: kemacetan terjadi ketika H-3 Lebaran
 *           image: https://via.placeholder.com/150
 *           categoryId: 901283-1231238-1231-1nsdf
 */


/**
 * @swagger
 * /article/create:
 *   post:
 *     summary: Create Article
 *     tags: [Article]
 *     security: 
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                  title:
 *                      type: string
 *                      description: title article.
 *                      example: kemacetan pada mudik
 *                  description:
 *                      type: string
 *                      description: content article.
 *                      example: kemacetan pada mudik
 *                  image:
 *                      type: string
 *                      description: image banner article.
 *                      example: https://placeholder.com/150
 *                  categoryId:
 *                      type: string
 *                      description: id category article
 *                      example: 189237812-1237812-18-17283
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      description: Id Category Success
 *                      example: 123812-123kjd-1238-123
 *                    title:
 *                      type: string
 *                      description: title article.
 *                      example: kemacetan pada mudik
 *                    slug:
 *                      type: string
 *                      description: slug title article
 *                      example: kemacetan-pada-mudik
 *                    description:
 *                      type: string
 *                      description: content article
 *                      example: kemacetan terjadi di gentong arah tasik
 *                    image:
 *                      type: string
 *                      description: image banner artile
 *                      example: https://via.placeholder.com/150
 *                    categoryId:
 *                      type: string
 *                      description: id category article
 *                      example: 123812-123kjd-1238-123
*/
router.post('/create', authMiddleware.verifyToken ,articleController.newArticle);

/**
 * @swagger
 * /article/{slug}:
 *   get:
 *     summary: Get Detail Article
 *     tags: [Article]
 *     security: []
 *     parameters: 
 *        - in: path
 *          name: slug
 *          description: slug title from article
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      description: Id Category Success
 *                      example: 123812-123kjd-1238-123
 *                    title:
 *                      type: string
 *                      description: title article.
 *                      example: kemacetan pada mudik
 *                    slug:
 *                      type: string
 *                      description: slug title article
 *                      example: kemacetan-pada-mudik
 *                    description:
 *                      type: string
 *                      description: content article
 *                      example: kemacetan terjadi di gentong arah tasik
 *                    image:
 *                      type: string
 *                      description: image banner artile
 *                      example: https://via.placeholder.com/150
 *                    categoryId:
 *                      type: string
 *                      description: id category article
 *                      example: 123812-123kjd-1238-123
*/
router.get('/:slug', articleController.getDetailArticle);

/**
 * @swagger
 * /article:
 *   get:
 *     summary: Get List Article
 *     tags: [Article]
 *     security: []
 *     parameters: 
 *        - in: query
 *          name: search
 *          description: search keyword
 *        - in: query
 *          name: page
 *          description: current page of pagination
 *        - in: query
 *          name: perPage
 *          description: limit data per page
 *        - in: query
 *          name: sortBy
 *          description: sorting article by field
 *        - in: query
 *          name: sortType
 *          description: sorting direction
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      description: Id Category Success
 *                      example: 123812-123kjd-1238-123
 *                    title:
 *                      type: string
 *                      description: title article.
 *                      example: kemacetan pada mudik
 *                    slug:
 *                      type: string
 *                      description: slug title article
 *                      example: kemacetan-pada-mudik
 *                    description:
 *                      type: string
 *                      description: content article
 *                      example: kemacetan terjadi di gentong arah tasik
 *                    image:
 *                      type: string
 *                      description: image banner artile
 *                      example: https://via.placeholder.com/150
 *                    categoryId:
 *                      type: string
 *                      description: id category article
 *                      example: 123812-123kjd-1238-123
*/
router.get('/', paginationMiddleware.pagination, articleController.fetchArticles);

module.exports = router;