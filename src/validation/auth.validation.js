const { findUserByEmail, findUserByPhone, findUserById } = require('../service/user.service')

exports.validateSignUp = async (req, res, next) => {
    let errors = [];

    if (req.body.name !== undefined) {
        if(!Boolean(req.body.name.trim())){
            errors.push({fieldName: "name", error: "name is required!"})
        }
    } else {
        errors.push({fieldName: "name", error: "name is required!"})
    }

    if (req.body.email !== undefined) {
        if(!Boolean(req.body.email.trim())){
            errors.push({fieldName: "email", error: "email is required!"})
        }
        const user = await findUserByEmail(req.body.email)
        if (user) {
            errors.push({fieldName: "email", error: "email already exists!"})
        }
    } else {
        errors.push({fieldName: "email", error: "email is required!"})
    }

    if (req.body.phone !== undefined) {
        if(!Boolean(req.body.phone.trim())){
            errors.push({fieldName: "phone", error: "phone is required!"})
        }
        if (req.body.phone.substr(0,2) !== "62") {
            errors.push({fieldName: "phone", error: "phone wrong format!"})
        }
        const user = await findUserByPhone(req.body.phone)
        if (user) {
            errors.push({fieldName: "phone", error: "phone already exists!"})
        }
    } else {
        errors.push({fieldName: "phone", error: "phone is required!"})
    }

    if (req.body.password !== undefined) {
        if(!Boolean(req.body.password.trim())){
            errors.push({fieldName: "password", error: "password is required!"})
        }
        if(req.body.password.length < 6){
            errors.push({fieldName: "password", error: "password length min 6 character!"})
        }
    } else {
        errors.push({fieldName: "password", error: "password is required!"})
    }

    if(errors.length > 0){
        return res.status(400).json({
            message: "data validation failed",
            details: errors
        });
    }

    next();
};

exports.validateSignIn = async (req, res, next) => {
    let errors = [];

    if (req.body.email !== undefined) {
        if(!Boolean(req.body.email.trim())){
            errors.push({fieldName: "email", error: "email is required!"})
        }
    } else {
        errors.push({fieldName: "email", error: "email is required!"})
    }

    if (req.body.password !== undefined) {
        if(!Boolean(req.body.password.trim())){
            errors.push({fieldName: "password", error: "password is required!"})
        }
        if(req.body.password.length < 6){
            errors.push({fieldName: "password", error: "password length min 6 character!"})
        }
    } else {
        errors.push({fieldName: "password", error: "password is required!"})
    }

    if(errors.length > 0){
        return res.status(400).json({
            message: "data validation failed",
            details: errors
        });
    }

    next();
};