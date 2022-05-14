const db = require('../../database/models');
const { Op } = require("sequelize");
const slugify = require('slugify')

const createArticle = async (data) => {
    try {
        const slug = slugify(data.title)
        const check = await findArticleBySlug(slug)
        const countArticle = await totalArticle() + 1
        const titleSlug = check === null ? slug : slug + '-' +  countArticle
        const payload = {
            ...data,
            slug: titleSlug,
        }
        const art = await db.Article.create(payload);
        return findArticleBySlug(art.slug)
    } catch (error) {
        throw new Error(error.message)
    }
};

const findArticleBySlug = async (titleSlug) => {
    return db.Article.findOne({
        where: {
            slug: titleSlug
        },
        include: [
            {
                model: db.Category,
                required: true
            }
        ]
    })
}

const totalArticle = async () => {
    return db.Article.count()
}

const getArticles = async (offset, limit, sortBy, sortType, search = '') => {
    const total = await db.Article.count({
        where: {
            title: {
                [Op.iLike]: `%${search}%`
            }
        },
    })
    const data = await db.Article.findAll({
        where: {
            title: {
                [Op.iLike]: `%${search}%`
            }
        },
        include: [
            {
                model: db.Category,
                required: true
            }
        ],
        offset: offset,
        limit: limit,
        order: [
            [sortBy, sortType]
        ]
    })

    return {
        total,
        data
    }
}

module.exports = {
    createArticle,
    findArticleBySlug,
    totalArticle,
    getArticles
}