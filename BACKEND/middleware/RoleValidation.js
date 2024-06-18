const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

const roleValidation = async(req,res,next) => {
    const authHeader = req.headers && req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        const decodedToken = jwt.decode(token);
        const userRole = decodedToken.role;
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token invalid or expired' });
    }
}