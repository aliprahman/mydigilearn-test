const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const categoryRoute = require('./category.route');

router.use('/auth', authRoute);
router.use('/category', categoryRoute);

module.exports = router;