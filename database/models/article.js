'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      });
    }
  };
  Article.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    categoryId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });
  Article.beforeCreate(async (article) => {
    article.id = uuidv4();
  });
  return Article;
};