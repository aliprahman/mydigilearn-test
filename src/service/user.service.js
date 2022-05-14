const db = require('../../database/models');

exports.findUserByEmail = async (emailAddress) => {
    return db.User.findOne({
        where: { email: emailAddress }
    })
};

exports.findUserByPhone = async (phoneNumber) => {
    return db.User.findOne({
        where: { phone: phoneNumber }
    })
};

exports.saveUser = async (data) => {
    return db.User.create(data)
};

exports.findUserById = async (userId) => {
    return db.User.findByPk(userId)
};
