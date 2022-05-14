const db = require('../../database/models');
const { Op } = require("sequelize");

exports.fetchCategories = async (search) => {
    return db.Category.findAll({
        where: { 
            name:  {
                [Op.iLike]: `%${search}%`
            }
        }
    })
};

exports.findCategoryById = async (id) => {
    return db.Category.findByPk(id)
};