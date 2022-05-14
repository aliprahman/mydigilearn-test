const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicKey = fs.readFileSync('./secret/public.key','utf8');
const { findUserById } = require('../service/user.service');

exports.verifyToken = (req, res, next) => {
	const token = req.headers['authorization'];
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized!' });
	}

	const bearer = token.split(" ");
	if (bearer[0] != 'Bearer') {
		return res.status(401).json({ message: 'Unauthorized!' });
	}

	jwt.verify(bearer[1], publicKey, async (err, decoded) => {
		if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
		}
		const user = await findUserById(decoded.id)
		if (!user.isLogin) {
			return res.status(401).json({ message: 'Unauthorized!' });
		}
		req.user = user;
		next();
	});
};