const { saveUser, findUserByEmail, findUserById } = require('../service/user.service');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./secret/private.key','utf8');

exports.signUp = async (req, res, next) => {
    try {
        const payload = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, saltRounds)
        }
        const user = await saveUser(payload)
        return res.json(user)
    } catch (error) {
        next(error);
    }
};

exports.signIn = async (req, res, next) => {
    try {
        const user = await findUserByEmail(req.body.email)

        if (user) {
            const isPasswordSame = await bcrypt.compareSync(req.body.password, user.password)
    
            if (isPasswordSame) {
                const payload = {
                    id: user.id
                }
                // update user login
                user.isLogin = true;
                await user.save();
                // create token
                const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1 days'});
                return res.json({ message: 'Sign In Success', token: token })
            } else {
                throw new Error('Invalid Email or Password')
            }
        } else {
            throw new Error('Invalid Email or Password')
        }
    } catch (error) {
        next(error)
    }
};

exports.signOut = async (req, res, next) => {
    try {
        const user = await findUserById(req.user.id)
        if (user) {
            user.isLogin = false;
            await user.save();
            return res.json({ message: 'Sign Out Success' })
        } else {
            throw new Error('User Not Found')
        }   
    } catch (error) {
        next(error)
    }
}

exports.profile = async (req, res, next) => {
    try {
        const user = await findUserById(req.user.id)
        if (user) {
            return res.json(user)
        } else {
            throw new Error('User Not Found')
        }   
    } catch (error) {
        next(error)
    }
};