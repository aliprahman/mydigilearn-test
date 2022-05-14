const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');

/**
 * @swagger
 * components:
 *    schemas:
 *      Category:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the logistic.
 *          name:
 *            type: string
 *            description: The name of user.
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
 *           name: News
 */



/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get List Category
 *     tags: [Category]
 *     security: []
 *     parameters: 
 *        - in: query
 *          name: search
 *          description: search keyword
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
 *                    name:
 *                      type: string
 *                      description: Category Name
 *                      example: Fashion
*/
router.get('/', categoryController.getCategories);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get Detail Category
 *     tags: [Category]
 *     security: []
 *     parameters: 
 *        - in: path
 *          name: id
 *          description: id category
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
 *                    name:
 *                      type: string
 *                      description: Category Name
 *                      example: Fashion
*/
router.get('/:id', categoryController.getDetailCategory);

module.exports = router;