const express = require('express');
const router = express.Router();
const userController = require('../controller/auth.controler');
const userValidation = require('../validation/auth.validation');
const authMiddleware = require('../middleware/token.middleware');

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the logistic.
 *          name:
 *            type: string
 *            description: The name of user.
 *          email:
 *            type: string
 *            description: unique email address 
 *          phone:
 *            type: string
 *            description: phone number
 *          password:
 *            type: string
 *            description: password for login
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *          updatedAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           name: Alip
 *           email: aliprrahman@gmail.com
 *           phone: 6281222455535
 *           password: 9102381273hbkjnaklsdasd
 */

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Register new user.
 *     tags: [User]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name.
 *                 example: alip
 *               email:
 *                 type: string
 *                 description: must be unique.
 *                 example: aliprrahman@gmail.com
 *               phone:
 *                 type: string
 *                 description: must be unique, dan diawali dengan 62.
 *                 example: 6281222455535
 *               password:
 *                 type: string
 *                 description: The password.
 *                 example: 123456
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *            application/json:
 *                schema:
 *                    $ref: '#/components/schemas/User'
 *       "400":
 *          description: Data Validation Failed
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      description: Message Error
 *                      example:  Invalid Data
*/
router.post('/sign-up', userValidation.validateSignUp, userController.signUp);

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Login user with email and password.
 *     tags: [User]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: must be unique, dan diawali dengan 62.
 *                 example: aliprrahman@gmail.com
 *               password:
 *                 type: string
 *                 description: The password.
 *                 example: 123456
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      description: Message Success
 *                      example: Sign In Success
 *                    token:
 *                      type: string
 *                      description: Token untuk header authentication
 *                      example: e12831y23kjnsdnfbsvdfu9s08yr73hbkjnsdbfhsf...
 *       "400":
 *          description: Data Validation Failed
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      description: Message Error
 *                      example:  Data Not Found
*/
router.post('/sign-in', userValidation.validateSignIn, userController.signIn);

/**
 * @swagger
 * path:
 * /auth/profile:
 *    get:
 *      summary: GET user profile
 *      tags: [User]
 *      security:
 *        - jwt: []
 *      responses:
 *       "200":
 *         description: OK
 *         content:
 *            application/json:
 *                schema:
 *                    $ref: '#/components/schemas/User'
 */
router.get('/profile', authMiddleware.verifyToken, userController.profile);


/**
 * @swagger
 * path:
 * /auth/sign-out:
 *    get:
 *      summary: GET logout user
 *      tags: [User]
 *      security:
 *        - jwt: []
 *      responses:
 *       "200":
 *         description: OK
 */
 router.get('/sign-out', authMiddleware.verifyToken, userController.signOut);

module.exports = router;