const { fetchCategories, findCategoryById } = require('../service/category.service');

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await fetchCategories(req.query.search);
        return res.json(categories);
    } catch (error) {
        next(error);
    }
};

exports.getDetailCategory = async (req, res, next) => {
    try {
        const category = await findCategoryById(req.params.id);
        if (category) {
            return res.json(category);
        } else {
            throw new Error('Category Not Found');
        }
    } catch (error) {
        next(error);
    }
};