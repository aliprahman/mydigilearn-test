const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');

router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getDetailCategory);

module.exports = router;