const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const categoryRoute = require('./category.route');
const articleRoute = require('./article.route');

router.use('/auth', authRoute);
router.use('/category', categoryRoute);
router.use('/article', articleRoute);

module.exports = router;