import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        req.userId = decoded.userId; // Store userId only
        console.log(req.userId)
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};
