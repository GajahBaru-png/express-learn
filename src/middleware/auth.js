const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];  // Perbaikan di sini

    if(!token) return res.status(401).json({error: 'Token Tidak Ditemukan'});

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
        res.status(403).json({error: 'Token Tidak Valid'});
    }
}

module.exports = AuthUser;
